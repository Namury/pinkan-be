/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `Consumer` will be added. If there are existing duplicate values, this will fail.
  - The required column `phone` was added to the `Consumer` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Consumer" ADD COLUMN     "phone" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Consumer_phone_key" ON "Consumer"("phone");
