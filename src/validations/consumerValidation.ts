import { response_bad_request, response_conflict, response_not_found } from "$utils/response.utils";
import { Request, NextFunction, Response } from "express";
import { validate as uuidValidate } from 'uuid'
import { prisma } from "$utils/prisma.utils";

function validateLatitude(latitude: string): boolean {
  const re = /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,20})?))$/;
  return re.test(latitude);
}

function validateLongitude(longitude: string): boolean {
  const re = /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,20})?))$/;
  return re.test(longitude);
}

function validatePhone(phone: string): boolean {
  const re =/^\d+$/;
  return re.test(phone);
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
    latitude,
    longitude
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
    if (!validatePhone(phone))
      return response_bad_request(res, "Format Nomor Handphone yang Anda masukkan belum sesuai");
  
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

  if(latitude){
    if (!validateLatitude(latitude))
      return response_bad_request(res, "Format Latitude Anda tidak sesuai (terdapat koma/huruf/karakter lain)");
  }

  if(longitude){
    if (!validateLongitude(longitude))
      return response_bad_request(res, "Format Longitude Anda tidak sesuai (terdapat koma/huruf/karakter lain)");
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

  if (!validatePhone(phone))
    return response_bad_request(res, "Format Nomor Handphone yang Anda masukkan belum sesuai");
  
  const checkUniquePhone = await prisma.consumer.findUnique({
    where: {
      phone
    }
  })

  if(checkUniquePhone){
    return response_conflict(res, 'Phone Number already exist')
  }

  if(!latitude) return response_bad_request(res, "latitude is Required")  
  if (!validateLatitude(latitude))
    return response_bad_request(res, "Format Latitude Anda tidak sesuai (terdapat koma/huruf/karakter lain)");
 
  if(!longitude) return response_bad_request(res, "longitude is Required")
  if (!validateLongitude(longitude))
    return response_bad_request(res, "Format Longitude Anda tidak sesuai (terdapat koma/huruf/karakter lain)");
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