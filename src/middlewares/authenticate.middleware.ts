import { FastifyReply } from 'fastify';
import { AuthRequest } from '../types/authRequest.js';
import { parseAuthToken } from '../utils/authUtils.js';
import { AuthenticateMiddleware } from '../types/authMiddleware.js';
import sendError from '../utils/sendError.js';

const authenticate: AuthenticateMiddleware = async (request: AuthRequest, reply: FastifyReply) => {
	try {
		const { userId, token } = parseAuthToken(request.headers['authorization']);
		request.userId = userId;
		request.accessToken = token;

	} catch (error: any) {
		switch (error.code) {
			case 'ACCESS_TOKEN_MISSING':
				return sendError(reply, 401, error.code, 'Authorization token is missing');
			case 'INVALID_ACCESS_TOKEN':
				return sendError(reply, 403, error.code, 'Invalid or expired access token');
			default:
				return sendError(reply, 500, 'INTERNAL_SERVER_ERROR', 'Internal server error');
		}
	}
};

export default authenticate;
