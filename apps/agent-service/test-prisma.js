const { PrismaClient } = require('./src/generated/client');

const directUrl = "postgresql://neondb_owner:npg_xNPUq8RdbgM3@ep-flat-fog-aohnirvo.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&schema=agents";

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
