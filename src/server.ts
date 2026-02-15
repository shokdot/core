import Fastify, { FastifyInstance } from 'fastify';
import { getLoggerConfig } from './utils/logger.js';
import { registerPlugins } from './plugins/index.js';
import { setErrorHandler } from './errors/errorHandler.js';
import { shutdown } from './utils/shutdown.js';

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

	process.on('SIGINT', () => {
		console.log('SIGINT received');
		shutdown(app, 'SIGINT');
	});
	process.on('SIGTERM', () => {
		console.log('SIGTERM received');
		shutdown(app, 'SIGTERM');
	});
	process.on('unhandledRejection', (reason: unknown) => {
		console.log(reason);
		shutdown(app, 'unhandledRejection', reason);
	});
	process.on('uncaughtException', (err: unknown) => {
		console.log(err);
		shutdown(app, 'uncaughtException', err);
	});
}
