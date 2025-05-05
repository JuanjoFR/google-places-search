import { timestamps } from '@/lib/columns-helpers';
import { integer, jsonb, pgTable, varchar } from 'drizzle-orm/pg-core';

export const placesTable = pgTable('places', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  places_api_id: varchar({ length: 255 }).notNull().unique(),
  display_name: jsonb()
    .$type<{ text: string; languageCode: string }>()
    .notNull(),
  international_phone_number: varchar({ length: 255 }),
  website_uri: varchar({ length: 255 }),
  ...timestamps,
});
