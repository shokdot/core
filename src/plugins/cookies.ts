import { FastifyInstance } from 'fastify';
import fastifyCookie from '@fastify/cookie';

export async function registerCookies(app: FastifyInstance, cookieSecret: string) {
    await app.register(fastifyCookie, {
        secret: cookieSecret,
        parseOptions: {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            sameSite: 'strict',
            signed: true,
            maxAge: 7 * 24 * 60 * 60,
            path: '/',
        }
    });
}
