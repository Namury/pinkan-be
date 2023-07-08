import {
  getConsumerService,
  getConsumerByIdService,
  getConsumerTypeService,
  getConsumerTypeByIdService,
  addConsumerService,
  editConsumerService,
  deleteConsumerService,
} from "$services/consumerServices";
import { consumerCreate, consumerEdit } from "$utils/consumer.utils";
import {
  response_bad_request,
  response_internal_server_error,
  response_not_found,
  response_success,
} from "$utils/response.utils";
import { Request, Response } from "express";

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

export async function addConsumer(req: Request, res: Response) {
  try {
    const consumerData:consumerCreate = {...req.body, userId: res.locals.jwtPayload.id}
  
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
    const consumerData:consumerEdit = req.body
  
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