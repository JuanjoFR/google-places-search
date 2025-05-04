'use client';

import { searchPlaces } from '@/lib/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';

const searchFormSchema = z.object({
  query: z.string().min(2, {
    message: 'Search query must be at least 2 characters.',
  }),
});

type SearchFormValues = z.infer<typeof searchFormSchema>;

export default function SearchForm() {
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      query: '',
    },
  });

  async function onSubmit(data: SearchFormValues) {
    // const result = await searchPlaces(data.query);
    // console.log(result);
    console.log('Search query:', data.query);
  }

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="query"
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
