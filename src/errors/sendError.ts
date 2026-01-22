import { FastifyReply } from 'fastify';
import { AppError } from './AppError.js';

const sendError = (
	reply: FastifyReply | any,
	codeOrError: number | AppError,
	errorCode?: string,
	message?: string,
	details?: object
) => {

	if (codeOrError instanceof AppError) {
		return reply.code(codeOrError.statusCode).send({
			status: 'error',
			error: {
				code: codeOrError.code,
				message: codeOrError.message,
				details: codeOrError.details ?? null
			}
		});
	}

	return reply.code(codeOrError).send({
		status: 'error',
		error: {
			code: errorCode!,
			message: message!,
			details: details ?? null
		}
	});
}

export default sendError;
