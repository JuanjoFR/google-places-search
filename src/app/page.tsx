'use client';

import { Button } from '@/components/ui/button';
import { searchPlaces } from '@/lib/actions';

export default function Home() {
  async function handleClick() {
    const result = await searchPlaces('Clínicas dentales en Terrassa');
    console.log(result);
  }

  return (
    <div>
      <h1>Hello world</h1>
      <Button onClick={handleClick}>Button</Button>
    </div>
  );
}
