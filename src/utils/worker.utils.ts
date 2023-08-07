import { cronJobUpdateConsumptionDaysRemaining, cronJobUpdateConsumerWeeklyHistory } from '$services/consumerServices';
import { CronJob } from 'cron';
import { log } from 'console';

export const addWeeklyHistory = (pattern = '50 23 * * *') => {
    log('cron2 started')
    const cronJobUpdate = new CronJob(pattern, async () =>{
        log('Cronjob2 triggered')
    const { status, data, error } = await cronJobUpdateConsumerWeeklyHistory();
    if (status) {
        log("ConsumptionDaysRemaining Successfully Updated", data)
    } else {
        log("ConsumptionDaysRemaining  Update Failed", error)
    }
    }, null, true, 'Asia/Jakarta');
    return cronJobUpdate;
};

export const updateConsumptionDays = (pattern = '0 0 * * *') => {
    log('cron1 started')
    const cronJobUpdate = new CronJob(pattern, async () =>{
        log('Cronjob1 triggered')
    const { status, data, error } = await cronJobUpdateConsumptionDaysRemaining();
    if (status) {
        log("ConsumptionDaysRemaining Successfully Updated", data)
    } else {
        log("ConsumptionDaysRemaining  Update Failed", error)
    }
    }, null, true, 'Asia/Jakarta');
    return cronJobUpdate;
};