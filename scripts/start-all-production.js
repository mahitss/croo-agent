const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Services configuration
const services = [
  {
    name: 'api-gateway',
    dir: 'apps/api-gateway',
    port: process.env.PORT || 10000,
    cmd: 'node',
    args: ['--max-old-space-size=128', 'dist/main.js']
  },
  {
    name: 'auth-service',
    dir: 'apps/auth-service',
    port: 5001,
    cmd: 'node',
    args: ['--max-old-space-size=96', 'dist/main.js']
  },
  {
    name: 'agent-service',
    dir: 'apps/agent-service',
    port: 5002,
    cmd: 'node',
    args: ['--max-old-space-size=96', 'dist/main.js']
  },
  {
    name: 'workflow-service',
    dir: 'apps/workflow-service',
    port: 5003,
    cmd: 'node',
    args: ['--max-old-space-size=96', 'dist/main.js']
  },
  {
    name: 'payment-service',
    dir: 'apps/payment-service',
    port: 5004,
    cmd: 'node',
    args: ['--max-old-space-size=96', 'dist/main.js']
  },
  {
    name: 'wallet-service',
    dir: 'apps/wallet-service',
    port: 5005,
    cmd: 'node',
    args: ['--max-old-space-size=96', 'dist/main.js']
  },
  {
    name: 'notification-service',
    dir: 'apps/notification-service',
    port: 5006,
    cmd: 'node',
    args: ['--max-old-space-size=96', 'dist/main.js']
  },
  {
    name: 'analytics-service',
    dir: 'apps/analytics-service',
    port: 5007,
    cmd: 'node',
    args: ['--max-old-space-size=96', 'dist/main.js']
  },
  {
    name: 'ai-service',
    dir: 'apps/ai-service',
    port: 8000,
    cmd: '/opt/venv/bin/python',
    args: ['main.py']
  }
];

const children = [];

function startService(service) {
  const serviceDir = path.resolve(__dirname, '..', service.dir);
  console.log(`[MANAGER] Starting ${service.name} on port ${service.port} in ${serviceDir}...`);
  
  // Set up child environment overrides
  const env = { 
    ...process.env, 
    PORT: service.port.toString(),
    // Propagate variables correctly
  };

  // Check if python executable exists, fallback to standard python3 if not
  let executable = service.cmd;
  if (service.name === 'ai-service' && !fs.existsSync(executable)) {
    executable = 'python3';
  }

  const child = spawn(executable, service.args, {
    cwd: serviceDir,
    env
  });

  child.on('error', (err) => {
    console.error(`[MANAGER] [ERROR] Failed to spawn ${service.name}:`, err.message);
  });

  child.stdout.on('data', (data) => {
    console.log(`[${service.name}] ${data.toString().trim()}`);
  });

  child.stderr.on('data', (data) => {
    console.error(`[${service.name}] [ERROR] ${data.toString().trim()}`);
  });

  child.on('close', (code) => {
    console.log(`[MANAGER] ${service.name} exited with code ${code}`);
    // Auto-restart logic for crucial services (excluding manual shutdown)
    if (code !== 0 && !process.env.STOPPING) {
      console.log(`[MANAGER] Restarting ${service.name} in 3 seconds...`);
      setTimeout(() => startService(service), 3000);
    }
  });

  children.push(child);
}

// Start all services with a staggered delay of 1500ms to reduce peak CPU & memory spikes during container startup
services.forEach((service, index) => {
  setTimeout(() => {
    startService(service);
  }, index * 1500);
});

// Handle process termination cleanly
process.on('SIGTERM', () => {
  console.log('[MANAGER] SIGTERM received. Shutting down all microservices...');
  process.env.STOPPING = 'true';
  children.forEach(child => child.kill());
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('[MANAGER] SIGINT received. Shutting down all microservices...');
  process.env.STOPPING = 'true';
  children.forEach(child => child.kill());
  process.exit(0);
});
