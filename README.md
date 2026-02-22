# Core

> Part of the [ft_transcendence](https://github.com/shokdot/ft_transcendence) project.

Shared library used by all ft_transcendence backend services. Provides the Fastify app setup, authentication middleware (HTTP Bearer and WebSocket), error handling utilities, JWT signing/verification, health routes, and common schemas.

**Not a standalone service.** Each microservice imports from `@core/index.js`.

## Tech Stack

- **Framework**: Fastify 5
- **Auth**: jsonwebtoken, cookie signing
- **Validation**: Zod (env)

## Build

```bash
npm install
npm run build
```

Build output is consumed by all services. Build core first in monorepo order.

## Exports

| Export               | Description                                                       |
|----------------------|-------------------------------------------------------------------|
| `buildApp`           | Create a configured Fastify instance (CORS, cookies, rate limit, helmet, swagger, metrics) |
| `startServer`        | Start the Fastify server on `HOST:PORT`                          |
| `authenticate`       | Bearer token HTTP middleware                                      |
| `authenticateWs`     | Bearer token WebSocket authentication                             |
| `serviceAuth`        | `x-service-token` middleware for internal routes                  |
| `sendError`          | Standardised error response helper                               |
| `AppError`           | Custom error class                                                |
| `ERROR_CODES`        | Shared error code constants                                       |
| `signJwt`            | Sign a JWT (ACCESS, REFRESH, or TWO_FA)                          |
| `verifyJwt`          | Verify and decode a JWT                                           |
| `JwtType`            | Enum: `ACCESS`, `REFRESH`, `TWO_FA`                              |
| `healthRoutes`       | Registers `GET /health` on the Fastify instance                  |
| `checkBlocked`       | Calls user-service to check if two users have a block relationship |
| `API_PREFIX`         | Default API prefix (`/api/v1`)                                   |

## Environment (consumed by services via core)

| Variable              | Description                          |
|-----------------------|--------------------------------------|
| `COOKIE_SECRET`       | Cookie signing key                   |
| `API_PREFIX`          | API prefix (default `/api/v1`)       |
| `JWT_SECRET`          | Access token secret                  |
| `JWT_REFRESH_SECRET`  | Refresh token secret                 |
| `JWT_TWO_FA`          | 2FA token secret                     |
| `SERVICE_TOKEN`       | Service-to-service auth token        |
| `USER_SERVICE_URL`    | Used by `checkBlocked` utility       |
| `CORS_ALLOWED_ORIGINS`| Allowed CORS origins (default `*`)   |
| `LOG_LEVEL`           | Logging level                        |

## Health Endpoint

All services using core expose:

```
GET /health
```

Returns `200 OK` when the service is running.
