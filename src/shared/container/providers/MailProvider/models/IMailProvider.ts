export default interface IMailProvider {
    sendMail(to: string, message: string): Promise<void>;
}
