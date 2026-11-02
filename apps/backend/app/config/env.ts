import { error } from "console";
import dotenv from "dotenv";

dotenv.config()

function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Required Environment variable: ${name} not found in .env...`)
    }
    return value;
}

const NODE_ENVS = ["development", "production", "test"] as const;
type NodeEnv = (typeof NODE_ENVS)[number];

function isNodeEnv(value: string): value is NodeEnv {
    return (NODE_ENVS as readonly string[]).includes(value);
}

function getNodeEnv(): NodeEnv {
    const value = process.env.NODE_ENV ?? "development";

    if (!isNodeEnv(value)) {
        throw new Error(`Required NODE_ENV is Invalid`);
    }
    return value;
}


export const env = {
    NODE_ENV: getNodeEnv,
    PORT: Number(process.env.PORT) || 2000,
    DATABASE_URL: requireEnv("DATABASE_URL"),
} as const;
