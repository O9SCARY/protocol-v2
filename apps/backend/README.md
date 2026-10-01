# Protocol V2 — Backend

TypeScript + Express + Prisma + Postgres.

## Structure

```
app/            Express application code
  common/       Shared middleware, error handling
  config/       Env loading & validation
  modules/      Feature modules (routes/validator/controller/service/repository)
  prisma/       PrismaService (singleton PrismaClient wrapper)
  script/       One-off / maintenance scripts
  test/         Tests
  app.module.ts Express app assembly + route mounting
  server.ts     Entry point
database/
  prisma/
    schema.prisma   Prisma schema (datasource + models)
packages/
  config/       Shared config values across app & database (if/when needed)
  shared-types/ Types shared across app & database (if/when needed)
```

This is a single npm project (not a monorepo) — `database/` and `packages/`
are just organizational folders referenced by relative path, not separate
installable packages.

## First-time setup

```bash
npm install
cp .env.example .env

npm install express
npm install nodemon ts-node
npm install @types/express --save-dev

```

Server starts on `http://localhost:4000` (or whatever `PORT` is set to).
`GET /health` returns `{ status: "ok" }` once it's up.

## Moving to cloud Postgres later

Swap `DATABASE_URL` in `.env` for the cloud connection string, then run
`npm run prisma:migrate` again to apply the schema there. No code changes
needed — Prisma reads the URL from env.

## Adding a module

Create `app/modules/<name>/` following the layered pattern
(`routes → validator → controller → service → repository`), then import
and mount its router in `app/app.module.ts`.
