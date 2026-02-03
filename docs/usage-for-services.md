# Usage for service developers

How to use **core** in a backend service (e.g. auth-service, room-service, user-service). Core is not used by the frontend.

---

## 1. Dependencies

Add `core` as a dependency (workspace or package reference). Ensure `core` is built before the service (`npm run build` in core, then build the service).

---

## 2. Bootstrap the server

```ts
import { buildApp, startServer, API_PREFIX, healthRoutes } from '@core/index.js';
import myRoutes from './routes/index.js';

const app = buildApp('MY_SERVICE');

async function registerRoutes(app) {
  await app.register(healthRoutes, { prefix: `${API_PREFIX}/myservice` });
  await app.register(myRoutes, { prefix: `${API_PREFIX}/myservice` });
}

startServer(app, registerRoutes, HOST, PORT, 'MY_SERVICE');
```

- `buildApp(serviceName)` — Creates Fastify app with CORS, cookies, rate limit, helmet, swagger, metrics.
- `startServer(app, registerRoutes, host, port, serviceName)` — Runs `registerRoutes(app)` then listens.
- Mount health and app routes under `${API_PREFIX}/myservice` (e.g. `/api/v1/myservice`).

---

## 3. Protect routes with Bearer auth

Use the `authenticate` middleware so only logged-in users can access the route.

```ts
import { authenticate, errorResponseSchema } from '@core/index.js';

const mySchema = {
  preHandler: [authenticate],
  schema: {
    response: {
      200: { ... },
      401: errorResponseSchema,
      403: errorResponseSchema,
    },
  },
};

app.get('/me', mySchema, myHandler);
```

The handler can use `request.userId` and `request.accessToken` (typed as `AuthRequest`).

---

## 4. Protect internal routes with service token

Use `serviceAuth` for routes called by other services (e.g. internal APIs).

```ts
import { serviceAuth, errorResponseSchema } from '@core/index.js';

app.post('/internal/do-something', {
  preHandler: [serviceAuth],
  schema: { ... },
}, internalHandler);
```

Callers must send the shared `SERVICE_TOKEN` (e.g. in `x-service-token` header).

---

## 5. Sending errors

Use `sendError` and `AppError` for consistent error responses.

```ts
import { sendError, AppError } from '@core/index.js';

try {
  if (!user) throw new AppError('USER_NOT_FOUND');
  // ...
} catch (error) {
  if (error instanceof AppError) {
    return sendError(reply, error);
  }
  return sendError(reply, 500, 'INTERNAL_SERVER_ERROR', 'Internal server error');
}
```

Error response shape: `{ status: 'error', error: { code, message, details } }`. HTTP status comes from `ERROR_CODES[code].statusCode`.

---

## 6. WebSocket auth

In a WebSocket upgrade handler, authenticate the connection with the Bearer token from the request.

```ts
import { authenticateWs, AppError, wsAuthError } from '@core/index.js';

const wsHandler = async (ws, request) => {
  try {
    const { userId } = authenticateWs(request.headers['authorization'], ws);
    // ... use userId, register ws, etc.
  } catch (error) {
    if (error instanceof AppError) {
      wsAuthError(error.code, ws);
    }
    ws.close(...);
  }
};
```

If the client does not send `Authorization: Bearer <accessToken>`, or the token is invalid, `authenticateWs` throws; handle and close the connection or send an error frame.

---

## 7. JWT (custom use)

If you need to issue or verify JWTs (e.g. access, refresh, 2FA):

```ts
import { signJwt, verifyJwt, JwtType } from '@core/index.js';

const accessToken = signJwt({ sub: userId }, JwtType.ACCESS);
const decoded = verifyJwt(accessToken, JwtType.ACCESS); // { sub: userId }
```

Use the same secrets (JWT_SECRET, JWT_REFRESH_SECRET, JWT_TWO_FA) configured in the environment core expects.

---

## 8. Response schemas

Include `errorResponseSchema` for error status codes in route schemas so Swagger and validation are consistent.

```ts
import { errorResponseSchema } from '@core/index.js';

schema: {
  response: {
    200: { ... },
    400: errorResponseSchema,
    401: errorResponseSchema,
    404: errorResponseSchema,
  },
}
```

---

## 9. checkBlocked

If your service must enforce “blocked user” rules (e.g. chat), use `checkBlocked(userId, targetUserId)`. It typically calls user-service or an internal API. Example:

```ts
import { checkBlocked } from '@core/index.js';

const isBlocked = await checkBlocked(senderId, recipientId);
if (isBlocked) throw new AppError('USER_BLOCKED');
```

---

## 10. Environment

Core’s env validation (used when core is loaded) may require: `COOKIE_SECRET`, `JWT_SECRET`, `JWT_REFRESH_SECRET`, `JWT_TWO_FA`, `SERVICE_TOKEN`, `USER_SERVICE_URL` (if checkBlocked is used), `API_PREFIX`, `CORS_ALLOWED_ORIGINS`, `LOG_LEVEL`, etc. Ensure the service’s environment provides these when it runs.

---

## Quick reference

| Need              | Use from core                          |
|-------------------|----------------------------------------|
| Create app        | `buildApp`, `startServer`              |
| API prefix        | `API_PREFIX`                           |
| Health route      | `healthRoutes`                         |
| Bearer auth       | `authenticate`, `AuthRequest`          |
| Service auth      | `serviceAuth`                          |
| WS auth           | `authenticateWs`, `wsAuthError`        |
| Errors            | `sendError`, `AppError`, `ERROR_CODES` |
| JWT               | `signJwt`, `verifyJwt`, `JwtType`      |
| Error schema      | `errorResponseSchema`                 |
| Block check       | `checkBlocked`                         |

Frontend never imports core; it only talks to the HTTP/WebSocket APIs exposed by the services that use core.
