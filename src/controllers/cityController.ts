import {
    getCityService,
    getCityByIdService,
  } from "$services/cityServices";
  import {
    response_bad_request,
    response_internal_server_error,
    response_success,
  } from "$utils/response.utils";
  import { Request, Response } from "express";
  
  export async function getCity(req: Request, res: Response): Promise<Response> {
    try {
      
      const filter = Object(req.query.filter);
      const { status, data, error } = await getCityService(filter);
      if (status) {
        return response_success(res, data);
      } else {
        return response_bad_request(res, error);
      }
    } catch (err: unknown) {
      return response_internal_server_error(res, String(err));
    }
  }
  
  export async function getCityById(req: Request, res: Response) {
    try {
      const id = req.params.id;
    
      const { status, data, error } = await getCityByIdService(id);
      if (status) {
        return response_success(res, data);
      } else {
        return response_bad_request(res, error);
      }
  
    } catch (err: unknown) {
      return response_internal_server_error(res, String(err));
    }
  }