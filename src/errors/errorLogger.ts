import { FastifyRequest } from 'fastify';
import { LogEntry } from '../types/errorHandler.js';

export function createBaseLogEntry(
	serviceName: string,
	request: FastifyRequest,
	level: 'error' | 'warn',
	event: string,
	message: string
): LogEntry {
	return {
		'@timestamp': new Date().toISOString(),
		level,
		service: serviceName,
		event,
		message,
		route: request.routeOptions?.url,
		method: request.method,
		url: request.url,
		params: request.params,
	};
}

export function logError(request: FastifyRequest, logEntry: LogEntry): void {
	if (logEntry.level === 'error') {
		request.log.error(logEntry);
	} else {
		request.log.warn(logEntry);
	}
}

export function shouldLogError(statusCode: number): boolean {
	return statusCode === 429 || statusCode >= 500;
}
