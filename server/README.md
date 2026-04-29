# Invoice App Server

## Project overview
This server folder contains the backend implementation with API endpoints for Invoice App

## Tech stack
- Node.js + Express + TypeScript
- Zod validation
- File-based persistence
- Vitest + Supertest for testing

## Getting started

### 1. Install dependencies
```
npm install
```

### 2. Run dev server

```
npm run dev
```

Server runs on `http://localhost:3000`

## API endpoints
```
GET /api/invoices             - Get all invoices

POST /api/invoices            - Create new invoice

GET /api/invoices/:id         - Get invoice by ID

PATCH /api/invoices/:id       - Update invoice

PATCH /api/invoices/:id/pay   - Mark invoice as paid

DELETE /api/invoices/:id      - Delete invoice
```

## Running tests

Project has comprehensive tests for API endpoints with error handling

To run the tests
```
npm run test
```

To see test coverage
```
npm run test:coverage
```
