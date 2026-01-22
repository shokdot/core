import { FastifyInstance } from "fastify";

export const shutdown = async (app: FastifyInstance) => {
    try {
        await app.close();
        app.log.info({ event: 'shutdown', message: 'Server closed gracefully' });
        process.exit(0);
    } catch (err) {
        app.log.error({ event: 'shutdownError', message: (err as Error).message });
        process.exit(1);
    }
};

