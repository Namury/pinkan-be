import { cronJobUpdateConsumptionDaysRemaining } from '$services/consumerServices';
import { CronJob } from 'cron';
import { log } from 'console';

export const dateActivePrograms = (pattern = '0 0 * * *') => {
    log('cron started')
    const cronJobUpdate = new CronJob(pattern, async () =>{
        log('Cronjob triggered')
    const { status, data, error } = await cronJobUpdateConsumptionDaysRemaining();
    if (status) {
        log("ConsumptionDaysRemaining Successfully Updated", data)
    } else {
        log("ConsumptionDaysRemaining  Update Failed", error)
    }
    }, null, true, 'Asia/Jakarta');
    return cronJobUpdate;
};