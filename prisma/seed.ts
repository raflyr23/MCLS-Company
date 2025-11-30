// prisma/seed.ts
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@mcls.com' },
    update: {},
    create: {
      email: 'admin@mcls.com',
      name: 'Super Admin',
      password: hashedPassword,
      role: Role.ADMIN, // Gunakan Enum Role yang diimport
      phone: '081234567890'
    },
  });

  console.log({ admin });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });