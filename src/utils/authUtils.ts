import extractToken from './extractToken.js';
import decodeToken from './decodeToken.js';

export const parseAuthToken = (authHeader?: string) => {
    const token = extractToken(authHeader);
    const userId = decodeToken(token);
    return { userId, token };
};
