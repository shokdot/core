import { FastifyReply } from 'fastify';
import { AuthRequest } from '../types/authRequest.js';
import { parseAuthToken } from '../auth/authUtils.js';
import { AuthenticateMiddleware } from '../types/authMiddleware.js';
import sendError from '../errors/sendError.js';
import { AppError } from '../errors/AppError.js';

const authenticate: AuthenticateMiddleware = async (request: AuthRequest, reply: FastifyReply) => {
	try {
		const { userId, token } = parseAuthToken(request.headers['authorization']);
		request.userId = userId;
		request.accessToken = token;

	} catch (error: unknown) {
		if (error instanceof AppError) {
			return sendError(reply, error);
		}

		return sendError(reply, 500, 'INTERNAL_SERVER_ERROR', 'Internal server error');
	}
};

export default authenticate;
