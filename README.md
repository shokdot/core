# Core

Shared library for ft_transcendence backend services. Provides Fastify app setup, authentication (HTTP and WebSocket), error handling, JWT utilities, health routes, and common schemas. Used by auth-service, room-service, chat-service, game-service, stats-service, notification-service, and user-service.

## Features

- **App**: `buildApp`, `startServer` — Fastify instance with CORS, cookies, rate limit, helmet, swagger, metrics
- **Auth**: `authenticate` (Bearer HTTP), `authenticateWs` (WebSocket), `serviceAuth` (x-service-token)
- **Errors**: `sendError`, `AppError`, `ERROR_CODES`, error response schema
- **JWT**: `signJwt`, `verifyJwt`, `JwtType` (ACCESS, REFRESH, TWO_FA)
- **Routes**: `healthRoutes` (health check)
- **Utils**: `checkBlocked` (user-service integration for chat/block checks)
- **Config**: `API_PREFIX` (default `/api/v1`), env validation (COOKIE_SECRET, JWT_*, SERVICE_TOKEN, etc.)

## Tech Stack

- **Framework**: Fastify 5
- **Auth**: jsonwebtoken, cookie signing
- **Validation**: Zod (env)

## Usage

Core is a **dependency** of other services, not run standalone. Each service imports from `@core/index.js` (or equivalent alias).

### Build

```bash
npm install
npm run build
```

Build output is used by services that depend on core (monorepo build order: core first, then services).

## Environment (when used by a service)

Services that use core typically need (from core env or their own):

- `COOKIE_SECRET` — Cookie signing
- `API_PREFIX` — Optional; default `/api/v1`
- `JWT_SECRET`, `JWT_REFRESH_SECRET`, `JWT_TWO_FA` — JWT signing/verification
- `SERVICE_TOKEN` — Service-to-service auth
- `USER_SERVICE_URL` — If using checkBlocked or user lookup
- `CORS_ALLOWED_ORIGINS` — CORS (default `*`)
- `LOG_LEVEL`, `LOGSTASH_*` — Logging

## Documentation

- **[API Reference](docs/api-reference.md)** — Exports: buildApp, startServer, auth, errors, JWT, routes, schemas.
- **[Usage for service developers](docs/usage-for-services.md)** — How to use core in a new or existing service.

## Project Structure

```
src/
├── auth/          # JWT, extractToken, authenticateWs, wsAuthError
├── errors/        # AppError, errorCodes, sendError, handlers
├── middlewares/   # authenticate, serviceAuth
├── plugins/      # cors, cookies, rateLimit, security, swagger, metrics
├── routes/        # health.routes
├── schemas/       # error.schema
├── types/         # AuthRequest, jwtType, etc.
├── utils/         # env, logger, shutdown, checkBlocked
├── server.ts      # buildApp, startServer
└── index.ts       # Public exports
```

## License

Part of ft_transcendence project.
