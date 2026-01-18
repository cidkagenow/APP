# Oxford United Football Club Website

## Overview

This is a full-stack web application for Oxford United Football Club, featuring match schedules, news articles, team information, and an official merchandise store. The application uses a React frontend with a modern component library and an Express.js backend with PostgreSQL database storage.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight router)
- **State Management**: TanStack React Query for server state
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Animations**: Framer Motion for complex animations
- **Build Tool**: Vite with custom plugins for Replit integration

The frontend follows a component-based architecture with:
- Reusable UI components in `client/src/components/ui/`
- Feature components in `client/src/components/`
- Page components in `client/src/pages/`
- Custom hooks for data fetching in `client/src/hooks/`

### Backend Architecture

- **Framework**: Express.js 5 with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL
- **API Design**: RESTful endpoints under `/api/`
- **Schema Validation**: Zod for runtime validation with drizzle-zod integration

The backend uses a storage abstraction pattern:
- `server/storage.ts` defines an `IStorage` interface
- `DatabaseStorage` class implements database operations
- Routes in `server/routes.ts` use the storage layer

### Data Storage

- **Database**: PostgreSQL (configured via `DATABASE_URL` environment variable)
- **Schema Location**: `shared/schema.ts` contains Drizzle table definitions
- **Migrations**: Managed via `drizzle-kit push` command
- **Current Tables**: `matches` and `news`

### Shared Code

The `shared/` directory contains code used by both frontend and backend:
- `schema.ts`: Database table definitions and TypeScript types
- `routes.ts`: API contract definitions with Zod schemas for type-safe API calls

### Build Process

- Development: `npm run dev` runs the Express server with Vite middleware for HMR
- Production: `npm run build` bundles the client with Vite and server with esbuild
- Database: `npm run db:push` pushes schema changes to PostgreSQL

## External Dependencies

### Database
- **PostgreSQL**: Primary data store, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries and schema management

### UI Libraries
- **Radix UI**: Accessible component primitives (dialogs, dropdowns, tabs, etc.)
- **shadcn/ui**: Pre-styled component collection using Radix primitives
- **Lucide React**: Icon library

### Key NPM Packages
- `@tanstack/react-query`: Server state management and caching
- `framer-motion`: Animation library for hero sections and scroll effects
- `date-fns`: Date formatting utilities
- `wouter`: Lightweight React router
- `zod`: Schema validation for API contracts

### Replit-Specific Plugins
- `@replit/vite-plugin-runtime-error-modal`: Error overlay for development
- `@replit/vite-plugin-cartographer`: Development tooling
- `@replit/vite-plugin-dev-banner`: Development banner