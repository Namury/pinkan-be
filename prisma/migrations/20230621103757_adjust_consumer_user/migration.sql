/*
  Warnings:

  - You are about to drop the column `coordinate` on the `Consumer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `latitude` to the `Consumer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Consumer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Consumer` DROP COLUMN `coordinate`,
    ADD COLUMN `latitude` VARCHAR(191) NOT NULL,
    ADD COLUMN `longitude` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `email` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);
