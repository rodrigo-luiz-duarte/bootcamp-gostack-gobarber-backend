import multer, { StorageEngine } from 'multer';
import path from 'path';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
    driver: 'disk' | 's3';

    tmpFolder: string;
    uploadsFolder: string;

    multer: {
        storage: StorageEngine;
    };

    config: {
        disk: {};

        aws: {
            bucket: string;
        };
    };
}

export default {
    driver: process.env.STORAGE_DRIVER,

    tmpFolder,
    uploadsFolder: path.resolve(tmpFolder, 'uploads'),

    multer: {
        storage: multer.diskStorage({
            destination: tmpFolder,
            filename(request, file, callback) {
                const filehash = crypto.randomBytes(10).toString('hex');
                const fileName = `${filehash}-${file.originalname}`;

                return callback(null, fileName);
            },
        }),
    },

    config: {
        disk: {},
        aws: {
            bucket: 'app-gobarber-2',
        },
    },
} as IUploadConfig;
