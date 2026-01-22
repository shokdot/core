import { FastifyReply } from 'fastify';
import { ValidationError } from '../types/errorHandler.js';
import sendError from './sendError.js';

export function handleValidationError(
	error: ValidationError,
	reply: FastifyReply
): FastifyReply {
	const firstError = error.validation![0];
	const field =
		firstError.instancePath?.replace(/^\//, '') ||
		firstError.params?.missingProperty ||
		'unknown';
	const message = firstError.message ?? 'Invalid value';

	return sendError(
		reply,
		400,
		'VALIDATION_FAILED',
		`Request ${error.validationContext ?? 'body'} validation failed`,
		{ field, message }
	);
}
