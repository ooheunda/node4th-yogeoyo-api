import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],

  errorFormat: "pretty",
});

console.log("prisma client");
