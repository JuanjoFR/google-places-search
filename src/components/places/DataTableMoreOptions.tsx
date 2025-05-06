'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Table } from '@tanstack/react-table';
import { EllipsisVertical } from 'lucide-react';
import { Button } from '../ui/button';
import { placesTable } from '@/db/schema';

type Place = typeof placesTable.$inferSelect;

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableMoreOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuItem
          onClick={() => {
            const headers = table
              .getHeaderGroups()
              .map((x) => x.headers)
              .flat();
            const rows = table.getCoreRowModel().rows;
            const formatCellValue = (value: unknown): string => {
              if (value === null || value === undefined) return '';
              if (typeof value === 'object' && 'text' in value) {
                return (value as Place['display_name']).text;
              }
              return String(value);
            };

            const csvBlob = new Blob(
              [
                headers
                  .map((header) => header.column.columnDef.header)
                  .join(',') +
                  '\n' +
                  rows
                    .map((row) =>
                      row
                        .getVisibleCells()
                        .map((cell) => formatCellValue(cell.getValue()))
                        .join(',')
                    )
                    .join('\n'),
              ],
              { type: 'text/csv;charset=utf-8;' }
            );
            const url = URL.createObjectURL(csvBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'places_result.csv';
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }}
        >
          Download CSV
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
