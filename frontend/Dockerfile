# Многоэтапная сборка для Next.js приложения
FROM node:20-alpine AS base

# Установка зависимостей только когда нужно
FROM base AS deps
# Проверяем https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine 
# чтобы понять, зачем может понадобиться libc6-compat.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Устанавливаем зависимости на основе предпочитаемого менеджера пакетов
COPY package.json package-lock.json* ./
RUN npm ci

# Пересобираем исходный код только когда нужно
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js собирает телеметрию полностью анонимно.
# Узнать больше здесь: https://nextjs.org/telemetry
# Раскомментируйте следующую строку, если хотите отключить телеметрию во время сборки.
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Образ для продакшена, скопируем все файлы и запустим next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Раскомментируйте следующую строку, если хотите отключить телеметрию во время выполнения.
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Автоматически используем output traces для уменьшения размера образа
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"] 