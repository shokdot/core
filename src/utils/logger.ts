import { LOG_LEVEL, LOGSTASH_HOST, LOGSTASH_PORT } from './env.js';

const isProduction = process.env.NODE_ENV === 'production';

export const getLoggerConfig = (serviceName: string) => {
	let transport: any;

	if (isProduction) {
		transport = {
			target: 'pino-socket',
			options: {
				address: LOGSTASH_HOST,
				port: LOGSTASH_PORT,
				mode: 'tcp',
				timeout: 5000,
			},
		};
	} else {
		transport = {
			target: 'pino-pretty',
			options: { colorize: true },
		};
	}

	return {
		level: LOG_LEVEL,
		base: {
			service: serviceName,
			env: process.env.NODE_ENV
		},
		transport,
	};
};
