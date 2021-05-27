import 'reflect-metadata';

import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { errors } from 'celebrate';

import rateLimiter from './middlewares/rateLimiter';

import routes from './routes';

import '../typeorm';

import '@shared/container';

import uploadConfig from '../../../config/upload';

import AppError from '../../errors/AppError';

const app = express();
const port = 3333;

app.use(rateLimiter);
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use(errors());

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                status: 'error',
                message: err.message,
            });
        }

        return response.status(500).json({
            status: 'error',
            message: 'Internal server error.',
        });
    },
);

app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`);
});
