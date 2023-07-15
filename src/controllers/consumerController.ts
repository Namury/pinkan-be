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
  getConsumerListReminderService,
} from "$services/consumerServices";
import { consumerCreate, consumerEdit } from "$utils/consumer.utils";
import {
  response_bad_request,
  response_internal_server_error,
  response_not_found,
  response_success,
} from "$utils/response.utils";
import { Request, Response, json, query } from "express";
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
    
    const { status, data, error } = await getConsumerListReminderService(userId, isAdmin, filter);
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

      const buf = await XLSX.write(wb, { type:"base64", bookType:"csv" });
      res.setHeader('Content-Disposition', `attachment; filename="Consumer Pinkan ${currentTime}.csv"`);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      return res.end(buf);
    } else {
      return response_not_found(res, error);
    }
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

