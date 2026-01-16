import pino from 'pino';
import { LOG_LEVEL, LOGSTASH_HOST, LOGSTASH_PORT } from './env.js';

const isProduction = process.env.NODE_ENV === 'production';

export const getLoggerConfig = (serviceName: string): pino.LoggerOptions => {
    let transport: pino.LoggerOptions['transport'];

    if (isProduction) {
        transport = {
            target: 'pino-socket',
            options: {
                address: LOGSTASH_HOST,
                port: LOGSTASH_PORT,
                mode: 'tcp',
                serviceName,
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
        transport,
    };
};
