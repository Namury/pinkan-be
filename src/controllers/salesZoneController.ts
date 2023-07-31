import {
  getSalesZoneService,
  getSalesZoneByIdService,
  addSalesZoneService,
  editSalesZoneService,
  deleteSalesZoneService
} from "$services/salesZoneServices";
import {
  response_bad_request,
  response_internal_server_error,
  response_success,
} from "$utils/response.utils";
import { salesZoneCreate, salesZoneEdit } from "$utils/salesZone.utils";
import { Request, Response } from "express";

export async function getSalesZone(req: Request, res: Response): Promise<Response> {
  try {
    const { status, data, error } = await getSalesZoneService();
    if (status) {
      return response_success(res, data);
    } else {
      return response_bad_request(res, error);
    }
  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}

export async function getSalesZoneById(req: Request, res: Response) {
  try {
    const id = req.params.id;
  
    const { status, data, error } = await getSalesZoneByIdService(id);
    if (status) {
      return response_success(res, data);
    } else {
      return response_bad_request(res, error);
    }

  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}

export async function addSalesZone(req: Request, res: Response) {
  try {
    const userId = res.locals.jwtPayload.id;

    const salesZoneData:salesZoneCreate = {...req.body, userId}
  
    const { status, data, error } = await addSalesZoneService(salesZoneData);
    if (status) {
      return response_success(res, data);
    } else {
      return response_bad_request(res, error);
    }

  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}

export async function editSalesZone(req: Request, res: Response) {
  try {
    const userId = res.locals.jwtPayload.id;
    const isAdmin = res.locals.jwtPayload.isAdmin;
    const salesZoneData:salesZoneEdit = {id: req.params.id, ...req.body}
  
    const { status, data, error } = await editSalesZoneService(salesZoneData);
    if (status) {
      return response_success(res, data);
    } else {
      return response_bad_request(res, error);
    }

  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}

export async function deleteSalesZone(req: Request, res: Response) {
  try {
    const id = req.params.id;
  
    const { status, data, error } = await deleteSalesZoneService(id);
    if (status) {
      return response_success(res, data);
    } else {
      return response_bad_request(res, error);
    }

  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}