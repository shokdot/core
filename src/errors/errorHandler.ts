import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { AppError } from './AppError.js';
import { ValidationError } from '../types/errorHandler.js';
import { handleValidationError } from './validationError.handler.js';
import { handleAppError } from './appError.handler.js';
import { handleGenericError } from './genericError.handler.js';

export function setErrorHandler(app: FastifyInstance, serviceName: string): void {
	app.setErrorHandler((error: unknown, request: FastifyRequest, reply: FastifyReply) => {
		const valError = error as ValidationError;

		if (valError.validation) {
			return handleValidationError(valError, reply);
		}

		if (error instanceof AppError) {
			return handleAppError(error, request, reply, serviceName);
		}

		return handleGenericError(error, request, reply, serviceName);
	});
}
