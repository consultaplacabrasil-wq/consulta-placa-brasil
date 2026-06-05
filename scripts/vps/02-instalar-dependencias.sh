#!/bin/bash
# =============================================================================
# FASE 2 — Instalar dependências
# Execute como usuário 'deploy'
# =============================================================================

set -e

echo "=== Instalando Node.js 20 LTS via NVM ==="
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"

nvm install 20
nvm use 20
nvm alias default 20

echo "Node.js $(node -v) instalado."
echo "NPM $(npm -v) instalado."

echo "=== Instalando pnpm ==="
npm install -g pnpm
echo "pnpm $(pnpm -v) instalado."

echo "=== Instalando PM2 (gerenciador de processos) ==="
npm install -g pm2
pm2 startup systemd -u deploy --hp /home/deploy
echo "PM2 $(pm2 -v) instalado."

echo "=== Instalando Nginx ==="
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx
echo "Nginx instalado."

echo "=== Instalando PostgreSQL 16 ==="
sudo apt install -y postgresql-common
sudo sh /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh -y
sudo apt install -y postgresql-16
sudo systemctl enable postgresql
sudo systemctl start postgresql
echo "PostgreSQL $(psql --version) instalado."

echo "=== Instalando Certbot (SSL Let's Encrypt) ==="
sudo apt install -y certbot python3-certbot-nginx
echo "Certbot instalado."

echo ""
echo "=============================================="
echo "  FASE 2 CONCLUÍDA!"
echo "  IMPORTANTE: Feche e abra o terminal para"
echo "  carregar o NVM corretamente, depois execute:"
echo "  bash 03-configurar-postgresql.sh"
echo "=============================================="
