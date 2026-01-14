import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./drizzle/schema",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEON_DB_URI!,
  },
});
