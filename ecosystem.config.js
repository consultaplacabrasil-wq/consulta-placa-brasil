/** @type {import('pm2').ProcessDescription} */
module.exports = {
  apps: [
    {
      name: "consulta-placa-veiculos",
      script: "node_modules/.bin/next",
      args: "start",
      cwd: "/var/www/consulta-placa-veiculos",
      instances: 1,        // aumente para 2 quando tiver mais tráfego
      exec_mode: "fork",
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      // Reinício automático em caso de crash
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      // Logs
      out_file: "/var/log/pm2/consulta-placa-out.log",
      error_file: "/var/log/pm2/consulta-placa-error.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      merge_logs: true,
      // Cron jobs do sistema (reiniciar app às 3h para limpeza de memória)
      cron_restart: "0 3 * * *",
    },
  ],
};
