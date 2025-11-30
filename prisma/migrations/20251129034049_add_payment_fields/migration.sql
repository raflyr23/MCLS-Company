-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "pendaftaran" ADD COLUMN     "paymentStatus" TEXT NOT NULL DEFAULT 'Unpaid',
ADD COLUMN     "snapToken" TEXT;
