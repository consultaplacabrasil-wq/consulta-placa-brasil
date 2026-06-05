# Melhorias do Sistema - Consulta Placa Brasil

## Painel Administrativo (Administrador do Site)

### 1. Integração completa com Resend para comunicação por e-mail

Implementar a plataforma Resend para centralizar e melhorar toda a comunicação por e-mail do sistema.

https://resend.com/
E-mail de acesso: consultaplacabrasil@gmail.com
Senha de acesso: C0nsu1t@plac#2026*

**Funcionalidades obrigatórias:**

* E-mail de boas-vindas após cadastro.
* Recuperação e redefinição de senha.
* Confirmação de cadastro.
* Notificações de compra aprovada.
* Notificações de alteração de senha.
* Newsletter para usuários cadastrados.
* Alertas administrativos importantes.
* Templates profissionais e responsivos para todos os e-mails.

**Objetivo:**
Melhorar a experiência do usuário, aumentar a confiabilidade das entregas de e-mail e profissionalizar a comunicação da plataforma.

---

### 2. Responsividade completa do painel administrativo

Realizar uma auditoria completa de responsividade em todas as páginas do painel administrativo.

**Verificar e corrigir:**

* Tabelas quebrando em telas pequenas.
* Botões desalinhados.
* Menus e navegação mobile.
* Formulários em smartphones e tablets.
* Modais e pop-ups.
* Espaçamentos e alinhamentos.
* Experiência geral em dispositivos móveis.

**Objetivo:**
Garantir usabilidade total em celulares, tablets e desktops.

---

### 3. Melhorias na página de Usuários (`/admin/usuarios`)

Adicionar filtros avançados para facilitar a gestão de usuários.

**Filtros desejados:**

* Buscar por nome.
* Buscar por e-mail.
* Buscar por CPF.
* Buscar por ID do usuário.
* Filtrar por tipo de usuário.
* Filtrar usuários ativos.
* Filtrar usuários inativos.
* Filtrar por período de cadastro.
* Ordenar por:

  * Mais recentes primeiro.
  * Mais antigos primeiro.
  * Nome (A-Z).
  * Nome (Z-A).

**Melhorias adicionais:**

* Paginação otimizada.
* Pesquisa em tempo real.
* Exportação para CSV/Excel (opcional).

---

### 4. Gerenciamento de usuários (`/admin/usuarios`)

Melhorar as ações disponíveis para cada usuário.

**Alterações necessárias:**

* Adicionar ação "Alterar Senha".
* Remover a ação "Excluir Usuário".
* Adicionar ação "Desativar Usuário".
* Adicionar ação "Reativar Usuário".

**Regras:**

* Usuários desativados não podem fazer login.
* Usuários desativados permanecem no banco de dados.
* Todas as alterações devem ser registradas em log administrativo.

**Objetivo:**
Evitar perda de dados por exclusão acidental e permitir bloqueio temporário de contas.

---

### 5. Melhorias na página de Consultas (`/admin/consultas`)

Reestruturar a visualização de consultas e compras realizadas pelos clientes.

**Adicionar:**

* Visualização completa do histórico de compras do cliente.
* Página de detalhes do cliente.
* Lista de todas as consultas compradas.

**Informações que devem ser exibidas:**

* Nome do cliente.
* E-mail.
* CPF.
* Data da compra.
* Horário da compra.
* Valor pago.
* Forma de pagamento.
* Status do pagamento.
* Tipo de consulta adquirida.
* Quantidade de compras realizadas.

**Histórico de compras:**
Caso o cliente tenha realizado múltiplas compras, exibir todas em uma timeline ou tabela organizada.

**Filtros desejados:**

* Data inicial e final.
* Tipo de consulta.
* Cliente.
* Status do pagamento.

---

### 6. Auditoria do sistema de cupons de desconto

Realizar uma revisão completa do módulo de cupons.

**Verificar:**

* Aplicação correta do desconto.
* Validação da data de expiração.
* Limite de utilização.
* Cupons de uso único.
* Cupons reutilizáveis.
* Compatibilidade com todos os produtos.
* Registro de utilização do cupom.

**Criar testes para validar:**

* Desconto percentual.
* Desconto fixo.
* Cupom expirado.
* Cupom inválido.
* Cupom já utilizado.
* Cupom com limite atingido.

**Objetivo:**
Garantir que o sistema de cupons funcione corretamente em todos os cenários.

---

### 7. Logs e auditoria administrativa

Implementar um sistema de logs para registrar ações críticas realizadas pelos administradores.

**Registrar:**

* Login de administradores.
* Alteração de senha de usuários.
* Desativação e reativação de usuários.
* Criação e edição de cupons.
* Alterações em configurações do sistema.
* Alterações em permissões de usuários.

**Informações registradas:**

* Administrador responsável.
* Data e horário.
* IP de origem.
* Ação executada.

---

### 8. Dashboard administrativo

Melhorar o dashboard principal com indicadores de negócio.

**Adicionar métricas:**

* Total de usuários cadastrados.
* Usuários ativos.
* Usuários inativos.
* Consultas vendidas hoje.
* Consultas vendidas no mês.
* Faturamento diário.
* Faturamento mensal.
* Cupons utilizados.
* Taxa de conversão.

**Exibir gráficos:**

* Vendas por período.
* Cadastros por período.
* Consultas mais vendidas.
* Receita por período.

---

### 9. Segurança

Realizar revisão geral de segurança do sistema.

**Verificar:**

* Controle de permissões.
* Rotas administrativas protegidas.
* Proteção contra acesso não autorizado.
* Rate limit em login.
* Proteção contra ataques de força bruta.
* Sanitização de entradas.
* Validação de formulários.

**Objetivo:**
Garantir a segurança dos dados dos clientes e da plataforma.
