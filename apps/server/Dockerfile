
# Builder
FROM node:21-alpine3.18 as builder
WORKDIR /app/builder

COPY /package.json yarn.lock ./
RUN --mount=type=cache,id=yarn,target=/yarn/store yarn install --frozen-lockfile --ignore-scripts
RUN yarn install

COPY . .
ARG DOPPLER_TOKEN
ENV DOPPLER_TOKEN "$DOPPLER_TOKEN"

RUN yarn nx prisma-generate server -skip-nx-cache
RUN yarn nx build server --production -skip-nx-cache


# Production
FROM node:21-alpine3.18
WORKDIR /app

## Doppler
RUN wget -q -t3 'https://packages.doppler.com/public/cli/rsa.8004D9FF50437357.key' -O /etc/apk/keys/cli@doppler-8004D9FF50437357.rsa.pub && \
    echo 'https://packages.doppler.com/public/cli/alpine/any-version/main' | tee -a /etc/apk/repositories && \
    apk add doppler

COPY --from=builder /app/builder/dist/apps/server/main.js ./
COPY --from=builder /app/builder/dist/apps/server/package.json ./

COPY apps/server/prisma ./prisma
COPY apps/server/scripts/start-server.sh ./script.sh

RUN yarn install --production 

EXPOSE 8080
ENTRYPOINT [ "doppler", "run", "--", "/bin/sh", "script.sh" ]