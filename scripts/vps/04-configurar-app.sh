#!/bin/bash
# =============================================================================
# FASE 4 — Configurar e subir a aplicação
# Execute como usuário 'deploy'
# ANTES: preencha as variáveis abaixo com seus dados reais
# =============================================================================

set -e

# ── Configurações — EDITE ANTES DE EXECUTAR ───────────────────────────────
APP_DIR="/var/www/consulta-placa-veiculos"
# Acesso por deploy key (chave SSH somente-leitura registrada no repositorio).
# Evita token embutido na URL, que fica legivel em .git/config e em backups.
REPO_URL="git@github.com:consultaplacabrasil-wq/consulta-placa-brasil.git"
DOMAIN="consultaplacabrasil.com"
# ──────────────────────────────────────────────────────────────────────────

echo "=== Criando diretório da aplicação ==="
sudo mkdir -p "$APP_DIR"
sudo chown deploy:deploy "$APP_DIR"

echo "=== Clonando repositório ==="
if [ -d "$APP_DIR/.git" ]; then
  echo "Repositório já existe. Fazendo pull..."
  cd "$APP_DIR" && git pull
else
  git clone "$REPO_URL" "$APP_DIR"
  cd "$APP_DIR"
fi

echo "=== Criando arquivo .env ==="
if [ ! -f "$APP_DIR/.env" ]; then
  cat > "$APP_DIR/.env" <<'ENV'
# ================================================================
# PREENCHA COM OS VALORES REAIS — copie do .env.local da máquina
# de desenvolvimento. NAO gere valores novos para os dois segredos
# marcados como CRITICO: trocá-los quebra dados já gravados.
# ================================================================

# ── Banco de dados (Neon, São Paulo — NAO e PostgreSQL local) ──
DATABASE_URL=

# ── Autenticacao ──
# CRITICO: o mesmo valor do servidor anterior. E a chave dos links
# de compartilhamento de relatorio e das sessoes. Valor novo invalida
# todos os links ja emitidos e derruba todas as sessoes.
AUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# ── Criptografia de dados pessoais ──
# CRITICO: o mesmo valor do servidor anterior. Os CPF/CNPJ dos clientes
# estao cifrados com esta chave. Valor novo torna todos ilegiveis,
# de forma irreversivel.
PII_ENCRYPTION_KEY=

# ── Consulta veicular ──
APIBRASIL_BEARER_TOKEN=
APIBRASIL_TIPO_GRATIS=agregados-simples
APIBRASIL_TIPO_GRATIS_FALLBACK=agregados-v2
INFOSIMPLES_TOKEN=

# ── Pagamentos (Asaas) ──
ASAAS_WEBHOOK_TOKEN=

# ── E-mail ──
RESEND_API_KEY=
EMAIL_FROM_VERIFIED=
ADMIN_EMAIL=

# ── Conteudo e midia ──
BLOB_READ_WRITE_TOKEN=
DEEPSEEK_API_KEY=
PEXELS_API_KEY=

# ── Rotinas agendadas ──
CRON_SECRET=

# ── Salvaguardas SENATRAN (opcionais; ha padroes no codigo) ──
# Limite de volume de consultas por usuario
CONSULTA_LIMITE_DIARIO=10
CONSULTA_LIMITE_MENSAL=30
# Politica de retencao, em dias
RETENCAO_RELATORIO_DIAS=30
RETENCAO_LINK_DIAS=7
RETENCAO_TRILHA_DIAS=1825

# ── Ambiente ──
NODE_ENV=production
ENV
  echo ""
  echo "  ATENÇÃO: Edite o arquivo .env antes de continuar!"
  echo "  Copie os valores do .env.local — em especial AUTH_SECRET e"
  echo "  PII_ENCRYPTION_KEY, que NAO podem ser gerados de novo."
  echo "  nano $APP_DIR/.env"
  echo ""
  read -p "  Pressione ENTER após preencher o .env para continuar..."
else
  echo ".env já existe, pulando criação."
fi

echo "=== Carregando NVM ==="
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
nvm use 20

echo "=== Instalando dependências (pnpm) ==="
cd "$APP_DIR"
pnpm install --frozen-lockfile

echo "=== Executando build da aplicação ==="
pnpm build

# ATENCAO: nao use "drizzle-kit migrate" neste projeto.
# A pasta drizzle/ esta dessincronizada (o historico sempre usou db:push) e
# o .gitignore ignora *.sql, entao as migrations geradas nem chegam aqui.
# O schema do banco Neon ja esta aplicado e independe deste servidor.
# Alteracoes de schema sao aplicadas por script explicito, antes do deploy:
#   node scripts/aplicar-salvaguardas-senatran.mjs
echo "=== Migrations: nao se aplicam aqui (banco Neon, gerenciado à parte) ==="

echo "=== Iniciando aplicação com PM2 ==="
cd "$APP_DIR"
pm2 start ecosystem.config.js --env production
pm2 save

echo ""
echo "=============================================="
echo "  FASE 4 CONCLUÍDA!"
echo "  Aplicação rodando na porta 3000."
echo "  Próximo: bash 05-configurar-nginx.sh"
echo "=============================================="
