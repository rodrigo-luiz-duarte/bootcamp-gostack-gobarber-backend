interface IMailConfig {
    driver: 'ethereal' | 'ses';
    defaults: {
        from: {
            email: string;
            name: string;
        };
    };
}

// Para utiiliza o Amazon SES é preciso enviar usando um e-mail válido cadastrado no SES.
export default {
    driver: process.env.MAIL_DRIVER || 'ethereal',
    defaults: {
        from: {
            email: 'rodrigo@teste.com.br',
            name: 'Rodrigo Luiz Duarte',
        },
    },
} as IMailConfig;
