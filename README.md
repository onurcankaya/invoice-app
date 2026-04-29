# Invoice App

Full-stack invoicing application with CRUD operations, built as monorepo.

## Tech Stack

**Frontend:**
- React + TypeScript
- Vite
- TanStack Query
- Tailwind CSS

**Backend:**
- Node.js + Express + TypeScript
- Zod validation
- File-based persistence
- Vitest + Supertest for testing

## Getting started

### Install all dependencies
```
npm run install:all
```

### Run both client and server in dev mode
```
npm run dev
```

- Server runs on `http://localhost:3000`
- Client runs on `http://localhost:5173`

## Project Structure
```
/client    - React frontend
/server    - Express API backend
/shared    - Shared TypeScript types
```

## Development

See individual README files:
- [Server README](./server/README.md)
- Client README (coming soon)

## Features

- ✅ Create, read, update, delete invoices
- ✅ Mark invoices as paid
- ✅ Save draft invoices
- ✅ Form validation
- ✅ API validation with Zod
- ✅ Comprehensive API tests
- ✅ Error handling
