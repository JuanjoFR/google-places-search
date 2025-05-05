import Places from '@/components/Places';
import * as React from 'react';

export default async function Results({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { q, lang = 'es', region = 'ES' } = await searchParams;

  return (
    <div className="min-h-screen flex">
      {q ? (
        <React.Suspense fallback={<div>Loading...</div>}>
          <Places textQuery={q} languageCode={lang} regionCode={region} />
        </React.Suspense>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <h2 className="text-2xl font-bold">Please enter a search query.</h2>
        </div>
      )}
    </div>
  );
}
