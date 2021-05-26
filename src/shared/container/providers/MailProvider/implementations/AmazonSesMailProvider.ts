import { inject, injectable } from 'tsyringe';
import nodemailer, { Transporter } from 'nodemailer';
import aws from 'aws-sdk';
import mailConfig from '@config/mail';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

@injectable()
export default class AmazonSesMailProvider implements IMailProvider {
    private transporter: Transporter;

    constructor(
        @inject('MailTemplateProvider')
        private mailTemplateProvider: IMailTemplateProvider,
    ) {
        this.transporter = nodemailer.createTransport({
            SES: new aws.SES({
                apiVersion: '2010-12-01',
                region: 'us-east-1',
            }),
        });
    }

    public async sendMail({
        to,
        from,
        subject,
        templateData,
    }: ISendMailDTO): Promise<void> {
        await this.transporter.sendMail({
            from: {
                name: from?.name || mailConfig.defaults.from.name,
                address: from?.email || mailConfig.defaults.from.email,
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject,
            html: await this.mailTemplateProvider.parse(templateData),
        });
    }
}
