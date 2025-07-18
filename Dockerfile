# STAGE 1: Build Stage
FROM node:20-slim AS builder

# Instala dependências de sistema necessárias para build e runtime
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    make \
    g++ \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    poppler-utils \
    pdftk-java \
    curl

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Remove dependências de desenvolvimento
RUN npm prune --production

# STAGE 2: Production Stage
FROM node:20-slim

# Instala dependências de sistema de runtime
RUN apt-get update && apt-get install -y --no-install-recommends \
    libcairo2 \
    libpango-1.0-0 \
    libjpeg62-turbo \
    libgif7 \
    poppler-utils \
    pdftk-java \
    curl \
    dumb-init \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copia apenas o necessário do builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/uploads ./uploads
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/shared ./shared

# Cria usuário não-root
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 --gid 1001 nextjs
RUN chown -R nextjs:nodejs /app

USER nextjs

# Exponha a porta padrão do Next.js
EXPOSE 3000

# Healthcheck (ajuste a rota se necessário)
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=5 \
  CMD curl -f http://localhost:3000/ || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"] 