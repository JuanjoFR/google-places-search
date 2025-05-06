const BASE_URL = 'https://places.googleapis.com/v1';

// Places API documentation: https://developers.google.com/maps/documentation/places/web-service/text-search
export async function searchPlacesFromAPI({
  textQuery,
  languageCode,
  regionCode,
  pageToken,
}: {
  textQuery: string;
  languageCode?: string;
  regionCode?: string;
  pageToken?: string;
}) {
  const response = await fetch(`${BASE_URL}/places:searchText`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': process.env.GOOGLE_MAPS_API_KEY!,
      'X-Goog-FieldMask': 'places.id,nextPageToken',
    },
    body: JSON.stringify({
      textQuery,
      languageCode,
      regionCode,
      pageToken,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Places API documentation: https://developers.google.com/maps/documentation/places/web-service/place-details
export async function getPlaceDetails(placeId: string) {
  const response = await fetch(`${BASE_URL}/places/${placeId}`, {
    headers: {
      'X-Goog-Api-Key': process.env.GOOGLE_MAPS_API_KEY!,
      'X-Goog-FieldMask': 'displayName,internationalPhoneNumber,websiteUri',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
