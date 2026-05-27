# Hotel de João — Sistema de Reservas

A hotel reservation system with public booking, guest login dashboard, and admin management.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port assigned by workflow)
- `pnpm --filter @workspace/hotel-dedejoao run dev` — run the frontend (port assigned by workflow)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string (auto-provisioned)
- Optional env: `JWT_SECRET` — JWT signing secret (defaults to `hotel_secreto123`)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS v4 + Wouter routing
- API: Express 5 (artifact: `api-server`)
- DB: PostgreSQL + Drizzle ORM
- Auth: JWT (bcrypt password hashing)
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/hotel-dedejoao/src/` — frontend React app
  - `pages/` — Home, Login, Reserva, Dashboard, Gerenciar
  - `components/` — Navbar, Footer, Hero, Features, RoomCard
  - `lib/rooms.ts` — static room data
- `artifacts/api-server/src/routes/` — Express routes (health, auth, hospedes)
- `lib/api-spec/openapi.yaml` — OpenAPI contract (source of truth)
- `lib/db/src/schema/hospedes.ts` — Drizzle schema for hospedes table

## Architecture decisions

- JWT tokens stored in localStorage (no HttpOnly cookie) — follows the original app pattern
- Room data is static in `lib/rooms.ts` — not stored in DB, consistent with original
- Guests authenticate with CPF + senha; JWT expires in 1 day
- All API routes under `/api/` prefix; frontend served at `/`

## Product

- Public homepage with hero, features, room listing, and testimonials
- Room reservation form (creates a guest account with password)
- Guest login (CPF + password) → personal dashboard showing their room
- Dashboard management view listing all reservations with delete capability

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Run `pnpm --filter @workspace/api-spec run codegen` after any OpenAPI spec changes
- DB schema changes: edit `lib/db/src/schema/`, then run `pnpm --filter @workspace/db run push`
- `JWT_SECRET` should be set as a secret in production

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
