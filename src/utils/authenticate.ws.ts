import { WebSocket } from 'ws';
import { parseAuthToken } from './authUtils.js';
import wsAuthError from './wsAuthError.js';

const authenticateWs = (authHeader: string | undefined, ws: WebSocket) => {
	try {
		return parseAuthToken(authHeader);
	} catch (error: any) {
		wsAuthError(error.code, ws);
		throw error;
	}
};

export default authenticateWs;