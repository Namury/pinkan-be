/*
  Warnings:

  - You are about to drop the `ConsumerNotification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ConsumerNotification" DROP CONSTRAINT "ConsumerNotification_consumerId_fkey";

-- AlterTable
ALTER TABLE "Consumer" ADD COLUMN     "daysRemaining" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "isRead" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "ConsumerNotification";
