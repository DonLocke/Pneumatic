FROM denoland/deno:latest

WORKDIR /sql

COPY init.sql init.sql

WORKDIR /app

COPY . .

RUN deno install
RUN deno run build

CMD ["deno", "run", "--allow-env", "--allow-net", "--allow-read", ".deno-deploy/server.ts"]