#!/bin/bash
# =============================================================================
# FASE 6 — Agendar a eliminação diária de dados (LGPD / contrato SERPRO)
# Execute como usuário 'deploy'. Idempotente: pode rodar mais de uma vez.
#
# Instala no crontab do usuário 'deploy' uma execução diária às 03:30 de
# scripts/eliminacao-dados.mjs. O log fica em ~/logs/eliminacao-dados.log.
# Teste antes, sem alterar nada:
#   node scripts/eliminacao-dados.mjs --dry-run
# =============================================================================

set -e

APP_DIR="/var/www/consulta-placa-veiculos"
LOG_DIR="$HOME/logs"
MARCA="# eliminacao-dados (LGPD)"

mkdir -p "$LOG_DIR"

# Descobre o node do NVM em uso, para o cron (que não carrega o NVM) achar o binário.
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
nvm use 20 >/dev/null
NODE_BIN="$(command -v node)"

LINHA="30 3 * * * cd $APP_DIR && $NODE_BIN scripts/eliminacao-dados.mjs >> $LOG_DIR/eliminacao-dados.log 2>&1 $MARCA"

# Remove entrada anterior (se houver) e grava a atual.
( crontab -l 2>/dev/null | grep -v "eliminacao-dados" ; echo "$LINHA" ) | crontab -

echo "Agendado. Crontab atual:"
crontab -l
