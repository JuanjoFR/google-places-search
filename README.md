# Google Places Search

A modern web application that provides an intuitive interface for searching and managing place data through the Google Places API.

## Overview

This application streamlines the process of searching and analyzing location data by offering a robust interface to interact with Google Places API. Built with modern web technologies and best practices, it provides a seamless experience for users who need to gather, visualize, and export place information.

## Workflow Demonstration

Watch how the application works:

[google-places-search.webm](https://github.com/user-attachments/assets/0466556b-dec2-4c65-b19a-5d11dcb07627)

This demonstration shows:

- Searching for places using the Google Places API
- Customizing the view by showing/hiding columns
- Exporting search results to CSV
- Responsive interface interactions

## Key Features

- **Advanced Place Search**: Leverage Google Places API to find detailed information about locations
- **Customizable Results View**: Show/hide columns to focus on relevant information
- **Data Export**: Download search results in CSV format
- **Responsive Design**: Fully responsive interface that works across all devices
- **Type-Safe**: End-to-end type safety from database to UI

## Technology Stack

### Frontend

- **Next.js 15**: Utilizing the latest server-side components for optimal performance
- **React**: With server components and React Cache for efficient data handling
- **Tailwind CSS**: For modern, responsive styling
- **shadcn/ui**: High-quality UI components
- **React Hook Form**: Form handling with validation
- **Zod**: Runtime type validation and schema declaration

### Backend & Database

- **PostgreSQL**: Robust, open-source database
- **Drizzle ORM**: Type-safe database toolkit
- **Docker**: Containerization for consistent development environments

## Getting Started

### Prerequisites

- Node.js 18 or higher
- Docker and Docker Compose
- Google Places API key

### Docker Setup

Start the PostgreSQL development database:

```bash
docker compose --env-file .env.local --project-name google-places-search up --detach
```

### Database Management

Apply schema changes to your database:

```bash
npx drizzle-kit push
```

## Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and fill in your credentials
4. Start the development database using Docker
5. Run the development server: `npm run dev`

## License

[MIT License](LICENSE)
