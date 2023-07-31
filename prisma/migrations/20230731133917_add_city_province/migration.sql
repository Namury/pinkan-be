/*
  Warnings:

  - Added the required column `cityCode` to the `Consumer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provinceCode` to the `SalesZone` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Consumer" ADD COLUMN     "cityCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SalesZone" ADD COLUMN     "cityCode" TEXT,
ADD COLUMN     "provinceCode" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Province" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Province_pkey" PRIMARY KEY ("id","code")
);

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "provinceCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id","code")
);

-- CreateIndex
CREATE UNIQUE INDEX "Province_id_key" ON "Province"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Province_code_key" ON "Province"("code");

-- CreateIndex
CREATE UNIQUE INDEX "City_id_key" ON "City"("id");

-- CreateIndex
CREATE UNIQUE INDEX "City_code_key" ON "City"("code");

-- AddForeignKey
ALTER TABLE "SalesZone" ADD CONSTRAINT "SalesZone_cityCode_fkey" FOREIGN KEY ("cityCode") REFERENCES "City"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesZone" ADD CONSTRAINT "SalesZone_provinceCode_fkey" FOREIGN KEY ("provinceCode") REFERENCES "Province"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_provinceCode_fkey" FOREIGN KEY ("provinceCode") REFERENCES "Province"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consumer" ADD CONSTRAINT "Consumer_cityCode_fkey" FOREIGN KEY ("cityCode") REFERENCES "City"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
