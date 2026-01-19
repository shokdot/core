import JwtType from '../types/jwtType.js';
import { verifyJwt } from './jwt.js';

const decodeToken = (token: string) => {
	const decoded = verifyJwt(token, JwtType.ACCESS);
	return decoded.sub;
};


export default decodeToken;
