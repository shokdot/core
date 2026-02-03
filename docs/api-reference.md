# Core — API Reference

Public exports from `@core/index.js` (or equivalent alias). Used by backend services only; not for frontend.

---

## Server setup

### `buildApp(serviceName: string)`

Returns a Fastify instance with plugins: CORS, cookies, rate limit, helmet, swagger, metrics. Use before registering routes and calling `startServer`.

### `startServer(app, registerRoutes, host, port, serviceName)`

Starts the server: runs `registerRoutes(app)`, then listens on `host:port`. Handles shutdown and logging.

---

## Environment

### `API_PREFIX`

Default API prefix string (e.g. `/api/v1`). Services use it to mount routes: `${API_PREFIX}/auth`, `${API_PREFIX}/rooms`, etc.

---

## Error handling

### `sendError(reply, codeOrError, errorCode?, message?, details?)`

Sends a JSON error response. `codeOrError` is either an `AppError` instance or an HTTP status code; if status code, pass `errorCode` and `message` (and optional `details`). Response shape: `{ status: 'error', error: { code, message, details } }`.

### `AppError`

Class for application errors. Constructor accepts an error code (key of `ERROR_CODES`). Instances have `code`, `statusCode`, `message`, and optional `details`.

### `ERROR_CODES`

Record of error code → `{ statusCode, message }`. Used by `AppError` and `sendError` to set HTTP status and message. Examples: `ACCESS_TOKEN_MISSING`, `INVALID_ACCESS_TOKEN`, `USER_NOT_FOUND`, `VALIDATION_FAILED`, etc.

---

## JWT

### `signJwt(payload, type)`

Signs a JWT. `payload` is an object (e.g. `{ sub: userId, tokenId }`). `type` is `JwtType.ACCESS`, `JwtType.REFRESH`, or `JwtType.TWO_FA`. Returns token string.

### `verifyJwt(token, type)`

Verifies and decodes a JWT. `type` must match. Returns decoded payload or throws.

### `JwtType`

Enum/object: `ACCESS`, `REFRESH`, `TWO_FA`.

---

## Types

### `AuthRequest`

Fastify request type extended with `userId` and `accessToken` (set by `authenticate` middleware).

---

## Middlewares

### `authenticate`

Pre-handler that reads `Authorization: Bearer <token>`, verifies the token, and sets `request.userId` and `request.accessToken`. On failure, sends 401/403 via `sendError`. Use on routes that require a logged-in user.

### `serviceAuth`

Pre-handler that reads service token (e.g. `x-service-token` header), verifies it, and continues. On failure, sends 401/403. Use on internal routes called by other services.

---

## WebSocket auth

### `authenticateWs(authHeader, ws)`

Parses `Authorization: Bearer <token>`, verifies the token, and returns `{ userId }`. On failure, throws an error with `code` (e.g. `ACCESS_TOKEN_MISSING`, `INVALID_ACCESS_TOKEN`). Use in WebSocket upgrade handler before accepting the connection.

### `wsAuthError(code, ws)`

Sends an error message on the WebSocket (format is service-specific) and optionally closes the connection. Use after catching an error from `authenticateWs`.

---

## Utilities

### `checkBlocked(userId, targetUserId)`

Calls user-service (or internal logic) to determine if one user has blocked the other. Returns a boolean or promise. Used by chat-service and others to enforce block rules.

---

## Schemas

### `errorResponseSchema`

OpenAPI/Fastify schema for error responses: `{ status: 'error', error: { code, message, details } }`. Use in route response schemas for error status codes.

---

## Routes

### `healthRoutes`

Fastify route plugin that registers a health check endpoint (e.g. `GET /health` or under the service prefix). Used by each service to expose a liveness/readiness endpoint.

---

## Summary table

| Export           | Purpose                          |
|------------------|-----------------------------------|
| `buildApp`       | Create Fastify app with plugins   |
| `startServer`    | Register routes and listen        |
| `API_PREFIX`     | Default API prefix                |
| `sendError`      | Send JSON error response         |
| `AppError`       | Application error class          |
| `ERROR_CODES`    | Error code → status + message    |
| `signJwt`        | Sign JWT                         |
| `verifyJwt`      | Verify and decode JWT            |
| `JwtType`        | ACCESS, REFRESH, TWO_FA          |
| `AuthRequest`    | Request type with userId/accessToken |
| `authenticate`   | Bearer HTTP middleware           |
| `serviceAuth`    | Service token middleware         |
| `authenticateWs` | WebSocket Bearer auth            |
| `wsAuthError`    | Send error on WebSocket           |
| `checkBlocked`   | Check if user blocked target     |
| `errorResponseSchema` | Error response schema      |
| `healthRoutes`   | Health check route               |
