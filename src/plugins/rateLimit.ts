import { FastifyInstance } from 'fastify';
import rateLimit from '@fastify/rate-limit';

export async function registerRateLimit(app: FastifyInstance) {
    await app.register(rateLimit, {
        max: 100,
        timeWindow: '1 minute',
        keyGenerator: (req) => req.ip || 'unknown',
        errorResponseBuilder: (req, context) => {
            return {
                code: 'TOO_MANY_REQUESTS',
                message: `Rate limit exceeded. Try again in ${context.after}.`
            };
        },
    });
}