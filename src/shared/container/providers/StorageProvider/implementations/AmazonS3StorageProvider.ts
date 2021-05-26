import fs from 'fs';
import path from 'path';
import mime from 'mime';

import uploadConfig from '@config/upload';

import aws, { S3 } from 'aws-sdk';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '../models/IStorageProvider';

export default class AmazonS3StorageProvider implements IStorageProvider {
    private client: S3;

    constructor() {
        this.client = new aws.S3({
            region: 'us-east-1',
        });
    }

    public async saveFile(file: string): Promise<string> {
        const originalPath = await path.resolve(uploadConfig.tmpFolder, file);

        const contentType = mime.lookup(originalPath);

        if (!contentType) {
            throw new AppError('Invalid content-type');
        }

        const fileContent = await fs.promises.readFile(originalPath);

        await this.client
            .putObject({
                Bucket: uploadConfig.config.aws.bucket,
                Key: file,
                ACL: 'public-read',
                Body: fileContent,
                ContentType: contentType,
                ContentDisposition: `inline; filename=${file}`,
            })
            .promise();

        await fs.promises.unlink(originalPath);

        return file;
    }

    public async deleteFile(file: string): Promise<void> {
        await this.client
            .deleteObject({
                Bucket: uploadConfig.config.aws.bucket,
                Key: file,
            })
            .promise();
    }
}
