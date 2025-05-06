import SearchForm from '@/components/SearchForm';
import { SearchFormSkeleton } from '@/components/SearchFormSkeleton';
import * as React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <React.Suspense fallback={<SearchFormSkeleton />}>
        <SearchForm />
      </React.Suspense>
    </div>
  );
}
