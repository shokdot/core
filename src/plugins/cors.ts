import { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';

export async function registerCors(app: FastifyInstance) {
    await app.register(cors, {
        origin: '*', // Adjust then
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        exposedHeaders: ['Content-Length'],
        maxAge: 86400,
        optionsSuccessStatus: 200,
        strictPreflight: true
    });
}
