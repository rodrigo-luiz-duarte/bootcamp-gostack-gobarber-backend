import IMailProvider from '../models/IMailProvider';

interface IMailMessage {
    to: string;
    message: string;
}

export default class FakeMailProvider implements IMailProvider {
    private sentMessages: IMailMessage[] = [];

    public async sendMail(to: string, message: string): Promise<void> {
        this.sentMessages.push({ to, message });
    }
}
