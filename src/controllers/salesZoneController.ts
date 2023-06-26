import {
  getSalesZoneService,
  getSalesZoneByIdService,
} from "$services/salesZoneServices";
import {
  response_bad_request,
  response_internal_server_error,
  response_success,
} from "$utils/response.utils";
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