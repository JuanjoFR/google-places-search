import SearchForm from '@/components/SearchForm';
import { searchPlaces } from '@/lib/actions';
import * as React from 'react';

export default function Home() {
  async function handleClick() {
    const result = await searchPlaces('Clínicas dentales en Terrassa');
    console.log(result);
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <React.Suspense fallback={<div>Loading...</div>}>
        <SearchForm />
      </React.Suspense>
    </div>
  );
}
