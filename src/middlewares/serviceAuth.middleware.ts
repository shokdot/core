import { SERVICE_TOKEN } from "../utils/env.js";
import { ServiceAuthMiddleware } from "../types/authMiddleware.js";
import { AppError } from "../errors/AppError.js";

const serviceAuth: ServiceAuthMiddleware = async (request, reply) => {
	const serviceToken = request.headers['x-service-token'] as string | undefined;
	if (!serviceToken) {
		throw new AppError('SERVICE_TOKEN_MISSING');
	}

	if (serviceToken !== SERVICE_TOKEN) {
		throw new AppError('INVALID_SERVICE_TOKEN');
	}
};

export default serviceAuth;
