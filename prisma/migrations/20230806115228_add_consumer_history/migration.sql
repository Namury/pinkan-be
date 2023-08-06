-- CreateTable
CREATE TABLE "ConsumerHistory" (
    "id" TEXT NOT NULL,
    "consumerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "cityCode" TEXT NOT NULL,
    "refillDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "refillFive" INTEGER NOT NULL DEFAULT 0,
    "refillTwelve" INTEGER NOT NULL DEFAULT 0,
    "refillFifty" INTEGER NOT NULL DEFAULT 0,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "consumptionDaysEstimate" INTEGER NOT NULL DEFAULT 0,
    "consumptionDaysRemaining" INTEGER NOT NULL DEFAULT 0,
    "consumerTypeid" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ConsumerHistory_id_key" ON "ConsumerHistory"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ConsumerHistory_phone_key" ON "ConsumerHistory"("phone");

-- AddForeignKey
ALTER TABLE "ConsumerHistory" ADD CONSTRAINT "ConsumerHistory_consumerId_fkey" FOREIGN KEY ("consumerId") REFERENCES "Consumer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsumerHistory" ADD CONSTRAINT "ConsumerHistory_cityCode_fkey" FOREIGN KEY ("cityCode") REFERENCES "City"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsumerHistory" ADD CONSTRAINT "ConsumerHistory_consumerTypeid_fkey" FOREIGN KEY ("consumerTypeid") REFERENCES "ConsumerType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsumerHistory" ADD CONSTRAINT "ConsumerHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
