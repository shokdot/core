import { FastifyInstance } from 'fastify';
import fastifyCookie from '@fastify/cookie';

export async function registerCookies(app: FastifyInstance, cookieSecret: string) {
    await app.register(fastifyCookie, {
        secret: cookieSecret,
        parseOptions: {}
    });
}
