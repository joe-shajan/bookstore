import { config } from "dotenv";
config();

export const DB_URL = process.env.DB_URL as string;
export const ELASTIC_CLOUD_ID = process.env.ELASTIC_CLOUD_ID as string;
export const ELASTIC_USERNAME = process.env.ELASTIC_USERNAME as string;
export const ELASTIC_PASSWORD = process.env.ELASTIC_PASSWORD as string;
export const ORIGIN = process.env.ORIGIN as string;
export const PORT = process.env.PORT;
export const NODE_ENV = process.env.NODE_ENV as string;
export const CREDENTIALS = process.env.CREDENTIALS as string;
export const LOG_DIR = process.env.LOG_DIR as string;
