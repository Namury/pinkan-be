/*
  Warnings:

  - You are about to drop the column `consumptionDaysRemaining` on the `Consumer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Consumer" DROP COLUMN "consumptionDaysRemaining",
ADD COLUMN     "daysRemaining" INTEGER NOT NULL DEFAULT 0;
