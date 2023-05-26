import cron from 'node-cron'


// export const runCronJob = async () => {
cron.schedule('* * * * *', () => {
    console.log('running a task every minute');
});
// }
cron.schedule('1/* * * * * *', () => {
    console.log('running another task every second');
});
// runCronJob()
