-- CreateEnum
CREATE TYPE "P2PType" AS ENUM ('Food', 'Travel', 'Education', 'Entertainment', 'Medicine', 'Telecom');

-- CreateTable
CREATE TABLE "P2Pransactions" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,

    CONSTRAINT "P2Pransactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "P2Pransactions" ADD CONSTRAINT "P2Pransactions_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "P2Pransactions" ADD CONSTRAINT "P2Pransactions_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
