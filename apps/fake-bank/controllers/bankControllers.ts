// import prisma from "@repo/bank_db/client";
import db from "@repo/bank_db/client1";
import { Request, Response } from "express";
import { BankSchemaZod } from "../../../packages/zod-schema/dist";

// import { BankSchema } from "@repo/zod-schema/bank";

// function to create the new bank account
console.log("controller");

export const accountCreate = async (req: Request, res: Response):Promise<any> => {
  try {
    //to type checking
    const valdidateData = BankSchemaZod.CreateBankAccountSchema.safeParse(req.body);

    if (!valdidateData.success) {
      return res.json({
        mssg: "Please give the right inputs",
      });
    }

    //create the new bank account
    const newAccount = await db.bankAccount.create({
      data: {
        userId: valdidateData.data.userId,
        bankId: valdidateData.data.bankId,
        accountNumber: generateAccountNumber(),
        balance: 500,
      },
    });
    return res.json({ account: newAccount });
  } catch (error) {
    return res
      .status(500)
      .json({
        error: error instanceof Error ? error.message : "Internal Server Error",
      });
  }
};

// Generate random account number
function generateAccountNumber(): string {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}
