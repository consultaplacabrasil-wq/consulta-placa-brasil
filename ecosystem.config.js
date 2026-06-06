/** @type {import('pm2').ProcessDescription} */
module.exports = {
  apps: [
    {
      name: "consulta-placa-veiculos",
      // Aponta direto para o entry JS do Next (o .bin/next é um wrapper shell
      // que o PM2 tenta interpretar como JS e quebra)
      script: "node_modules/next/dist/bin/next",
      args: "start",
      interpreter: "node",
      cwd: "/var/www/consulta-placa-veiculos",
      instances: 1,        // aumente para 2 quando tiver mais tráfego
      exec_mode: "fork",
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
        // Tipo da APIBrasil usado na consulta GRÁTIS (preview da home).
        // agregados-simples = R$0,02. Troque aqui se o slug do produto na
        // conta APIBrasil for diferente e rode: pm2 reload <app> --update-env
        APIBRASIL_TIPO_GRATIS: "agregados-simples",
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
