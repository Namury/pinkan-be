import { cronJobUpdateConsumptionDaysRemaining } from '$services/consumerServices';
import { CronJob } from 'cron';
import { log } from 'console';

const updateActivePrograms = (pattern = '0 0 * * *') => {
    const cronJobUpdate = new CronJob(pattern, async () =>{
        const { status, data, error } = await cronJobUpdateConsumptionDaysRemaining();
        if (status) {
            log("ConsumptionDaysRemaining Successfully Updated", data)
        } else {
            log("ConsumptionDaysRemaining  Update Failed", error)
        }
    }, null, true, 'Asia/Jakarta');
    return cronJobUpdate;
  };

module.exports = {
    init: () => {
        updateActivePrograms();
    }
}