-- AlterTable
ALTER TABLE "Consumer" ADD COLUMN     "refillFifty" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "refillFive" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "refillTwelve" INTEGER NOT NULL DEFAULT 0;
