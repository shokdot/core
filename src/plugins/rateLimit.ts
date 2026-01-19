import { FastifyInstance } from 'fastify';
// import rateLimit from '@fastify/rate-limit';

/**
 * Register rate limiting plugin
 * Currently commented out - enable when ready to implement
 * 
 * @param app - FastifyInstance
 * @returns Promise<void>
 */
export async function registerRateLimit(app: FastifyInstance) {
    // await app.register(rateLimit, {
    // 	max: 5,
    // 	timeWindow: '1 minute',
    // 	keyGenerator: (req) => req.ip,
    // 	errorResponseBuilder: () => ({
    // 		status: 'error',
    // 		error: 'TOO_MANY_REQUESTS',
    // 		message: 'Too many login attempts. Please try again later.',
    // 	}),
    // });
}
