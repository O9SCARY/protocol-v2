import { PrismaClient } from "@prisma/client";

// Single shared PrismaClient instance for the whole app.
// Import `prisma` wherever you need DB access — don't `new PrismaClient()` elsewhere,
// each instance opens its own connection pool.
class PrismaService {
  private static instance: PrismaClient;

  static getInstance(): PrismaClient {
    if (!PrismaService.instance) {
      PrismaService.instance = new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
      });
    }
    return PrismaService.instance;
  }

  static async connect(): Promise<void> {
    await PrismaService.getInstance().$connect();
    console.log("[prisma] connected to database");
  }

  static async disconnect(): Promise<void> {
    await PrismaService.getInstance().$disconnect();
    console.log("[prisma] disconnected from database");
  }
}

export const prisma = PrismaService.getInstance();
export { PrismaService };
