import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";

const env = loadEnv("test", process.cwd(), "");

export default defineConfig({
    test: {
        include: ["src/**/*.test.ts"],
        env: {
            JWT_SECRET: "secreto-solo-para-tests",
            DATABASE_URL:
                env.DATABASE_URL ??
                process.env.DATABASE_URL ??
                "postgresql://test:test@127.0.0.1:5432/libreria_test",
        },
    },
});