/*
  Warnings:

  - You are about to drop the column `daysRemaining` on the `Consumer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Consumer" DROP COLUMN "daysRemaining",
ADD COLUMN     "consumptionDaysEstimate" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "consumptionDaysRemaining" INTEGER NOT NULL DEFAULT 0;
