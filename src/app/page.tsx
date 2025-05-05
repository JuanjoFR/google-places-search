import SearchForm from '@/components/SearchForm';
import * as React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <React.Suspense fallback={<div>Loading...</div>}>
        <SearchForm />
      </React.Suspense>
    </div>
  );
}
