import { type Express } from "express";

export async function registerRoutes(app: Express) {
  // Static website, no routes needed
  return app;
}