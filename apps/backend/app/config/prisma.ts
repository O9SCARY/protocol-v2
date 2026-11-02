import { PrismaClient } from "@prisma/client";
import { env } from "./env";
import { PrismaPg } from "@prisma/adapter-pg";

const databaseUrl = new URL(env.DATABASE_URL);

const adapter = new PrismaPg({
    host: databaseUrl.hostname,
    port: Number(databaseUrl.port),
    user: databaseUrl.username,
    password: databaseUrl.password,
    database: databaseUrl.pathname.slice(1),
    ssl: true,
});

const prisma = new PrismaClient({ adapter });

export default prisma;