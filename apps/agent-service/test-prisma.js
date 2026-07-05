const { PrismaClient } = require('./node_modules/@prisma/client-agent');

const directUrl = process.env.DIRECT_URL || process.env.DATABASE_URL;

if (!directUrl) {
  throw new Error("DIRECT_URL or DATABASE_URL environment variable is missing.");
}

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: directUrl
    }
  },
  log: ['query', 'info', 'warn', 'error']
});

async function main() {
  try {
    const agents = await prisma.agent.findMany();
    console.log("Agents query succeeded! Count:", agents.length);
  } catch (err) {
    console.error("Prisma query error:", err);
  } finally {
    await prisma.$disconnect();
  }
}
main();
