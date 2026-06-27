FROM node:22-alpine AS base
WORKDIR /app
RUN npm install -g pnpm@11.9.0

# Install dependencies in root context
COPY package.json pnpm-workspace.yaml turbo.json ./
COPY packages/types/package.json ./packages/types/
COPY packages/sdk/package.json ./packages/sdk/
COPY apps/api/package.json ./apps/api/
RUN pnpm install --ignore-scripts

# Copy code and build NestJS
COPY . .
RUN pnpm --filter api build

EXPOSE 5000
CMD ["pnpm", "--filter", "api", "start"]
