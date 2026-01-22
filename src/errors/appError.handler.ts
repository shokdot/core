import { FastifyReply, FastifyRequest } from 'fastify';
import { AppError } from './AppError.js';
import { createBaseLogEntry, logError, shouldLogError } from './errorLogger.js';
import sendError from './sendError.js';

export function handleAppError(
	error: AppError,
	request: FastifyRequest,
	reply: FastifyReply,
	serviceName: string
): FastifyReply {

	if (shouldLogError(error.statusCode)) {
		const level = error.statusCode >= 500 ? 'error' : 'warn';
		const event = error.statusCode === 429 ? 'rateLimitError' : 'appError';

		const logEntry = createBaseLogEntry(
			serviceName,
			request,
			level,
			event,
			error.message
		);
		logEntry.code = error.code;
		logEntry.stack = error.stack;

		logError(request, logEntry);
	}

	return sendError(reply, error);
}
