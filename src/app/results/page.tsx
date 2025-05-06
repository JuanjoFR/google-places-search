import Places from '@/components/Places';
import { TableSkeleton } from '@/components/places/TableSkeleton';
import * as React from 'react';
import Link from 'next/link';

export default async function Results({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { q, lang = 'es', region = 'ES' } = await searchParams;

  return (
    <div className="min-h-screen flex">
      {q ? (
        <div className="container mx-auto">
          <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
            <div className="flexspace-y-2">
              <h1 className="text-2xl font-bold tracking-tight">{q}</h1>
              <p className="text-muted-foreground">
                {`Search results for "${q}" in ${lang} (${region})`}
              </p>
            </div>
            <React.Suspense fallback={<TableSkeleton />}>
              <Places textQuery={q} languageCode={lang} regionCode={region} />
            </React.Suspense>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center flex-col gap-4">
          <h2 className="text-2xl font-bold">Please enter a search query</h2>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            Go to search page
          </Link>
        </div>
      )}
    </div>
  );
}
