const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '../.env');
let url = '';
let token = '';

try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const lines = envContent.split('\n');
  for (const line of lines) {
    const parts = line.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
      if (key === 'UPSTASH_REDIS_REST_URL') {
        url = val;
      } else if (key === 'UPSTASH_REDIS_REST_TOKEN') {
        token = val;
      }
    }
  }
} catch (err) {
  console.error("Could not read .env file:", err.message);
  process.exit(1);
}

if (!url || !token) {
  console.error("Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN in .env file.");
  process.exit(1);
}

async function main() {
  console.log(`Clearing Redis key 'marketplace:agents' on Upstash...`);
  try {
    const res = await fetch(`${url}/del/marketplace:agents`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const result = await res.json();
    console.log("Upstash Redis response:", result);
  } catch (err) {
    console.error("Failed to clear Redis:", err);
  }
}

main();
