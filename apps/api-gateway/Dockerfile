FROM node:22-alpine AS base
WORKDIR /app
RUN npm install -g pnpm@11.9.0

# Install Python3 and compile utilities
RUN apk add --no-cache python3 py3-pip py3-virtualenv build-base

# Copy configuration files and lockfile
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json ./

# Install python requirements first to leverage cache layers
COPY apps/ai-service/requirements.txt ./apps/ai-service/requirements.txt
RUN python3 -m venv /opt/venv && /opt/venv/bin/pip install --no-cache-dir -r apps/ai-service/requirements.txt

# Copy all workspaces and scripts
COPY packages/ ./packages/
COPY apps/ ./apps/
COPY scripts/ ./scripts/

# Install all workspace dependencies
RUN pnpm install

# Generate Prisma clients for all microservices in the target Linux architecture
RUN DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres" DIRECT_URL="postgresql://postgres:postgres@localhost:5432/postgres" npx prisma generate --schema=apps/auth-service/prisma/schema.prisma
RUN DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres" DIRECT_URL="postgresql://postgres:postgres@localhost:5432/postgres" npx prisma generate --schema=apps/agent-service/prisma/schema.prisma
RUN DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres" DIRECT_URL="postgresql://postgres:postgres@localhost:5432/postgres" npx prisma generate --schema=apps/workflow-service/prisma/schema.prisma
RUN DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres" DIRECT_URL="postgresql://postgres:postgres@localhost:5432/postgres" npx prisma generate --schema=apps/payment-service/prisma/schema.prisma
RUN DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres" DIRECT_URL="postgresql://postgres:postgres@localhost:5432/postgres" npx prisma generate --schema=apps/wallet-service/prisma/schema.prisma
RUN DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres" DIRECT_URL="postgresql://postgres:postgres@localhost:5432/postgres" npx prisma generate --schema=apps/analytics-service/prisma/schema.prisma

# Build all monorepo microservices
RUN pnpm build

ENV PORT=10000
EXPOSE 10000

# Execute the production microservices manager
CMD ["node", "/app/scripts/start-all-production.js"]



