import { FastifyInstance } from 'fastify';
import helmet from '@fastify/helmet';

export async function registerSecurity(app: FastifyInstance) {
    await app.register(helmet, {
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                imgSrc: ["'self'", "data:"],
                connectSrc: ["'self'"],
                fontSrc: ["'self'", "https:", "data:"],
                objectSrc: ["'none'"],
                upgradeInsecureRequests: [],
            },
        },
        crossOriginEmbedderPolicy: true,
        crossOriginOpenerPolicy: true,
        crossOriginResourcePolicy: { policy: 'same-origin' },
        referrerPolicy: { policy: 'no-referrer' },
        xssFilter: true,
        hidePoweredBy: true,
    });
}
