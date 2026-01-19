import { FastifyInstance } from 'fastify';
import fastifyMetrics from 'fastify-metrics';

export async function registerMetrics(app: FastifyInstance) {
    await app.register(fastifyMetrics, {
        endpoint: '/metrics',
        defaultMetrics: {
            enabled: true,
        },
    });
}
