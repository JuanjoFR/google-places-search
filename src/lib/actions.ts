'use server';

// Example using the new official SDK (client library)
// https://github.com/googleapis/google-cloud-node/blob/main/packages/google-maps-places/samples/generated/v1/places.search_text.js
export async function searchPlaces(input: string) {
  // 1. Do an initial search in Places API
  // 2. For each place:
  // 2.1. Find the place in the database
  // 2.2. If it exists, do nothing
  // 2.3. If it doesn't exist, search details in Places API and save it in the database
  // 4. If pageToken exists, do the same for the next page
  // 5. Return the list of places
  try {
    const response = await fetch(
      'https://places.googleapis.com/v1/places:searchText',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': process.env.GOOGLE_MAPS_API_KEY!,
          // 'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.location,places.id',
          'X-Goog-FieldMask': 'places.id,nextPageToken',
        },
        body: JSON.stringify({
          textQuery: input,
          languageCode: 'es',
          regionCode: 'ES',
          pageSize: process.env.NODE_ENV === 'development' ? 3 : 0, // https://developers.google.com/maps/documentation/places/web-service/text-search?hl=es-419#pagesize
          // pageToken: '',
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.places || [];
  } catch (error) {
    console.error('Error searching places:', error);
    throw new Error('Failed to search places');
  }
}
