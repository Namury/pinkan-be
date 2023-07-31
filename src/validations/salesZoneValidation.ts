import { response_bad_request, response_conflict, response_not_found } from "$utils/response.utils";
import { Request, NextFunction, Response } from "express";
import { validate as uuidValidate } from 'uuid'
import { prisma } from "$utils/prisma.utils";

export async function validateSalesZoneByIdRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;

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

export async function validateEditSalesZoneRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    name,
    provinceCode,
    cityCode
  } = req.body
  const id = req.params.id;

  if(id){
    const checkSalesZone = await prisma.salesZone.findUnique({
      where: {
        id
      }
    })

    if(!checkSalesZone){
      return response_not_found(res, "Sales Zone ID not Found")
    }
  }
  next();
}

export async function validateDeleteSalesZoneRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;

  if (!id) return response_bad_request(res, "id is required");
  
  if( !uuidValidate(id) ) return response_bad_request(res, "SalesZone Type Id must be UUID");

  const checkSalesZone = await prisma.salesZone.findUnique({
    where: {
      id
    }
  })

  if(!checkSalesZone){
    return response_not_found(res, "SalesZone ID not Found")
  }
  next();
}

export async function validateAddSalesZoneRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    name,
    provinceCode,
    cityCode
  } = req.body
  const id = req.params.id;
  
  if (!name) return response_bad_request(res, "Name is required");
  const checkUnique = await prisma.salesZone.findFirst({
    where: {
      name
    }
  })

  if(checkUnique){
    return response_conflict(res, 'Name already exist')
  }

  next();
}