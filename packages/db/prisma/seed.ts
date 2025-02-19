import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const bankNames = [
    "Velocity Bank",
    "Nexus Financial",
    "Zenith Trust",
    "Quantum Bank",
    "Stellar Savings",
  ];

  // Seeding banks
  for (const name of bankNames) {
    await prisma.bank.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
  console.log("Banks seeded successfully!");

  const alice = await prisma.user.upsert({
    where: { number: "123455" },
    update: {},
    create: {
      number: "123455",
      password: await bcrypt.hash("alice", 10),
      name: "alice",
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "55",
          provider: "HDFC Bank",
        },
      },
    },
  });
  const bob = await prisma.user.upsert({
    where: { number: "123456" },
    update: {},
    create: {
      number: "123456",
      password: await bcrypt.hash("bob", 10),
      name: "bob",
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Failure",
          amount: 2000,
          token: "56",
          provider: "HDFC Bank",
        },
      },
    },
  });
  console.log({ alice, bob });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
