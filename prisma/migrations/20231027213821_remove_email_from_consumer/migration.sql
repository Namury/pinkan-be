/*
  Warnings:

  - You are about to drop the column `email` on the `Consumer` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Consumer_email_key";

-- AlterTable
ALTER TABLE "Consumer" DROP COLUMN "email";
