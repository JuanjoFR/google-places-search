import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

config({ path: '.env.local' });

const dbUrl = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`;
export const db = drizzle(dbUrl, {
  schema,
});
