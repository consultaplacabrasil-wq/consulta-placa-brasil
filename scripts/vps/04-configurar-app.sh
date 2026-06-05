#!/bin/bash
# =============================================================================
# FASE 4 — Configurar e subir a aplicação
# Execute como usuário 'deploy'
# ANTES: preencha as variáveis abaixo com seus dados reais
# =============================================================================

set -e

# ── Configurações — EDITE ANTES DE EXECUTAR ───────────────────────────────
APP_DIR="/var/www/consulta-placa-veiculos"
REPO_URL="https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git"  # <── altere
DOMAIN="consultaplacaveiculos.com.br"                           # <── altere
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
# PREENCHA TODAS AS VARIÁVEIS ABAIXO COM OS VALORES REAIS
# ================================================================

# Banco de dados (PostgreSQL local — use o DATABASE_URL do passo 3)
DATABASE_URL=postgresql://consultaplaca_user:SENHA@localhost:5432/consultaplaca

# Next.js
NEXTAUTH_SECRET=GERE_COM_openssl_rand_-base64_32
NEXTAUTH_URL=https://consultaplacaveiculos.com.br

# Asaas (pagamentos)
ASAAS_API_KEY=
ASAAS_ENVIRONMENT=production

# APIBrasil (consulta de veículos)
APIBRASIL_BEARER_TOKEN=

# Infosimples (alternativa de API)
INFOSIMPLES_TOKEN=

# OpenAI (IA para notícias)
OPENAI_API_KEY=

# Resend (e-mails)
RESEND_API_KEY=
RESEND_FROM_EMAIL=noreply@consultaplacaveiculos.com.br

# Vercel Blob (PDFs) — ou remova se usar armazenamento local
BLOB_READ_WRITE_TOKEN=

# Ambiente
NODE_ENV=production
ENV
  echo ""
  echo "  ATENÇÃO: Edite o arquivo .env antes de continuar!"
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

echo "=== Executando migrations do banco de dados ==="
pnpm drizzle-kit migrate

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
