module.exports = {
  apps: [
    {
      name: 'pirate-backend',
      cwd: '/home/ubuntu/exam/backend',
      script: 'server.js',
      instances: 1,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 9000
      },
      error_file: '/home/ubuntu/exam/logs/backend-error.log',
      out_file: '/home/ubuntu/exam/logs/backend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      time: true
    }
  ]
};
