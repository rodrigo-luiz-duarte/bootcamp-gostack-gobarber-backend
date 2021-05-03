import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../../../../config/auth';

import AppError from '../../../errors/AppError';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT token is missing.', 401);
    }

    /**
     * Aqui o método split retorna um array e ao omitir
     * o nome da primeira variável dentro dos colchetes, significa que
     * não queremos obter o primeiro elemento do array. Apenas o segundo.
     */
    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub } = decoded as TokenPayload;

        console.log(decoded);

        /**
         * Arqui foi feita uma extensão da interface Request do Express
         * incluindo um atributo user. Essa extensão do Request está declarada no
         * arquivo src/@types/express.d.ts
         */
        request.user = {
            id: sub,
        };

        return next();
    } catch (error) {
        throw new AppError('Invalid JWT token.', 401);
    }
}
