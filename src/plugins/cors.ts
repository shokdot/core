import { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import { CORS_ALLOWED_ORIGINS } from '../env';

export async function registerCors(app: FastifyInstance) {
    const origin = CORS_ALLOWED_ORIGINS === '*' ? '*' : CORS_ALLOWED_ORIGINS.split(',').map(o => o.trim());

    await app.register(cors, {
        origin,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        exposedHeaders: ['Content-Length'],
        maxAge: 86400,
        optionsSuccessStatus: 200,
        strictPreflight: true
    });
}
