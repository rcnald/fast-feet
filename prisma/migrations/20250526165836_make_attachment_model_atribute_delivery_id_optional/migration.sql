-- DropForeignKey
ALTER TABLE "attachments" DROP CONSTRAINT "attachments_delivery_id_fkey";

-- AlterTable
ALTER TABLE "attachments" ALTER COLUMN "delivery_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_delivery_id_fkey" FOREIGN KEY ("delivery_id") REFERENCES "deliveries"("id") ON DELETE SET NULL ON UPDATE CASCADE;
