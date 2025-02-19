import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const bankNames = [
    "Velocity Bank",
    "Nexus Financial",
    "Zenith Trust",
    "Quantum Bank",
    "Stellar Savings",
  ];

  for (const name of bankNames) {
    await prisma.bank.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log("Banks seeded successfully!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
