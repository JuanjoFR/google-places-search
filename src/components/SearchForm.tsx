'use client';

import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';

const searchFormSchema = z.object({
  q: z.string().min(2, {
    message: 'Search query must be at least 2 characters.',
  }),
  lang: z.string(),
  region: z.string(),
});

type SearchFormValues = z.infer<typeof searchFormSchema>;

export default function SearchForm() {
  const router = useRouter();
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      q: '',
      lang: 'es',
      region: 'ES',
    },
  });

  async function onSubmit(data: SearchFormValues) {
    const searchParams = new URLSearchParams(data);

    router.push(`/results?${searchParams.toString()}`);
  }

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <input type="hidden" {...form.register('lang')} />
          <input type="hidden" {...form.register('region')} />
          <FormField
            control={form.control}
            name="q"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Search places..."
                    {...field}
                    className="h-12 text-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full sm:w-auto">
            Search
          </Button>
        </form>
      </Form>
    </div>
  );
}
