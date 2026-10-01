import express, { Express } from "express";
import { errorHandler } from "./common/middleware/error-handler";

// As modules get built under app/modules/<name>/, import their router here
// and mount it, e.g.: app.use("/api/menu", menuRouter)

export function createApp(): Express {
  const app = express();

  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // --- module routers mount below ---

  app.use(errorHandler);

  return app;
}
