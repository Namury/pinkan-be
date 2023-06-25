import { response_bad_request, response_conflict, response_not_found } from "$utils/response.utils";
import { Request, NextFunction, Response } from "express";
import { validate as uuidValidate } from 'uuid'
import { prisma } from "$utils/prisma.utils";

function validateEmail(email: string): boolean {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function validateLoginRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username, password } = req.body;

  if (!username) return response_bad_request(res, "Username/Email is required");
  if (!password) return response_bad_request(res, "Password is required");
  next();
}

export async function validateRegisterRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, shNumber, salesZoneId, email, password } = req.body;

  if (!name) return response_bad_request(res, "Name is required");
  if (!shNumber) return response_bad_request(res, "SH Number is required");
  const checkShNumber = await prisma.user.findUnique({
    where: {
      shNumber
    }
  })

  if(checkShNumber){
    return response_conflict(res, 'SH Number already exist')
  }

  if(email && shNumber) return response_bad_request(res, "only either Email or SH Number can be inputted");
  if (email && !validateEmail(email))
    return response_bad_request(res, "Email provided is not a correct form");
  if (!password) return response_bad_request(res, "Password is required");
  if (!salesZoneId) return response_bad_request(res, "Sales Zone Id is required");
  if( !uuidValidate(salesZoneId) ) return response_bad_request(res, "Sales Zone Id must be UUID");

  const checkSalesZoneId = await prisma.salesZone.findUnique({
    where: {
      id: salesZoneId
    }
  })

  if(!checkSalesZoneId){
    return response_not_found(res, "Sales Zone not Found")
  }
  next();
}