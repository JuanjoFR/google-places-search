# Website Development Studio - Business Prospecting Tool

A tool designed to help identify and contact businesses that need website design and development services.

## Purpose

This project aims to streamline the process of:

- Finding businesses without websites or with outdated web presence
- Managing potential client information
- Tracking outreach efforts
- Converting leads into website development projects

## Overview

The tool helps web developers and designers prospect for new clients by identifying businesses that could benefit from professional website services.

## Docker Setup

Start the PostgreSQL development database using Docker Compose:

```bash
docker compose --env-file .env.local --project-name website-development-studio up --detach
```

## Database Commands

To apply schema changes to your database:

```bash
npx drizzle-kit push
```

This command will sync your database schema with the latest changes in your Drizzle schema files.
