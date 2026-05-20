module.exports = {
  apps: [
    {
      name: 'cosmedic-cms',
      cwd: './packages/cms',
      script: 'pnpm',
      args: 'start',
      env: { NODE_ENV: 'production', PORT: 4007 },
      autorestart: true,
      max_memory_restart: '768M',
      time: true,
    },
    {
      name: 'cosmedic-web',
      cwd: './packages/web',
      script: 'pnpm',
      args: 'start',
      env: { NODE_ENV: 'production', PORT: 3007 },
      autorestart: true,
      max_memory_restart: '512M',
      time: true,
    },
  ],
}
