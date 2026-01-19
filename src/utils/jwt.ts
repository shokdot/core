import jwt from "jsonwebtoken";
import JwtType from "../types/jwtType.js";
import { JwtPayload } from "../types/jwtPayload.js";
import { AppError } from "./AppError.js";
import { JWT_REFRESH_SECRET, JWT_SECRET, JWT_TWO_FA } from "../env.js";

export const signJwt = (payload: object, type: JwtType): string => {
	let expiresIn: jwt.SignOptions['expiresIn'];
	let secret: jwt.Secret;

	switch (type) {
		case JwtType.ACCESS:
			expiresIn = '15m';
			secret = JWT_SECRET;
			break;
		case JwtType.REFRESH:
			expiresIn = '7d';
			secret = JWT_REFRESH_SECRET;
			break;
		case JwtType.TWO_FA:
			expiresIn = '5m';
			secret = JWT_TWO_FA;
			break;
	}

	return jwt.sign(payload, secret, { expiresIn });
};


export function verifyJwt(token: string, type: JwtType): JwtPayload {
	try {
		let secret: jwt.Secret;

		switch (type) {
			case JwtType.ACCESS:
				secret = JWT_SECRET;
				break;
			case JwtType.REFRESH:
				secret = JWT_REFRESH_SECRET;
				break;
			case JwtType.TWO_FA:
				secret = JWT_TWO_FA;
				break;
		}

		return jwt.verify(token, secret) as JwtPayload;
	} catch (err) {
		switch (type) {
			case JwtType.ACCESS:
				throw new AppError('INVALID_ACCESS_TOKEN');
			case JwtType.REFRESH:
				throw new AppError('INVALID_REFRESH_TOKEN');
			case JwtType.TWO_FA:
				throw new AppError('INVALID_TWO_FA_TOKEN');
			default:
				throw new AppError('INTERNAL_SERVER_ERROR');
		}
	}
}
