import { Skeleton } from '@/components/ui/skeleton';

export function SearchFormSkeleton() {
  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <div className="relative">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="absolute right-0 top-0 h-12 w-12" />
      </div>
    </div>
  );
}
