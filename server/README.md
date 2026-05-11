# Invoice App Server

Backend API for managing invoices.

## Prerequisites

- Node.js >= 18
- npm >= 10

## Tech Stack

- Node.js + Express + TypeScript
- Zod validation
- File-based persistence
- Vitest + Supertest for testing

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Server runs on `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Run compiled production server
- `npm run test` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## API Endpoints

| Method   | Endpoint                | Description          |
| -------- | ----------------------- | -------------------- |
| `GET`    | `/api/invoices`         | Get all invoices     |
| `POST`   | `/api/invoices`         | Create new invoice   |
| `GET`    | `/api/invoices/:id`     | Get invoice by ID    |
| `PATCH`  | `/api/invoices/:id`     | Update invoice       |
| `PATCH`  | `/api/invoices/:id/pay` | Mark invoice as paid |
| `DELETE` | `/api/invoices/:id`     | Delete invoice       |

## Running tests

Project has comprehensive tests for API endpoints with error handling

To run the tests

```bash
npm run test
```

To see test coverage

```bash
npm run test:coverage
```

## Client Connection

The server is consumed by the frontend client. See the [client README](../client/README.md) for setup instructions.
