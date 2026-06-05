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
git pull origin main

echo "=== Instalando dependências ==="
pnpm install --frozen-lockfile

echo "=== Executando build ==="
pnpm build

echo "=== Executando migrations ==="
pnpm drizzle-kit migrate

echo "=== Reiniciando aplicação ==="
pm2 reload "$APP_NAME" --update-env

echo ""
echo "=== Deploy concluído! Status da aplicação: ==="
pm2 status "$APP_NAME"
