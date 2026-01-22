import { ERROR_CODES } from './errorCodes.js';

export class AppError extends Error {
	code: string;
	statusCode: number;
	details?: object;

	constructor(code: string, statusCode?: number, message?: string, details?: object) {
		const errorConfig = ERROR_CODES[code];
		const finalStatusCode = statusCode ?? errorConfig?.statusCode ?? 500;
		const finalMessage = message ?? errorConfig?.message ?? code;

		super(finalMessage);
		this.code = code;
		this.statusCode = finalStatusCode;
		this.details = details;
		this.name = 'AppError';
	}
}
