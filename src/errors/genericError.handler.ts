import { FastifyReply, FastifyRequest } from 'fastify';
import { createBaseLogEntry, logError, shouldLogError } from './errorLogger.js';
import sendError from './sendError.js';

export function handleGenericError(
	error: unknown,
	request: FastifyRequest,
	reply: FastifyReply,
	serviceName: string
): FastifyReply {
	const statusCode = (error as any).statusCode || (error as any).status || 500;
	const errorCode = (error as any).code || (statusCode === 429 ? 'TOO_MANY_REQUESTS' : 'INTERNAL_SERVER_ERROR');
	const errorMessage = (error as any).message || 'Something went wrong';

	if (shouldLogError(statusCode)) {
		const level = statusCode >= 500 ? 'error' : 'warn';
		const event = statusCode === 429 ? 'rateLimitError' : 'internalError';

		const logEntry = createBaseLogEntry(
			serviceName,
			request,
			level,
			event,
			errorMessage
		);
		logEntry.stack = error instanceof Error ? error.stack : undefined;
		logEntry.body = request.body;
		logEntry.headers = request.headers;

		logError(request, logEntry);
	}

	const errorDetails = (error as any).details ||
		(process.env.NODE_ENV !== 'production' && error instanceof Error
			? { stack: error.stack }
			: undefined);

	return sendError(reply, statusCode, errorCode, errorMessage, errorDetails);
}
