import Fastify, { FastifyInstance } from 'fastify';
import { getLoggerConfig } from './logger.js';
import { registerPlugins } from './plugins/index.js';
import { setErrorHandler } from './errorHandler.js';
import { shutdown } from './shutdown.js';

export function buildApp(serviceName: string) {
    const app = Fastify({
        logger: getLoggerConfig(serviceName),
        trustProxy: true,
        bodyLimit: 1048576,
    });
    setErrorHandler(app, serviceName);
    return app;
}

export async function startServer(
    app: FastifyInstance,
    registerRoutes: (app: FastifyInstance) => Promise<void>,
    host: string,
    port: number,
    serviceName: string
) {
    await registerPlugins(app, host, port, serviceName);
    await registerRoutes(app);

    await app.listen({ port, host });
    app.log.info({ event: 'serverStart', message: `Server running at http://${host}:${port}` });

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
    process.on('unhandledRejection', shutdown);
    process.on('uncaughtException', shutdown);
}
