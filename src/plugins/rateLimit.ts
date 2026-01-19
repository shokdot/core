import { FastifyInstance } from 'fastify';
import rateLimit from '@fastify/rate-limit';

export async function registerRateLimit(app: FastifyInstance) {
    await app.register(rateLimit, {
        max: 100,
        timeWindow: '1 minute',
        keyGenerator: (req) => req.ip || 'unknown',
        errorResponseBuilder: (req, context) => {
            const error: any = new Error(`Rate limit exceeded. Try again in ${context.after}.`);
            error.statusCode = 429;
            error.code = 'TOO_MANY_REQUESTS';
            return error;
        },
    });
}
