import { response_bad_request, response_conflict, response_not_found } from "$utils/response.utils";
import { Request, NextFunction, Response } from "express";
import { validate as uuidValidate } from 'uuid'
import { prisma } from "$utils/prisma.utils";

function validateEmail(email: string): boolean {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export async function validateGetAllUserRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  
}

export async function validateGetUserByIdRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;

  if (!id) return response_bad_request(res, "id is required");
  
  if( !uuidValidate(id) ) return response_bad_request(res, "User Id must be UUID");

  const checkUserId = await prisma.user.findUnique({
    where: {
      id
    }
  })

  if(!checkUserId){
    return response_not_found(res, "User not Found")
  }
  next();
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
  if (!shNumber && !email) return response_bad_request(res, "SH Number Or Email is required");
  if (shNumber && email) return response_bad_request(res, "Either SH Number or Email is allowed");
  if (shNumber){
    const checkShNumber = await prisma.user.findUnique({
      where: {
        shNumber
      }
    })

    if(checkShNumber){
      return response_conflict(res, 'SH Number already exist')
    }
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
  }

  if (email){
    if (!validateEmail(email))
      return response_bad_request(res, "Email provided is not a correct form");
      
    const checkEmail = await prisma.user.findUnique({
      where: {
        email
      }
    })
    
    if(checkEmail){
      return response_conflict(res, 'Email already exist')
    }
  }
  if (!password) return response_bad_request(res, "Password is required");
  next();
}

export async function validateEditRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;
  const {shNumber, email } = req.body;
  if (shNumber && email) return response_bad_request(res, "Either SH Number or Email is allowed");
  if (shNumber){
    const checkShNumber = await prisma.user.findFirst({
      where: {
        NOT:{
          id
        },
        shNumber
      }
    })

    if(checkShNumber){
      return response_conflict(res, 'SH Number already exist')
    }
  }

  if (email){
    if (!validateEmail(email))
      return response_bad_request(res, "Email provided is not a correct form");
      
    const checkEmail = await prisma.user.findFirst({
      where: {
        NOT:{
          id
        },
        email
      }
    })
    
    if(checkEmail){
      return response_conflict(res, 'Email already exist')
    }
  }
  next();
}
export async function validateEditLoggedInUserRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = res.locals.jwtPayload.id;
  const {shNumber, email } = req.body;
  if (shNumber && email) return response_bad_request(res, "Either SH Number or Email is allowed");
  if (shNumber){
    const checkShNumber = await prisma.user.findFirst({
      where: {
        NOT:{
          id
        },
        shNumber
      }
    })

    if(checkShNumber){
      return response_conflict(res, 'SH Number already exist')
    }
  }

  if (email){
    if (!validateEmail(email))
      return response_bad_request(res, "Email provided is not a correct form");
      
    const checkEmail = await prisma.user.findFirst({
      where: {
        NOT:{
          id
        },
        email
      }
    })
    
    if(checkEmail){
      return response_conflict(res, 'Email already exist')
    }
  }
  next();
}