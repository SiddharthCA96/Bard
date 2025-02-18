"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
    //get the logged users info
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    if (!from) {
        return {
            message: "Error while sending"
        }
    }
    const toUser = await prisma.user.findFirst({
        where: {
            number: to
        }
    });

    if (!toUser) {
        return {
            message: "User not found"
        }
    }

    //locking in databases transactions
    await prisma.$transaction(async (tx) => {
        // Step 1: Create initial P2P record with "Processing" status
        const p2pRecord = await tx.p2Pransactions.create({
          data: {
            senderId: Number(from),
            receiverId: toUser.id,
            amount,
            type: "Food",
            timestamp: new Date(),
            status: "Processing",
          },
        });
      
        try {
          // Step 2: Lock sender's balance and check funds
          await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
      
          const fromBalance = await tx.balance.findUnique({
            where: { userId: Number(from) },
          });
      
          if (!fromBalance || fromBalance.amount < amount) {
            // Insufficient funds: Update P2P record with "Failed"
            await tx.p2Pransactions.update({
              where: { id: p2pRecord.id },
              data: { status: "Failure" },
            });
            throw new Error("Insufficient funds");
          }
      
          // Step 3: Perform Balance Transfers
          await tx.balance.update({
            where: { userId: Number(from) },
            data: { amount: { decrement: amount } },
          });
      
          await tx.balance.update({
            where: { userId: toUser.id },
            data: { amount: { increment: amount } },
          });
      
          // Step 4: Update P2P Transfer Record as "Success"
          await tx.p2Pransactions.update({
            where: { id: p2pRecord.id },
            data: { status: "Success" },
          });
        } catch (error) {
          // Catch any error and mark as "Failed"
          await tx.p2Pransactions.update({
            where: { id: p2pRecord.id },
            data: { status: "Failure"},
          });
          throw error; // Rethrow to rollback balance operations
        }
      });
      
}