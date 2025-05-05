'use client';

import { placesTable } from '@/db/schema';
import { ColumnDef } from '@tanstack/react-table';

type Place = typeof placesTable.$inferSelect;

export const columns: ColumnDef<Place>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    meta: {
      viewDropdownDisplayName: 'ID',
    },
    cell: ({ row }) => {
      const id = row.getValue('id') as Place['id'];

      return <span className="text-gray-500">{id}</span>;
    },
  },
  {
    accessorKey: 'places_api_id',
    header: 'Places API ID',
    meta: {
      viewDropdownDisplayName: 'Places API ID',
    },
    cell: ({ row }) => {
      const placesApiId = row.getValue(
        'places_api_id'
      ) as Place['places_api_id'];

      return <span className="text-gray-500">{placesApiId}</span>;
    },
  },
  {
    accessorKey: 'display_name',
    header: 'Name',
    meta: {
      viewDropdownDisplayName: 'Name',
    },
    cell: ({ row }) => {
      const { text, languageCode } = row.getValue(
        'display_name'
      ) as Place['display_name'];

      return (
        <div>
          <span>{text}</span>
          <span className="text-xs text-gray-500 ml-1">({languageCode})</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'international_phone_number',
    header: 'Phone Number',
    meta: {
      viewDropdownDisplayName: 'Phone number',
    },
    cell: ({ row }) => {
      const phoneNumber = row.getValue(
        'international_phone_number'
      ) as Place['international_phone_number'];

      if (!phoneNumber) {
        return <span className="text-gray-500">N/A</span>;
      }

      return (
        <a
          href={`tel:${phoneNumber}`}
          className="text-blue-500 hover:underline"
        >
          {phoneNumber}
        </a>
      );
    },
  },
  {
    accessorKey: 'website_uri',
    header: 'Website',
    meta: {
      viewDropdownDisplayName: 'Website',
    },
    cell: ({ row }) => {
      const websiteUri = row.getValue('website_uri') as Place['website_uri'];

      if (!websiteUri) {
        return <span className="text-gray-500">N/A</span>;
      }

      return (
        <a
          href={websiteUri}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {websiteUri}
        </a>
      );
    },
  },
  {
    accessorKey: 'created_at',
    header: 'Created at',
    meta: {
      viewDropdownDisplayName: 'Created At',
    },
    cell: ({ row }) => {
      const createdAt = row.getValue('created_at') as Place['created_at'];

      return <span>{new Date(createdAt).toLocaleString()}</span>;
    },
  },
  {
    accessorKey: 'updated_at',
    header: 'Updated at',
    meta: {
      viewDropdownDisplayName: 'Updated At',
    },
    cell: ({ row }) => {
      const updatedAt = row.getValue('updated_at') as Place['updated_at'];

      return (
        <span>{updatedAt ? new Date(updatedAt).toLocaleString() : 'N/A'}</span>
      );
    },
  },
  {
    accessorKey: 'deleted_at',
    header: 'Deleted At',
    meta: {
      viewDropdownDisplayName: 'Deleted at',
    },
    cell: ({ row }) => {
      const deletedAt = row.getValue('deleted_at') as Place['deleted_at'];

      return (
        <span>{deletedAt ? new Date(deletedAt).toLocaleString() : 'N/A'}</span>
      );
    },
  },
];
