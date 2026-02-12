import { FastifyInstance } from "fastify";

export const shutdown = async (app: FastifyInstance, reason: string, error?: unknown) => {
    try {
        if (error) {
            app.log.error({ event: 'shutdown', reason, error: error instanceof Error ? error.message : String(error), stack: error instanceof Error ? error.stack : undefined });
        }
        await app.close();
        app.log.info({ event: 'shutdown', reason, message: 'Server closed gracefully' });
        process.exit(error ? 1 : 0);
    } catch (err) {
        app.log.error({ event: 'shutdownError', reason, message: (err as Error).message });
        process.exit(1);
    }
};

