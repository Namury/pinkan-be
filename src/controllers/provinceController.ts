import {
    getProvinceService,
    getProvinceByIdService,
  } from "$services/provinceServices";
  import {
    response_bad_request,
    response_internal_server_error,
    response_success,
  } from "$utils/response.utils";
  import { Request, Response } from "express";
  
  export async function getProvince(req: Request, res: Response): Promise<Response> {
    try {
      const { status, data, error } = await getProvinceService();
      if (status) {
        return response_success(res, data);
      } else {
        return response_bad_request(res, error);
      }
    } catch (err: unknown) {
      return response_internal_server_error(res, String(err));
    }
  }
  
  export async function getProvinceById(req: Request, res: Response) {
    try {
      const id = req.params.id;
    
      const { status, data, error } = await getProvinceByIdService(id);
      if (status) {
        return response_success(res, data);
      } else {
        return response_bad_request(res, error);
      }
  
    } catch (err: unknown) {
      return response_internal_server_error(res, String(err));
    }
  }