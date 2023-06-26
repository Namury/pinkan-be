import { response_bad_request, response_conflict, response_not_found } from "$utils/response.utils";
import { Request, NextFunction, Response } from "express";
import { validate as uuidValidate } from 'uuid'
import { prisma } from "$utils/prisma.utils";

export async function validateSalesZoneByIdRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.body;

  if (!id) return response_bad_request(res, "id is required");
  
  if( !uuidValidate(id) ) return response_bad_request(res, "Sales Zone Id must be UUID");

  const checkSalesZoneId = await prisma.salesZone.findUnique({
    where: {
      id
    }
  })

  if(!checkSalesZoneId){
    return response_not_found(res, "Sales Zone not Found")
  }
  next();
}