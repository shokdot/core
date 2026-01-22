import { FastifyRequest } from 'fastify';

export interface ValidationError {
	validation?: Array<{
		instancePath?: string;
		message?: string;
		params?: { missingProperty?: string };
	}>;
	validationContext?: string;
}

export interface LogEntry {
	'@timestamp': string;
	level: 'error' | 'warn';
	service: string;
	event: string;
	message: string;
	code?: string;
	field?: string;
	context?: string | null;
	stack?: string;
	route?: string;
	method?: string;
	url?: string;
	params?: unknown;
	body?: unknown;
	headers?: unknown;
}

export interface ErrorHandlerContext {
	request: FastifyRequest;
	serviceName: string;
}
