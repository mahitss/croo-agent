const { PrismaClient } = require('./node_modules/@prisma/client-workflow');
const prisma = new PrismaClient();

async function main() {
  console.log('Executing database schema enums updates on Neon PostgreSQL...');
  const enums = ['queued', 'planning', 'scheduling', 'retrying', 'cancelled', 'paused'];
  for (const val of enums) {
    try {
      await prisma.$executeRawUnsafe(`ALTER TYPE workflows."ExecutionStatus" ADD VALUE '${val}'`);
      console.log(`Enum value added successfully: ${val}`);
    } catch (e) {
      console.log(`Skipped or already exists: ${val} (${e.message})`);
    }
  }
  await prisma.$disconnect();
  console.log('Database enum patch script completed.');
}

main().catch(console.error);
