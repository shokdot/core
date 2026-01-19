import sendError from "../utils/sendError.js";
import { SERVICE_TOKEN } from "../env.js";
import { ServiceAuthMiddleware } from "../types/authMiddleware.js";

const serviceAuth: ServiceAuthMiddleware = async (request, reply) => {
	const serviceToken = request.headers['x-service-token'] as string | undefined;
	if (!serviceToken) {
		return sendError(reply, 401, 'SERVICE_TOKEN_MISSING', 'Missing service token', { fields: 'x-service-token' });
	}

	if (serviceToken !== SERVICE_TOKEN) {
		return sendError(reply, 403, 'INVALID_SERVICE_TOKEN', 'Invalid service token', { fields: 'x-service-token' });
	}
};

export default serviceAuth;
