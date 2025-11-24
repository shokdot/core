import { WebSocket } from 'ws';
import extractToken from './extractToken.js';
import decodeToken from './decodeToken.js';

const authenticateWs = (authHeader: string, ws: WebSocket) => {
	const token = extractToken(authHeader);
	const userId = decodeToken(token);

	return { userId, token };
};

export default authenticateWs;
