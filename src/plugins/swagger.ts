import { FastifyInstance } from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';

export async function registerSwagger(app: FastifyInstance, host: string, port: number, serviceName: string) {
    if (process.env.NODE_ENV !== 'production') {
        await app.register(swagger, {
            openapi: {
                openapi: '3.0.0',
                info: {
                    title: `ft_transcendence - ${serviceName}`,
                    description: `${serviceName} documentation`,
                    version: '1.0.0',
                },
                servers: [
                    {
                        url: `http://${host}:${port}`,
                        description: 'Development server',
                    },
                ],
                components: {
                    securitySchemes: {
                        bearerAuth: {
                            type: 'http',
                            scheme: 'bearer',
                            bearerFormat: 'JWT',
                        },
                        serviceToken: {
                            type: 'apiKey',
                            in: 'header',
                            name: 'x-service-token',
                        },
                    },
                },
            },
        });
        await app.register(swaggerUI, {
            routePrefix: '/docs',
            uiConfig: { docExpansion: 'full', deepLinking: false },
        });
    }
}
