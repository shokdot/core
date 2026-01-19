import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import sendError from './utils/sendError.js';

interface ValidationError {
	validation?: Array<{
		instancePath?: string;
		message?: string;
		params?: { missingProperty?: string };
	}>;
	validationContext?: string;
}

export function setErrorHandler(app: FastifyInstance, serviceName: string) {
	app.setErrorHandler((error: unknown, request: FastifyRequest, reply: FastifyReply) => {
		const valError = error as ValidationError;
		const timestamp = new Date().toISOString();

		// Handle Validation Errors
		if (valError.validation) {
			const firstError = valError.validation[0];
			const field =
				firstError.instancePath?.replace(/^\//, '') ||
				firstError.params?.missingProperty ||
				'unknown';
			const message = firstError.message ?? 'Invalid value';

			const logEntry = {
				'@timestamp': timestamp,  // ELK convention
				level: 'warn',
				service: serviceName,
				event: 'validationError',
				message: `Validation failed on field ${field}`,
				field,
				context: valError.validationContext ?? null,
				route: request.routeOptions?.url,
				method: request.method,
				url: request.url,
				params: request.params,
			};

			request.log.warn(logEntry);

			return sendError(
				reply,
				400,
				'VALIDATION_FAILED',
				`Request ${valError.validationContext ?? 'body'} validation failed`,
				{ field, message }
			);
		}

		// Handle Rate Limit or other defined errors
		const statusCode = (error as any).statusCode || (error as any).status || 500;
		const errorCode = (error as any).code || (statusCode === 429 ? 'TOO_MANY_REQUESTS' : 'INTERNAL_SERVER_ERROR');
		const errorMessage = (error as any).message || 'Something went wrong';

		const logEntry = {
			'@timestamp': timestamp,
			level: statusCode >= 500 ? 'error' : 'warn',
			service: serviceName,
			event: statusCode === 429 ? 'rateLimitError' : 'internalError',
			message: errorMessage,
			stack: error instanceof Error ? error.stack : undefined,
			route: request.routeOptions?.url,
			method: request.method,
			url: request.url,
			params: request.params,
			body: request.body,
			headers: request.headers,
		};

		if (statusCode >= 500) {
			request.log.error(logEntry);
		} else {
			request.log.warn(logEntry);
		}

		const errorDetails = (error as any).details || (process.env.NODE_ENV !== 'production' && error instanceof Error ? { stack: error.stack } : undefined);

		return sendError(
			reply,
			statusCode,
			errorCode,
			errorMessage,
			errorDetails
		);
	});
}
