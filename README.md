# Google Places Search

A tool designed to search and retrieve information about places using Google Places API.

## Purpose

This project aims to streamline the process of:

- Finding places using Google Places API
- Managing place information
- Tracking search results
- Processing place data

## Overview

The tool helps users search and retrieve detailed information about places using Google Places API.

## Docker Setup

Start the PostgreSQL development database using Docker Compose:

```bash
docker compose --env-file .env.local --project-name google-places-search up --detach
```

## Database Commands

To apply schema changes to your database:

```bash
npx drizzle-kit push
```

This command will sync your database schema with the latest changes in your Drizzle schema files.
