# Invoice App Client

Frontend application for managing invoices

## Prerequisites

- Node.js >= 18
- npm >= 10

## Tech Stack

- React 19 + TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- shadcn/ui (Radix UI primitives)
- Axios for HTTP requests
- Tanstack React Query for data fetching and state management
- Vitest + React Testing Library for testing

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env` file in the client directory:

```bash
VITE_API_URL=http://localhost:3000
```

### 3. Start Development Server

```bash
npm run dev
```

Client runs on `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Project Structure

```
client/
├── src/
│   ├── api/              # API client and methods
│   │   ├── client.ts     # Axios instance
│   │   └── invoices.ts   # Invoice API methods
│   ├── components/
│   │   ├── common/       # Shared components (layouts, etc)
│   │   ├── invoices/     # Invoice-specific components
│   │   └── ui/           # shadcn/ui primitives
│   ├── hooks/            # React Query hooks
│   ├── lib/              # Utility functions
│   ├── pages/            # Page components
│   └── main.tsx          # Application entry point
├── public/               # Static assets
└── shared/               # Shared types with server
```

## Development Notes

- **Path aliases**: `@/` maps to `src/`, `@shared/` maps to `../shared/`
- **Shared types**: TypeScript types are shared with the server via `shared/types/`
- **React Query DevTools**: Available in development mode for debugging queries
- **Code quality**: ESLint and Prettier configured for consistent code style

## Server Connection

The client connects to the backend server running on `http://localhost:3000`. See the [server README](../server/README.md) for API endpoint documentation.
