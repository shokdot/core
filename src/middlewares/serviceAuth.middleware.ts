import { FastifyRequest, FastifyReply } from "fastify";
import sendError from "../utils/sendError";


const serviceAuth = async (request: FastifyRequest, reply: FastifyReply) => {
	const serviceToken = request.headers['x-service-token'] as string | undefined;
	if (!serviceToken) {
		return sendError(reply, 401, 'SERVICE_TOKEN_MISSING', 'Missing service token', { fields: 'x-service-token' });
	}
	const expectedToken = process.env.SERVICE_TOKEN
	if (serviceToken !== expectedToken) {
		return sendError(reply, 403, 'INVALID_SERVICE_TOKEN', 'Invalid service token', { fields: 'x-service-token' });
	}
	return true;
}

export default serviceAuth;
