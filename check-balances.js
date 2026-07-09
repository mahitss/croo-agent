const { PrismaClient } = require('./apps/wallet-service/node_modules/@prisma/client-wallet');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://neondb_owner:npg_vtNFKoZ0CQ9L@18.138.49.39/neondb?sslmode=require&sslaccept=accept_invalid_certs&options=project%3Dep-flat-fog-aohnirvo-pooler&schema=wallet"
    }
  }
});

async function main() {
  const wallets = await prisma.wallet.findMany({
    include: {
      balances: true
    }
  });
  console.log("WALLETS IN DATABASE:");
  console.log(JSON.stringify(wallets, null, 2));
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
