#!/bin/bash
# =============================================================================
# SCRIPT DE DEPLOY — Execute sempre que quiser atualizar a aplicação
# Uso: bash deploy.sh
# =============================================================================

set -e

APP_DIR="/var/www/consulta-placa-veiculos"
APP_NAME="consulta-placa-veiculos"

echo "=== [$(date '+%Y-%m-%d %H:%M:%S')] Iniciando deploy ==="

# Carregar NVM
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
nvm use 20

cd "$APP_DIR"

echo "=== Baixando atualizações do repositório ==="
git pull origin master

echo "=== Instalando dependências ==="
pnpm install --frozen-lockfile

echo "=== Executando build ==="
pnpm build

# ATENCAO: nao use "drizzle-kit migrate" neste projeto.
# A pasta drizzle/ esta dessincronizada (o historico sempre usou db:push) e
# o .gitignore ignora *.sql, entao as migrations geradas nem chegam aqui.
# Alteracoes de schema sao aplicadas ANTES do deploy, por script explicito:
#   node scripts/aplicar-salvaguardas-senatran.mjs
echo "=== Migrations: aplicadas manualmente antes do deploy (ver README do script) ==="

echo "=== Reiniciando aplicação ==="
pm2 reload "$APP_NAME" --update-env

echo ""
echo "=== Deploy concluído! Status da aplicação: ==="
pm2 status "$APP_NAME"
