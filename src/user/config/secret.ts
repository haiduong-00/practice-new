import { config } from 'dotenv';
config();

export const EXPIRES_IN = process.env.EXPIRES_IN;
export const SECRET_KEY = process.env.SECRET_KEY;
export const PORT = process.env.port;
export const HOST = process.env.host;
