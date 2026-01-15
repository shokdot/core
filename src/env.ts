import { z } from "zod";

const envSchema = z.object({
	COOKIE_SECRET: z.string().min(1, "COOKIE_SECRET is required"),
	API_PREFIX: z.string().default("/api/v1"),
	USER_SERVICE_URL: z.url("USER_SERVICE_URL must be a valid URL"),
	SERVICE_TOKEN: z.string().min(1, "SERVICE_TOKEN is required"),
	LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace"]).default("info"),
	JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
	JWT_REFRESH_SECRET: z.string().min(1, "JWT_REFRESH_SECRET is required"),
	JWT_TWO_FA: z.string().min(1, "JWT_TWO_FA is required"),
	LOGSTASH_HOST: z.string().default("localhost"),
	LOGSTASH_PORT: z.coerce.number().int().min(1).max(65535).default(5044),
});

const env = envSchema.parse(process.env);

export const COOKIE_SECRET = env.COOKIE_SECRET;
export const API_PREFIX = env.API_PREFIX;
export const USER_SERVICE_URL = env.USER_SERVICE_URL;
export const SERVICE_TOKEN = env.SERVICE_TOKEN;
export const LOG_LEVEL = env.LOG_LEVEL;
export const JWT_SECRET = env.JWT_SECRET;
export const JWT_REFRESH_SECRET = env.JWT_REFRESH_SECRET;
export const JWT_TWO_FA = env.JWT_TWO_FA;
export const LOGSTASH_HOST = env.LOGSTASH_HOST;
export const LOGSTASH_PORT = env.LOGSTASH_PORT;
