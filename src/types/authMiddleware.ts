import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthRequest } from './authRequest.js';

export type AuthenticateMiddleware = (
    request: AuthRequest,
    reply: FastifyReply
) => Promise<void | FastifyReply>;

export type ServiceAuthMiddleware = (
    request: FastifyRequest,
    reply: FastifyReply
) => Promise<void | FastifyReply>;
