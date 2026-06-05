#!/bin/bash
# =============================================================================
# FASE 5 — Configurar Nginx + SSL
# Execute como usuário 'deploy'
# ANTES: Aponte o DNS do seu domínio para o IP do VPS
# =============================================================================

set -e

DOMAIN="consultaplacaveiculos.com.br"   # <── altere se necessário
WWW_DOMAIN="www.consultaplacaveiculos.com.br"
EMAIL="webpixelbr@gmail.com"            # <── altere para seu e-mail
APP_PORT=3000

echo "=== Criando configuração do Nginx ==="
sudo tee /etc/nginx/sites-available/$DOMAIN > /dev/null <<NGINX
# Redireciona www → sem www
server {
    listen 80;
    server_name $WWW_DOMAIN;
    return 301 https://$DOMAIN\$request_uri;
}

server {
    listen 80;
    server_name $DOMAIN;

    # Necessário para o Certbot validar o domínio
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }

    location / {
        return 301 https://\$host\$request_uri;
    }
}

server {
    listen 443 ssl http2;
    server_name $DOMAIN;

    # SSL — será preenchido pelo Certbot
    # ssl_certificate ...
    # ssl_certificate_key ...

    # Segurança
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Tamanho máximo de upload
    client_max_body_size 10M;

    # Proxy para o Next.js
    location / {
        proxy_pass http://localhost:$APP_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 60s;
    }

    # Cache de arquivos estáticos do Next.js
    location /_next/static/ {
        proxy_pass http://localhost:$APP_PORT;
        proxy_cache_valid 200 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Arquivos públicos
    location /public/ {
        proxy_pass http://localhost:$APP_PORT;
        add_header Cache-Control "public, max-age=86400";
    }
}
NGINX

echo "=== Ativando site no Nginx ==="
sudo ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/$DOMAIN

# Remover site padrão se existir
sudo rm -f /etc/nginx/sites-enabled/default

echo "=== Testando configuração do Nginx ==="
sudo nginx -t

echo "=== Recarregando Nginx ==="
sudo systemctl reload nginx

echo "=== Obtendo certificado SSL (Let's Encrypt) ==="
echo "ATENÇÃO: o DNS do domínio $DOMAIN precisa estar apontando para este servidor!"
read -p "O DNS já está configurado? (s/n): " dns_ok

if [ "$dns_ok" = "s" ]; then
  sudo certbot --nginx \
    -d $DOMAIN \
    -d $WWW_DOMAIN \
    --email $EMAIL \
    --agree-tos \
    --non-interactive \
    --redirect

  echo "=== Testando renovação automática do SSL ==="
  sudo certbot renew --dry-run

  echo ""
  echo "=============================================="
  echo "  FASE 5 CONCLUÍDA!"
  echo "  Site disponível em: https://$DOMAIN"
  echo "=============================================="
else
  echo ""
  echo "  Configure o DNS e execute certbot manualmente:"
  echo "  sudo certbot --nginx -d $DOMAIN -d $WWW_DOMAIN --email $EMAIL --agree-tos --redirect"
fi
