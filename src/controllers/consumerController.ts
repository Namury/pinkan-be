import {
  getConsumerService,
  getConsumerByIdService,
  getConsumerTypeService,
  getConsumerTypeByIdService,
  addConsumerService,
  editConsumerService,
  deleteConsumerService,
  cronJobUpdateConsumptionDaysRemaining,
  getConsumerCountService,
  getConsumerReminderListCountService,
  cronJobUpdateConsumerWeeklyHistory,
  getConsumerHistoryService,
  updateConsumptionDaysRemainingHistoryService,
  cronJobSendUserReminder
} from "$services/consumerServices";
import { consumerCreate, consumerEdit } from "$utils/consumer.utils";
import {
  response_bad_request,
  response_internal_server_error,
  response_not_found,
  response_success,
} from "$utils/response.utils";
import { Request, Response } from "express";
import * as XLSX from 'xlsx';

export async function getConsumer(req: Request, res: Response): Promise<Response> {
  try {
    const userId = res.locals.jwtPayload.id;
    const isAdmin = res.locals.jwtPayload.isAdmin;
    const filter = Object(req.query.filter);

    const { status, data, error } = await getConsumerService(userId, isAdmin, filter);
    if (status) {
      return response_success(res, data);
    } else {
      return response_not_found(res, error);
    }
  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}

export async function getConsumerReminderList(req: Request, res: Response): Promise<Response> {
  try {
    const userId = res.locals.jwtPayload.id;
    const isAdmin = res.locals.jwtPayload.isAdmin;
    const filter = Object(req.query.filter);
    filter.listReminder = true;
    
    const { status, data, error } = await getConsumerService(userId, isAdmin, filter);
    if (status) {
      return response_success(res, data);
    } else {
      return response_not_found(res, error);
    }
  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}

export async function exportConsumer(req: Request, res: Response): Promise<Response> {
  try {
    const userId = res.locals.jwtPayload.id;
    const isAdmin = res.locals.jwtPayload.isAdmin;
    const filter = Object(req.query.filter);
    const currentTime = new Date(Date.now()).toLocaleString('id-ID', { dateStyle: 'long' }).toString();
    filter.export = true;
    const { status, data, error } = await getConsumerService(userId, isAdmin, filter);
    if (status) {
      const wb = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(Object(data));
      XLSX.utils.book_append_sheet(wb, worksheet, "Sheet1");

      const buf = await XLSX.write(wb, { type:"base64", bookType:"xlsx" });
      res.setHeader('Content-Disposition', `attachment; filename="Consumer Pinkan ${currentTime}.xlsx"`);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      return res.end(buf);
    } else {
      return response_not_found(res, error);
    }
  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}

export async function exportConsumerListReminder(req: Request, res: Response): Promise<Response> {
  try {
    const userId = res.locals.jwtPayload.id;
    const isAdmin = res.locals.jwtPayload.isAdmin;
    const filter = Object(req.query.filter);
    const currentTime = new Date(Date.now()).toLocaleString('id-ID', { dateStyle: 'long' }).toString();
    filter.export = true;
    filter.listReminder = true;
    const { status, data, error } = await getConsumerService(userId, isAdmin, filter);
    if (status) {
      const wb = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(Object(data));
      XLSX.utils.book_append_sheet(wb, worksheet, "Sheet1");

      const buf = await XLSX.write(wb, { type:"base64", bookType:"xlsx" });
      res.setHeader('Content-Disposition', `attachment; filename="List Reminder Consumer Pinkan ${currentTime}.xlsx"`);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      return res.end(buf);
    } else {
      return response_not_found(res, error);
    }
  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}

function getSevenDaysBefore(current:Date) {
  var week= [];
  for (var i = 0; i < 7; i++) {
      week.push(
          new Date(current)
      ); 
      current.setDate(current.getDate() - 1);
  }
  return week; 
}

export async function exportConsumerWeeklyHistory(req: Request, res: Response): Promise<Response> {
  try {
    const userId = res.locals.jwtPayload.id;
    const isAdmin = res.locals.jwtPayload.isAdmin;
    const currentTime = new Date(Date.now()).toLocaleString('id-ID', { dateStyle: 'long' }).toString();
    const currentWeek = getSevenDaysBefore(new Date(Date.now()))

    const wb = XLSX.utils.book_new();
    const { status, data } = await getConsumerService(userId, isAdmin, {export: true});
    if (status) {
      const worksheet = XLSX.utils.json_to_sheet(Object(data));
      XLSX.utils.book_append_sheet(wb, worksheet, currentTime);
    } else {
      const worksheet = XLSX.utils.json_to_sheet(Object([{
        'No.': undefined,
        'Nama Agen': undefined,
        'No SH Agen': undefined,
        'Jenis Konsumen': undefined,
        'Nama Konsumen': undefined,
        'Alamat': undefined,
        'Longitude': undefined,
        'Latitude': undefined,
        'Waktu Penebusan': undefined,
        'BG 5.5': undefined,
        'BG 12': undefined,
        'BG 50': undefined,
        'Estimasi Hari Konsumsi': undefined,
        'Sisa Hari Konsumsi': undefined,
        'No. Telepon': undefined,
        'Wilayah Sales': undefined,
        'Provinsi': undefined,
        'Kota/Kabupaten': undefined,
        'Update Terakhir': undefined
      }]));
      XLSX.utils.book_append_sheet(wb, worksheet, currentTime);
    }
    for (var i = 1; i < 7; i++) {
      const { status, data } = await getConsumerHistoryService(userId, isAdmin, currentWeek[i]);
      if (status) {
        const worksheet = XLSX.utils.json_to_sheet(Object(data));
        XLSX.utils.book_append_sheet(wb, worksheet, currentWeek[i].toLocaleString('id-ID', { dateStyle: 'long' }).toString());
      } else {
        const worksheet = XLSX.utils.json_to_sheet(Object([{
          'No.': undefined,
          'Nama Agen': undefined,
          'No SH Agen': undefined,
          'Jenis Konsumen': undefined,
          'Nama Konsumen': undefined,
          'Alamat': undefined,
          'Longitude': undefined,
          'Latitude': undefined,
          'Waktu Penebusan': undefined,
          'BG 5.5': undefined,
          'BG 12': undefined,
          'BG 50': undefined,
          'Estimasi Hari Konsumsi': undefined,
          'Sisa Hari Konsumsi': undefined,
          'No. Telepon': undefined,
          'Wilayah Sales': undefined,
          'Provinsi': undefined,
          'Kota/Kabupaten': undefined,
          'Update Terakhir': undefined
        }]));
        XLSX.utils.book_append_sheet(wb, worksheet, currentWeek[i].toLocaleString('id-ID', { dateStyle: 'long' }).toString());
      }
    }
    const buf = await XLSX.write(wb, { type:"base64", bookType:"xlsx" });
    res.setHeader('Content-Disposition', `attachment; filename="History Consumer Pinkan ${currentTime}.xlsx"`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    return res.end(buf);

  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}

export async function getConsumerById(req: Request, res: Response) {
  try {
    const id = req.params.id;
  
    const { status, data, error } = await getConsumerByIdService(id);
    if (status) {
      return response_success(res, data);
    } else {
      return response_not_found(res, error);
    }

  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}

export async function getConsumerType(req: Request, res: Response): Promise<Response> {
  try {
    const { status, data, error } = await getConsumerTypeService();
    if (status) {
      return response_success(res, data);
    } else {
      return response_not_found(res, error);
    }
  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}

export async function getConsumerTypeById(req: Request, res: Response) {
  try {
    const id = req.params.id;
  
    const { status, data, error } = await getConsumerTypeByIdService(id);
    if (status) {
      return response_success(res, data);
    } else {
      return response_not_found(res, error);
    }

  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}

export async function getConsumerCount(req: Request, res: Response): Promise<Response> {
  try {
    const userId = res.locals.jwtPayload.id;
    const isAdmin = res.locals.jwtPayload.isAdmin;

    const { status, data, error } = await getConsumerCountService(userId, isAdmin);
    if (status) {
      return response_success(res, data);
    } else {
      return response_not_found(res, error);
    }
  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}

export async function getConsumerReminderListCount(req: Request, res: Response): Promise<Response> {
  try {
    const userId = res.locals.jwtPayload.id;
    const isAdmin = res.locals.jwtPayload.isAdmin;
    const salesZoneId = res.locals.jwtPayload.salesZoneId;

    const { status, data, error } = await getConsumerReminderListCountService(userId, isAdmin, salesZoneId);
    if (status) {
      return response_success(res, data);
    } else {
      return response_not_found(res, error);
    }
  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}

export async function addConsumer(req: Request, res: Response) {
  try {
    const userId = res.locals.jwtPayload.id;

    const consumerData:consumerCreate = {...req.body, userId}
  
    const { status, data, error } = await addConsumerService(consumerData);
    if (status) {
      return response_success(res, data);
    } else {
      return response_bad_request(res, error);
    }

  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}

export async function editConsumer(req: Request, res: Response) {
  try {
    const userId = res.locals.jwtPayload.id;
    const isAdmin = res.locals.jwtPayload.isAdmin;
    const consumerData:consumerEdit = {id: req.params.id, ...req.body, userId, isAdmin}
  
    const { status, data, error } = await editConsumerService(consumerData);
    if (status) {
      return response_success(res, data);
    } else {
      return response_bad_request(res, error);
    }

  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}

export async function deleteConsumer(req: Request, res: Response) {
  try {
    const id = req.params.id;
  
    const { status, data, error } = await deleteConsumerService(id);
    if (status) {
      return response_success(res, data);
    } else {
      return response_bad_request(res, error);
    }

  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}

export async function bypassUpdateConsumptionDaysRemaining(req: Request, res: Response) {
  try {
    const { status, data, error } = await cronJobUpdateConsumptionDaysRemaining();
    if (status) {
      return response_success(res, data);
    } else {
      return response_bad_request(res, error);
    }

  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}

export async function bypassUpdateConsumptionDaysRemainingHistory(req: Request, res: Response) {
  try {
    const currentWeek = getSevenDaysBefore(new Date(Date.now()))

    let response = []
    for (var i = 0; i < 7; i++) {
      const { status, data, error } = await updateConsumptionDaysRemainingHistoryService(currentWeek[i]);
      if (status) {
        response.push({...data, date: currentWeek[i]})
      } else {
        return response_bad_request(res, error);
      }
    }

    return response_success(res, response);

  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}

export async function bypassUpdateConsumerWeeklyHistory(req: Request, res: Response) {
  try {
    const { status, data, error } = await cronJobUpdateConsumerWeeklyHistory();
    if (status) {
      return response_success(res, data);
    } else {
      return response_bad_request(res, error);
    }

  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}

export async function bypassSendUserReminder(req: Request, res: Response) {
  try {
    const { status, data, error } = await cronJobSendUserReminder();
    if (status) {
      return response_success(res, data);
    } else {
      return response_bad_request(res, error);
    }

  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}

