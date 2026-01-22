// Server setup
export { buildApp, startServer } from './server.js';

// Error handling
export { default as sendError } from './errors/sendError.js';
export { AppError } from './errors/AppError.js';
export { ERROR_CODES } from './errors/errorCodes.js';

// Environment variables
export { API_PREFIX } from './utils/env.js';

// JWT utilities
export { signJwt, verifyJwt } from './auth/jwt.js';
export { default as JwtType } from './types/jwtType.js';

// Types
export type { AuthRequest } from './types/authRequest.js';

// Middlewares
export { default as authenticate } from './middlewares/authenticate.middleware.js';
export { default as serviceAuth } from './middlewares/serviceAuth.middleware.js';

// WebSocket authentication
export { default as authenticateWs } from './auth/authenticate.ws.js';
export { default as wsAuthError } from './auth/wsAuthError.js';

// Utilities
export { default as checkBlocked } from './utils/checkBlocked.js';

// Schemas
export { errorResponseSchema } from './schemas/error.schema.js';

// Routes
export { default as healthRoutes } from './routes/health.routes.js';
