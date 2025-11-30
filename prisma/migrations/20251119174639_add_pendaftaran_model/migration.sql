-- CreateTable
CREATE TABLE "pendaftaran" (
    "id" SERIAL NOT NULL,
    "program" TEXT NOT NULL,
    "alamat" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pendaftaran_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pendaftaran" ADD CONSTRAINT "pendaftaran_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
