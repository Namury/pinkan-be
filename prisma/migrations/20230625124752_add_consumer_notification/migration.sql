-- CreateTable
CREATE TABLE "ConsumerNotification" (
    "id" TEXT NOT NULL,
    "consumerId" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL,
    "daysRemaining" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ConsumerNotification_id_key" ON "ConsumerNotification"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ConsumerNotification_consumerId_key" ON "ConsumerNotification"("consumerId");

-- AddForeignKey
ALTER TABLE "ConsumerNotification" ADD CONSTRAINT "ConsumerNotification_consumerId_fkey" FOREIGN KEY ("consumerId") REFERENCES "Consumer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
