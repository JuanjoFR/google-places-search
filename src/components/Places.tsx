import { getPlaceDetails, searchPlacesFromAPI } from '@/lib/services/places';
import { db } from '@/db/drizzle';
import { placesTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import * as React from 'react';
import { DataTable } from './places/DataTable';
import { columns } from './places/columns';

type Place = typeof placesTable.$inferSelect;

interface PlacesProps {
  textQuery: string;
  languageCode: string;
  regionCode: string;
}

/**
 * Cached version of places search to save resources.
 * Note: Results will be cached for the lifetime of the server process.
 */
export const getPlaces = React.cache(
  async ({ textQuery, languageCode, regionCode }: PlacesProps) => {
    const places: Place[] = [];

    if (!textQuery) {
      return places;
    }

    let pageIndex = 0;

    async function processPage(pageToken?: string) {
      // Log only when fetching new pages
      console.log(
        `[Places] Fetching page ${pageIndex + 1}${pageToken ? ' with continuation token' : ''}`
      );
      pageIndex++;
      const data = await searchPlacesFromAPI({
        textQuery,
        languageCode,
        regionCode,
        pageToken,
      });

      for (const place of data.places) {
        const existingPlace = await db.query.placesTable.findFirst({
          where: eq(placesTable.places_api_id, place.id),
        });

        if (existingPlace) {
          places.push(existingPlace);
        } else {
          // Log only for new places that need API calls
          console.log(`[Places] Fetching details for new place: ${place.id}`);
          await new Promise((resolve) => setTimeout(resolve, 200));
          const details = await getPlaceDetails(place.id);

          try {
            const insertResult = await db
              .insert(placesTable)
              .values({
                places_api_id: place.id,
                display_name: details.displayName,
                international_phone_number: details.internationalPhoneNumber,
                website_uri: details.websiteUri,
              })
              .returning();
            places.push(insertResult[0]);
          } catch (error: unknown) {
            if (
              error instanceof Error &&
              error.message.includes('places_places_api_id_unique')
            ) {
              console.log(
                `[Places] Handling concurrent insert for place: ${place.id}`
              );
              const existingRecord = await db.query.placesTable.findFirst({
                where: eq(placesTable.places_api_id, place.id),
              });
              if (existingRecord) {
                places.push(existingRecord);
              }
            } else {
              console.error(
                `[Places] Error processing place ${place.id}:`,
                error
              );
              throw error;
            }
          }
        }
      }

      // Process next page if token exists
      if (data.nextPageToken) {
        // Add delay to respect API rate limits
        await new Promise((resolve) => setTimeout(resolve, 200));
        await processPage(data.nextPageToken);
      }
    }

    await processPage();
    return places;
  }
);

export default async function Places({
  textQuery,
  languageCode,
  regionCode,
}: PlacesProps) {
  const places = await getPlaces({
    textQuery,
    languageCode,
    regionCode,
  });

  return <DataTable data={places} columns={columns} />;
}
