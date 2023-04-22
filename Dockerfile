FROM ghcr.io/architecture-it/react:node-18 AS deps
WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci --no-progress --silent --maxsockets 1; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else \
    echo "ERROR: Falta archivo lockfile. Ver más en https://architecture-it.github.io/docs/Platform/Front/#manejo-de-dependencias"; \
    exit 1; \
  fi

FROM ghcr.io/architecture-it/react:node-18 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build

FROM ghcr.io/architecture-it/nginx:latest
COPY --from=builder /app/build .
# WORKAROUND si se tiene problemas con permisos, (Evitar)
# RUN touch ./public/__ENV.js && chmod 777 ./public/__ENV.js

CMD ["/bin/sh", "-c", "react-env -d ./ -- && nginx -g \"daemon off;\""]
