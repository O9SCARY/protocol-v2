import { createApp } from "./app.module";
import { env } from "./config/env";
import { PrismaService } from "./prisma/prisma.service";

async function main() {
  await PrismaService.connect();

  const app = createApp();
  const server = app.listen(env.port, () => {
    console.log(`[server] listening on http://localhost:${env.port}`);
  });

  const shutdown = async () => {
    console.log("\n[server] shutting down...");
    server.close();
    await PrismaService.disconnect();
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

main().catch((err) => {
  console.error("[server] failed to start:", err);
  process.exit(1);
});
