/*
  Warnings:

  - Added the required column `status` to the `P2Pransactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `P2Pransactions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "P2PStatus" AS ENUM ('Success', 'Failure');

-- AlterTable
ALTER TABLE "P2Pransactions" ADD COLUMN     "status" "P2PStatus" NOT NULL,
ADD COLUMN     "type" "P2PType" NOT NULL;
