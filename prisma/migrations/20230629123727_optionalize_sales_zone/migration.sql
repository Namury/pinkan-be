-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_salesZoneId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "salesZoneId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_salesZoneId_fkey" FOREIGN KEY ("salesZoneId") REFERENCES "SalesZone"("id") ON DELETE SET NULL ON UPDATE CASCADE;
