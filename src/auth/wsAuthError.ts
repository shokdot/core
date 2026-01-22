import WebSocket from "ws";

const wsAuthError = (code: string, ws: WebSocket) => {
	switch (code) {
		case 'ACCESS_TOKEN_MISSING':
			ws.close(1008, 'ACCESS_TOKEN_MISSING');
			break;
		case 'INVALID_ACCESS_TOKEN':
			ws.close(1008, 'INVALID_ACCESS_TOKEN');
			break;
	}
};

export default wsAuthError;
