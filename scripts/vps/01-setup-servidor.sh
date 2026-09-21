#!/bin/bash
# =============================================================================
# FASE 1 — Setup inicial do servidor
# Execute como ROOT logo após receber acesso ao VPS
# ssh root@SEU_IP
# =============================================================================

set -e

echo "=== Atualizando sistema ==="
apt update && apt upgrade -y

echo "=== Instalando pacotes essenciais ==="
apt install -y curl wget git unzip ufw fail2ban htop nano

echo "=== Configurando fuso horário (Brasília) ==="
timedatectl set-timezone America/Sao_Paulo

echo "=== Criando swap de 2GB (evita falta de RAM no build) ==="
if [ ! -f /swapfile ]; then
  fallocate -l 2G /swapfile
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  echo '/swapfile none swap sw 0 0' >> /etc/fstab
  echo "Swap criado com sucesso."
else
  echo "Swap já existe, pulando."
fi

echo "=== Criando usuário 'deploy' ==="
if ! id "deploy" &>/dev/null; then
  adduser --disabled-password --gecos "" deploy
  usermod -aG sudo deploy
  echo "deploy ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers.d/deploy
  echo "Usuário 'deploy' criado."
else
  echo "Usuário 'deploy' já existe."
fi

echo "=== Copiando chave SSH do root para o usuario deploy ==="
# Sem isto o usuario 'deploy' fica sem forma de login: e criado com
# --disabled-password e nao herda o authorized_keys automaticamente.
if [ -f /root/.ssh/authorized_keys ]; then
  mkdir -p /home/deploy/.ssh
  cp /root/.ssh/authorized_keys /home/deploy/.ssh/authorized_keys
  chown -R deploy:deploy /home/deploy/.ssh
  chmod 700 /home/deploy/.ssh
  chmod 600 /home/deploy/.ssh/authorized_keys
  echo "Chave SSH copiada para deploy."
else
  echo "AVISO: /root/.ssh/authorized_keys nao encontrado."
  echo "O usuario 'deploy' ficara sem acesso SSH ate voce adicionar uma chave."
fi

echo "=== Configurando firewall UFW ==="
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

echo "=== Configurando Fail2Ban ==="
systemctl enable fail2ban
systemctl start fail2ban

echo ""
echo "=============================================="
echo "  FASE 1 CONCLUÍDA!"
echo "  Próximo passo: faça login como 'deploy'"
echo "  ssh deploy@SEU_IP"
echo "  Depois execute: bash 02-instalar-dependencias.sh"
echo "=============================================="
