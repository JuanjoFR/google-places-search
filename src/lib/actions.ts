'use server';

// Example using the new official SDK (client library)
// https://github.com/googleapis/google-cloud-node/blob/main/packages/google-maps-places/samples/generated/v1/places.search_text.js
export async function searchPlaces(input: string) {
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
