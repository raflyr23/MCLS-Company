-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailVerified" TIMESTAMP(3),
ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "pendaftaran" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Pending';
