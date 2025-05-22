# Custom Cron Job Scripts

This directory contains scripts to run scheduled tasks without relying on Vercel's cron jobs.

## Setup

1. Make sure you have the required environment variables in your `.env.local` file:

```
# Cron job settings
CRON_SECRET=your-cron-secret-here
BASE_URL=http://localhost:3000

# Contract settings
APP_WALLET_PRIVATE_KEY=your-private-key-here
RPC_URL=https://rpc.moksha.vana.org
APP_API_SERVER_URL=https://your-api-server-url
COMPUTE_ENGINE_ADDRESS=0xb2BFe33FA420c45F1Cf1287542ad81ae935447bd
COMPUTE_INSTRUCTION_ID=2
REFINER_ID=1
```

2. Install the dependencies:

```bash
npm install
```

## Usage

### Run the cron job scheduler

This will start the scheduler which will run the job at the configured time (default: midnight every day):

```bash
npm run cron
```

### Run the job immediately

To run the job immediately without waiting for the scheduled time:

```bash
npm run cron:now
```

## Deployment

For production use, you can:

1. Use a process manager like PM2 to keep the script running:

```bash
npm install -g pm2
pm2 start npm --name "cron-jobs" -- run cron
pm2 save
pm2 startup
```

2. Use your server's system cron to run the job directly:

Add to crontab (runs at midnight):
```
0 0 * * * cd /path/to/your/project && /usr/bin/node scripts/cron-runner.js --run-now
```

3. Use a dedicated service like GitHub Actions, AWS Lambda, or Azure Functions with time triggers. 