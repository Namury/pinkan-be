import { response_bad_request, response_conflict, response_not_found } from "$utils/response.utils";
import { Request, NextFunction, Response } from "express";
import { validate as uuidValidate } from 'uuid'
import { prisma } from "$utils/prisma.utils";

function validateEmail(email: string): boolean {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export async function validateGetConsumerByIdRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;

  if (!id) return response_bad_request(res, "id is required");
  
  if( !uuidValidate(id) ) return response_bad_request(res, "Consumer Id must be UUID");

  const checkConsumerId = await prisma.consumer.findUnique({
    where: {
      id
    }
  })

  if(!checkConsumerId){
    return response_not_found(res, "Consumer not Found")
  }
  next();
}

export async function validateGetConsumerTypeByIdRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;

  if (!id) return response_bad_request(res, "id is required");
  
  if( !uuidValidate(id) ) return response_bad_request(res, "Consumer Type Id must be UUID");

  const checkConsumerTypeId = await prisma.consumerType.findUnique({
    where: {
      id
    }
  })

  if(!checkConsumerTypeId){
    return response_not_found(res, "Consumer Type not Found")
  }
  next();
}

export async function validateEditConsumerRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    name,
  phone,
    consumerTypeid,
  } = req.body
  const userId = res.locals.jwtPayload.id;
  const isAdmin = res.locals.jwtPayload.isAdmin;
  const id = req.params.id;

  if(id){
    const checkConsumer = await prisma.consumer.findUnique({
      where: {
        id
      }
    })

    if(!checkConsumer){
      return response_not_found(res, "Consumer ID not Found")
    }
  }

  if (name && !isAdmin){
    const checkUnique = await prisma.consumer.findFirst({
      where: {
        NOT:{
          id
        },
        name,
        userId,
      }
    })
  
    if(checkUnique){
      return response_conflict(res, 'Name and User combination already exist')
    }
  }

  if(phone) {
    const checkUniquePhone = await prisma.consumer.findFirst({
      where: {
        NOT:{
          id
        },
        phone
      }
    })
  
    if(checkUniquePhone){
      return response_conflict(res, 'Phone Number already exist')
    }
    
  }
  if(consumerTypeid){
    if( !uuidValidate(consumerTypeid) ) return response_bad_request(res, "Sales Zone Id must be UUID");

    const checkConsumerTypeid = await prisma.consumerType.findUnique({
      where: {
        id: consumerTypeid
      }
    })

    if(!checkConsumerTypeid){
      return response_not_found(res, "Consumer Type not Found")
    }
  }
  next();
}

export async function validateDeleteConsumerRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;

  if (!id) return response_bad_request(res, "id is required");
  
  if( !uuidValidate(id) ) return response_bad_request(res, "Consumer Type Id must be UUID");

  const checkConsumer = await prisma.consumer.findUnique({
    where: {
      id
    }
  })

  if(!checkConsumer){
    return response_not_found(res, "Consumer ID not Found")
  }
  next();
}

export async function validateAddConsumerRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    name,
    address,
    phone,
    latitude,
    longitude,
    consumptionDaysEstimate,
    consumerTypeid,
  } = req.body

  const userId = res.locals.jwtPayload.id
  
  if (!name) return response_bad_request(res, "Name is required");
  const checkUnique = await prisma.consumer.findFirst({
    where: {
      name,
      userId
    }
  })

  if(checkUnique){
    return response_conflict(res, 'Name and User combination already exist')
  }

  if(!address) return response_bad_request(res, "address is Required")
  if(!phone) return response_bad_request(res, "phone is Required")
  const checkUniquePhone = await prisma.consumer.findUnique({
    where: {
      phone
    }
  })

  if(checkUniquePhone){
    return response_conflict(res, 'Phone Number already exist')
  }

  if(!latitude) return response_bad_request(res, "latitude is Required")  
  if(!longitude) return response_bad_request(res, "longitude is Required")
  // if(!refillDate) return response_bad_request(res, "refillDate is Required")
  if(!consumptionDaysEstimate) return response_bad_request(res, "consumptionDaysEstimate is Required")
  if (!consumerTypeid) return response_bad_request(res, "Consumer Type is required");
  
  
  if (!consumerTypeid) return response_bad_request(res, "Consumer Type is required");
  if( !uuidValidate(consumerTypeid) ) return response_bad_request(res, "Sales Zone Id must be UUID");

  const checkConsumerTypeid = await prisma.consumerType.findUnique({
    where: {
      id: consumerTypeid
    }
  })

  if(!checkConsumerTypeid){
    return response_not_found(res, "Consumer Type not Found")
  }
  next();
}