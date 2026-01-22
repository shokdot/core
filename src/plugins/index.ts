import { FastifyInstance } from 'fastify';
import { COOKIE_SECRET } from '../utils/env.js';
import { registerSwagger } from './swagger.js';
import { registerSecurity } from './security.js';
import { registerCors } from './cors.js';
import { registerCookies } from './cookies.js';
import { registerMetrics } from './metrics.js';
import { registerRateLimit } from './rateLimit.js';

export async function registerPlugins(app: FastifyInstance, host: string, port: number, serviceName: string) {
	await registerSwagger(app, host, port, serviceName);
	await registerSecurity(app);
	await registerCors(app);
	await registerCookies(app, COOKIE_SECRET);
	await registerMetrics(app);
	await registerRateLimit(app);
}
