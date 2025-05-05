'use client';

import { Table } from '@tanstack/react-table';
import { DataTableViewOptions } from './DataTableViewOptions';
import { DataTableMoreOptions } from './DataTableMoreOptions';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  // const isFiltered = table.getState().columnFilters.length > 0;

  // https://www.npmjs.com/package/tanstack-table-export-to-csv
  // const handleExportToCsv = (): void => {
  //   const headers = table
  //     .getHeaderGroups()
  //     .map((x) => x.headers)
  //     .flat();

  //   const rows = table.getCoreRowModel().rows;

  //   const csvBlob = getCsvBlob(headers, rows);
  // };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {/* <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        /> */}
        {/* {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )} */}
        {/* {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )} */}
        {/* {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )} */}
      </div>
      <div className="flex items-center space-x-2">
        <DataTableViewOptions table={table} />
        <DataTableMoreOptions table={table} />
      </div>
    </div>
  );
}
