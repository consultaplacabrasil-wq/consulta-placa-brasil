#!/bin/bash
# =============================================================================
# FASE 3 — Configurar PostgreSQL
# Execute como usuário 'deploy'
# =============================================================================

set -e

DB_NAME="consultaplaca"
DB_USER="consultaplaca_user"
DB_PASS="$(openssl rand -base64 24 | tr -d '/+=' | head -c 32)"

echo "=== Criando banco de dados e usuário PostgreSQL ==="

sudo -u postgres psql <<EOF
-- Criar usuário
DO \$\$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = '${DB_USER}') THEN
    CREATE USER ${DB_USER} WITH PASSWORD '${DB_PASS}';
  END IF;
END
\$\$;

-- Criar banco de dados
SELECT 'CREATE DATABASE ${DB_NAME} OWNER ${DB_USER}'
  WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '${DB_NAME}')\gexec

-- Conceder privilégios
GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME} TO ${DB_USER};
ALTER DATABASE ${DB_NAME} OWNER TO ${DB_USER};
EOF

echo "=== Configurando acesso local ao PostgreSQL ==="
PG_HBA=$(sudo -u postgres psql -t -c "SHOW hba_file;" | xargs)
echo "Arquivo pg_hba: $PG_HBA"

# Verificar se regra já existe
if ! sudo grep -q "consultaplaca_user" "$PG_HBA" 2>/dev/null; then
  echo "local   ${DB_NAME}   ${DB_USER}   md5" | sudo tee -a "$PG_HBA"
  sudo systemctl reload postgresql
fi

echo "=== Salvando credenciais em ~/db-credentials.txt ==="
cat > ~/db-credentials.txt <<CREDS
# PostgreSQL - Consulta Placa Veículos
# GUARDE ESTE ARQUIVO EM LOCAL SEGURO E DELETE DO SERVIDOR APÓS CONFIGURAR .ENV

DB_NAME=${DB_NAME}
DB_USER=${DB_USER}
DB_PASS=${DB_PASS}
DATABASE_URL=postgresql://${DB_USER}:${DB_PASS}@localhost:5432/${DB_NAME}
CREDS

chmod 600 ~/db-credentials.txt

echo ""
echo "=============================================="
echo "  FASE 3 CONCLUÍDA!"
echo ""
echo "  Suas credenciais do banco:"
cat ~/db-credentials.txt
echo ""
echo "  ANOTE O DATABASE_URL ACIMA — você vai precisar"
echo "  para configurar o arquivo .env da aplicação."
echo ""
echo "  Próximo: bash 04-configurar-app.sh"
echo "=============================================="
