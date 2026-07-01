FROM node:22-alpine AS base
WORKDIR /app
RUN npm install -g pnpm@11.9.0

# Copy configuration files and lockfile
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json ./

# Copy all workspaces
COPY packages/ ./packages/
COPY apps/ ./apps/

# Install all workspace dependencies
RUN pnpm install

# Build NextJS web app
RUN pnpm --filter web build

EXPOSE 3000
CMD ["pnpm", "--filter", "web", "start"]

