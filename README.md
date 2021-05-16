# Recuperação de senha

**RF**

-   O usuário deve poder recuperar sua senha informando seu e-mail.
-   O usuário deve receber um e-mail com instruções para recuperação de senha.
-   usuário deve por resetar sua senha.

**RNF**

-   Utilizar Mailtrap para testar envio de e-mail em ambiente de desenvolvimento.
-   Utilizar Amazon SES para envios em produção.
-   O envio de e-mails deve acontecer em segundo plano (background job).

**RN**

-   O link enviado por e-mail para resetar a senha, deve expirar em 2h.
-   O usuário precisa confirmar a nova senha ao resetar a senha.

# Atualização do perfil

**RF**

-   O usuário deve poder atualizar seu nome, e-mail e senha.

**RN**

-   O usuário não pode alterar seu e-mail para um e-mail já atualizado.
-   Para atualizar sua senha, o usuário deve informar sua senha atual.
-   Para atualizar sua senha, o usuário deve confirmar a nova senha.

# Painel do prestador

**RF**

-   O usuário deve poder listar seus agendamentos de um dia específico.
-   O prestador deve receber uma notificação sempre que houver um novo agendamento.
-   O prestador deve poder visualizar as notificações não lidas.

**RNF**

-   Os agendamentos de um prestador no dia, deve ser armazenado em cache.
-   As notificações do prestador devem ser armazenadas no MongoDB.
-   As notificações do prestador devem ser enviadas em real-time utilizando Socket.io.

**RN**

-   A notificação deve ter um status de lida ou não lida, para que o prestador possa controlar.

# Agendamento de serviços

**RF**

-   O usuário deve poder listar todos os prestadores de serviço cadastrados.
-   O usuário deve poder listar os dias de 1 mês com pelo menos 1 horário disponível de em prestador específico.
-   O usuário deve poder listar os horários disponíveis em 1 dia específico de um prestador.
-   O usuário deve poder realizar um novo agendamento com um prestador.

**RNF**

-   A listagem de prestadores deve ser armazenada em cache.

**RN**

-   Cada agendamento deve durar 1h exatamente.
-   Os agendamentos deve estar disponíveis entre 8h às 18h (primeiro horário às 8h e último às 17h).
-   O usuário não pode agendar num horário já ocupado.
-   O usuário não pode agendar num horário que já passou.
-   O usuário não pode agendar um horário consigo mesmo.
