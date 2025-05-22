import 'dotenv/config';
import cron from 'node-cron';
import axios from 'axios';

// Environment variables
const CRON_SECRET = process.env.CRON_SECRET || 'your-cron-secret';
const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';

// Check environment
console.log('Starting cron job runner...');
console.log(`Server URL: ${BASE_URL}`);

if (!process.env.CRON_SECRET) {
  console.warn('⚠️ CRON_SECRET not set in environment. Job may be unauthorized.');
  console.warn('Set it with: export CRON_SECRET="your-secret-here"');
}

// Schedule job to run at midnight every day (can be adjusted)
// Format: second(optional) minute hour day-of-month month day-of-week
cron.schedule('0 0 * * *', async () => {
  console.log('Running scheduled job:', new Date().toISOString());
  await runSocialStatsJob();
});

// Function to run the social stats job
async function runSocialStatsJob() {
  try {
    const url = `${BASE_URL}/api/cron/job-status`;
    console.log(`Calling endpoint: ${url}`);
    
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${CRON_SECRET}`
      },
      timeout: 60000 // 60 seconds timeout
    });
    
    console.log('Job completed with status:', response.status);
    console.log('Response:', JSON.stringify(response.data, null, 2));
    
    return response.data;
  } catch (error) {
    console.error('Error running job:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
      
      if (error.response.status === 401) {
        console.error('⚠️ Authentication failed: Make sure CRON_SECRET matches the one in your server.');
        console.error('1. Check the CRON_SECRET environment variable.');
        console.error('2. Verify the authorization check in api/cron/job-status/route.ts');
      }
    }
  }
}

// Option to run the job immediately (when script is started)
if (process.argv.includes('--run-now')) {
  console.log('Running job immediately...');
  runSocialStatsJob().catch(console.error);
}

console.log('Cron job scheduler started. Press Ctrl+C to exit.'); 