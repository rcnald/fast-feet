-- DropForeignKey
ALTER TABLE "deliveries" DROP CONSTRAINT "deliveries_delivery_person_id_fkey";

-- AlterTable
ALTER TABLE "deliveries" ALTER COLUMN "delivery_person_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_delivery_person_id_fkey" FOREIGN KEY ("delivery_person_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
