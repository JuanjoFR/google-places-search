import { getPlaceDetails, searchPlacesFromAPI } from '@/lib/services/places';
import { db } from '@/db/drizzle';
import { placesTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import * as React from 'react';
import { DataTable } from './places/DataTable';
import { columns } from './places/columns';

type SelectPlace = typeof placesTable.$inferSelect;

interface PlacesProps {
  textQuery: string;
  languageCode: string;
  regionCode: string;
}

export const getPlaces = React.cache(
  async ({ textQuery, languageCode, regionCode }: PlacesProps) => {
    const processedPlaces = new Set();
    const apiListResults: { id: string }[] = [];
    const places: SelectPlace[] = [];

    async function processPage(pageToken?: string) {
      console.log('Processing page with token:', pageToken);
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate delay

      if (!textQuery) {
        return;
      }

      const data = await searchPlacesFromAPI({
        textQuery,
        languageCode,
        regionCode,
        pageToken,
      });
      console.log('Data:', data);

      for (const place of data.places) {
        if (processedPlaces.has(place.id)) continue;
        processedPlaces.add(place.id);

        // Check if place exists in database
        // const existingPlace = await db.places.findUnique({
        //   where: { id: place.id },
        // });
        const existingPlace = await db.query.placesTable.findFirst({
          where: eq(placesTable.places_api_id, place.id),
        });
        console.log('Existing Place:', existingPlace);

        if (existingPlace) {
          const found = places.find((p) => p.id === existingPlace.id);
          if (!found) {
            places.push(existingPlace);
          }
        } else {
          // Get details and save to database
          console.log('TODO get details and save to database');
          const details = await getPlaceDetails(place.id);
          // await db.place.create({
          //   data: {
          //     id: place.id,
          //     name: details.displayName,
          //     address: details.formattedAddress,
          //     location: details.location,
          //   },
          // });
          console.log('data to insert:', {
            places_api_id: place.id,
            display_name: details.displayName,
            international_phone_number: details.internationalPhoneNumber,
            website_uri: details.websiteUri,
          });
          let insertResult;
          try {
            insertResult = await db
              .insert(placesTable)
              .values({
                places_api_id: place.id,
                display_name: details.displayName,
                international_phone_number: details.internationalPhoneNumber,
                website_uri: details.websiteUri,
              })
              .returning();
          } catch (error: unknown) {
            if (
              error instanceof Error &&
              error.message.includes('places_places_api_id_unique')
            ) {
              console.log(
                `Place with ID ${place.id} already exists in database - skipping insert`
              );
            } else {
              throw error;
            }
          }
          console.log('Insert Result:', insertResult);
        }

        apiListResults.push(place);
      }

      // Process next page if token exists
      // if (data.nextPageToken) {
      //   await processPage(data.nextPageToken);
      // }
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
  // const places = await getPlaces({
  //   textQuery,
  //   languageCode,
  //   regionCode,
  // });
  const places = [
    {
      id: 1,
      places_api_id: 'ChIJVY_R0pWSpBIRsBvGt00k1TQ',
      display_name: {
        text: 'Clínica Dental Abac | Tu Dentista en Terrassa',
        languageCode: 'es',
      },
      international_phone_number: '+34 937 33 01 66',
      website_uri: 'https://www.centredentalabac.com/',
      updated_at: null,
      created_at: new Date('2025-05-05T10:50:33.744Z'),
      deleted_at: null,
    },
    {
      id: 2,
      places_api_id: 'ChIJvdVHgJSSpBIRIU8nQ6hbFIY',
      display_name: { text: 'Clínica Dental Galileu', languageCode: 'es' },
      international_phone_number: '+34 937 88 35 14',
      website_uri: 'http://www.dentalgalileo.com/',
      updated_at: null,
      created_at: new Date('2025-05-05T11:05:02.302Z'),
      deleted_at: null,
    },
  ];

  console.log('Places:', places);

  return (
    // <div>
    //   <div>{`show ${textQuery}, ${languageCode}, ${regionCode}`}</div>
    //   <div>
    //     {places.map((place) => (
    //       <div key={place.id}>
    //         <h3>{place.display_name.text}</h3>
    //         <p>{place.international_phone_number}</p>
    //         <p>{place.website_uri}</p>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div className="container mx-auto">
      <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
        <div className="flexspace-y-2">
          <h1 className="text-2xl font-bold tracking-tight">{textQuery}</h1>
          <p className="text-muted-foreground">
            {`Search results for "${textQuery}" in ${languageCode} (${regionCode})`}
          </p>
        </div>
        <DataTable data={places} columns={columns} />
      </div>
    </div>
  );
}
