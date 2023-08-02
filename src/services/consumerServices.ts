import { prisma } from "$utils/prisma.utils";
import { response } from "$utils/response.utils";
import * as XLSX from 'xlsx';

import { consumerCreate, consumerEdit, consumerFilter, consumerResponse, formattedConsumerType, formatExportConsumer } from "$utils/consumer.utils";
import { LooseObject } from "$utils/common.utils";

export async function getConsumerService(userId:string, isAdmin:boolean, filter:consumerFilter): Promise<response> {
  try {
    let salesZoneId = '%%';
    if(isAdmin && !filter.userId){
      userId = filter.userId?`%${filter.userId}%`: userId ? `%${userId}%` : '%%'
      salesZoneId = filter.salesZoneId?`%${filter.salesZoneId}%`:'%%'
      userId = '%%' 
    }

    const name = filter.name?`%${filter.name}%`:'%%'
    const consumerTypeId = filter.consumerTypeId?`%${filter.consumerTypeId}%`:'%%'
    
    const consumers = await prisma.$queryRaw<[]>`
      SELECT public."Consumer".*, public."User"."salesZoneId", public."SalesZone".name as "salesZoneName",
      public."Province".name as "provinceName", public."City".name as "cityName",
      public."User"."shNumber" as "userShNumber", public."User".name as "userName", 
      public."ConsumerType".name as "consumerTypeName"
      FROM public."Consumer" 
      LEFT JOIN public."User" ON public."User".id = public."Consumer"."userId"
      LEFT JOIN public."ConsumerType" ON public."ConsumerType".id = public."Consumer"."consumerTypeid"
      LEFT JOIN public."SalesZone" ON public."SalesZone".id = public."User"."salesZoneId"
      LEFT JOIN public."Province" ON public."Province".code = public."SalesZone"."provinceCode"
      LEFT JOIN public."City" ON public."City".code = public."SalesZone"."cityCode"
      WHERE "userId" ILIKE ${userId} AND public."Consumer"."name" ILIKE ${name} AND public."User"."salesZoneId" ILIKE ${salesZoneId}
      AND public."Consumer"."consumerTypeid" ILIKE ${consumerTypeId}
      ORDER BY public."Consumer"."updatedAt" DESC
    `;

    // if(consumers.length === 0){
    //   return {
    //     status: false,
    //     data: {},
    //     message: "Get All Consumer Failed",
    //     error: "Data not found"
    //   };
    // }

    
    let formattedConsumer:formattedConsumerType[] = []
    if(filter.export){
      let nomor = 1
      consumers.forEach(consumer => {
        formattedConsumer.push({'No.': nomor, ...formatExportConsumer(consumer)});
        nomor++
      })
    }

    return {
      status: true,
      data: filter.export?formattedConsumer:consumers,
      message: "Get All Consumer Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Get All Consumer Failed",
      error: String(err),
    };
  }
}

export async function getConsumerListReminderService(userId: String, isAdmin: boolean, filter:consumerFilter): Promise<response> {
  try {
    userId = filter.userId?`%${filter.userId}%`: userId ? `%${userId}%` : '%%'
    
    if(isAdmin && !filter.userId){
      userId = '%%' 
    }

    const name = filter.name?`%${filter.name}%`:'%%'
    const salesZoneId = filter.salesZoneId?`%${filter.salesZoneId}%`:'%%'
    const consumerTypeId = filter.consumerTypeId?`%${filter.consumerTypeId}%`:'%%'
    
    const consumers = await prisma.$queryRaw<[]>`
      SELECT public."Consumer".*, public."User"."salesZoneId", public."SalesZone".name as "salesZoneName",
      public."Province".name as "provinceName", public."City".name as "cityName",
      public."User"."shNumber" as "userShNumber", public."User".name as "userName", 
      public."ConsumerType".name as "consumerTypeName"
      FROM public."Consumer" 
      LEFT JOIN public."User" ON public."User".id = public."Consumer"."userId"
      LEFT JOIN public."ConsumerType" ON public."ConsumerType".id = public."Consumer"."consumerTypeid"
      LEFT JOIN public."SalesZone" ON public."SalesZone".id = public."User"."salesZoneId"
      LEFT JOIN public."Province" ON public."Province".code = public."SalesZone"."provinceCode"
      LEFT JOIN public."City" ON public."City".code = public."SalesZone"."cityCode"
      WHERE "userId" ILIKE ${userId} AND public."Consumer"."name" ILIKE ${name} AND public."User"."salesZoneId" ILIKE ${salesZoneId}
      AND public."Consumer"."consumerTypeid" ILIKE ${consumerTypeId}
      AND public."Consumer"."consumptionDaysRemaining" >= -7 AND public."Consumer"."isRead" = false
      ORDER BY public."Consumer"."updatedAt" DESC
    `;
    
    let formattedConsumer:formattedConsumerType[] = []
    if(filter.export){
      let nomor = 1
      consumers.forEach(consumer => {
        formattedConsumer.push({'No.': nomor, ...formatExportConsumer(consumer)});
        nomor++
      })
    }

    return {
      status: true,
      data: filter.export?formattedConsumer:consumers,
      message: "Get Consumer List Reminder Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Get Consumer List Reminder Failed",
      error: String(err),
    };
  }
}

export async function getConsumerByIdService(
  id: string
): Promise<response> {
  try {
    const consumer = await prisma.consumer.findUnique({
      where: {
        id,
      }, include: {
        ConsumerType: true
      }
    });
 
    return {
      status: true,
      data: { ...consumer },
      message: "Get consumer by ID Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Get consumer by ID Failed",
      error: String(err),
    };
  }
}

export async function getConsumerTypeService(): Promise<response> {
  try {
    const consumerType = await prisma.consumerType.findMany();

    return {
      status: true,
      data: consumerType,
      message: "Get Consumer Type Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Get Consumer Type Failed",
      error: String(err),
    };
  }
}

export async function getConsumerTypeByIdService(
  id: string
): Promise<response> {
  try {
    const consumerType = await prisma.consumerType.findUnique({
      where: {
        id,
      }
    });

    return {
      status: true,
      data: { ...consumerType },
      message: "Get Consumer Type by ID Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Get Consumer Type by ID Failed",
      error: String(err),
    };
  }
}

function camelCase(str: string) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index == 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}

export async function getConsumerCountService(userId: string, isAdmin: boolean): Promise<response> {
  try {
    const getAllConsumerType = await prisma.consumerType.findMany()

    const usersWithCount:LooseObject = {};
    for (let index = 0; index < getAllConsumerType.length; index++) {
      const camelCaseName = camelCase(getAllConsumerType[index].name)
      const formattedWhere:LooseObject = {
        consumerTypeid: getAllConsumerType[index].id,
        userId
      }
      if(isAdmin){
        delete formattedWhere.userId;
      }
      usersWithCount[camelCaseName] = await prisma.consumer.count({
        where: formattedWhere
      })
    }

    const formattedWhere:LooseObject = {
      consumptionDaysRemaining:{
        gte: -7
      }, 
      isRead: false,
      userId
    }

    if(isAdmin){
      delete formattedWhere.userId;
    }

    const getNotificationCount = await prisma.consumer.count({
      where: formattedWhere
    })

    return {
      status: true,
      data: { ...usersWithCount, notification: getNotificationCount },
      message: "Get Consumer Type by ID Success",
    };
  } catch (err) {
    return {
      status: false,
      data: {},
      message: "Get Consumer Type by ID Failed",
      error: String(err),
    };
  }
}

export async function addConsumerService(
  consumer: consumerCreate
): Promise<response> {
  try {
    let diffDays = 0;

    if(!consumer.refillDate){
      consumer.refillDate = new Date(Date.now())
    }

    if(consumer.refillDate) {
      consumer.refillDate = new Date(consumer.refillDate)
      const refillDateTime = consumer.refillDate.getTime()
      const today = new Date()
      const todayDateTime = today.getTime()
      const diffTime = todayDateTime - refillDateTime;
      diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1; 
    }

    if(consumer.consumptionDaysEstimate) consumer.consumptionDaysEstimate = Number(Math.abs(consumer.consumptionDaysEstimate))
    if(!consumer.consumptionDaysRemaining)
      consumer.consumptionDaysRemaining = -Math.abs(consumer.consumptionDaysEstimate) +  diffDays
    if(consumer.refillFive) consumer.refillFive = Number(consumer.refillFive)
    if(consumer.refillFifty) consumer.refillFifty = Number(consumer.refillFifty)
    if(consumer.refillTwelve) consumer.refillTwelve = Number(consumer.refillTwelve)
    const createdConsumer = await prisma.consumer.create({
      data: {
        ...consumer,
      },
    });

    return {
      status: true,
      data: { createdConsumer },
      message: "Create Consumer Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Create Consumer Failed",
      error: String(err),
    };
  }
}


export async function editConsumerService(
  consumer: consumerEdit
): Promise<response> {
  try {

    if(consumer.isAdmin)
      delete consumer.userId;
    
    delete consumer.isAdmin
    let diffDays = 0;

    if(consumer.refillDate) {
      consumer.refillDate = new Date(consumer.refillDate)
      const refillDateTime = consumer.refillDate.getTime()
      const today = new Date()
      const todayDateTime = today.getTime()
      const diffTime = todayDateTime - refillDateTime;
      diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1; 

      if(!consumer.consumptionDaysEstimate)
        consumer.consumptionDaysRemaining = -diffDays
    }

    if(consumer.consumptionDaysEstimate) consumer.consumptionDaysEstimate = Number(Math.abs(consumer.consumptionDaysEstimate))
    if(!consumer.consumptionDaysRemaining && consumer.consumptionDaysEstimate)
      consumer.consumptionDaysRemaining = -Math.abs(consumer.consumptionDaysEstimate) +  diffDays

    if(consumer.refillFive) consumer.refillFive = Number(consumer.refillFive)
    if(consumer.refillFifty) consumer.refillFifty = Number(consumer.refillFifty)
    if(consumer.refillTwelve) consumer.refillTwelve = Number(consumer.refillTwelve)

    const updatedConsumer = await prisma.consumer.update({
      where: {
        id: consumer.id
      },
      data: {
        ...consumer,
      }
    });

    return {
      status: true,
      data: { user: updatedConsumer },
      message: "Update Consumer Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Update Consumer Failed",
      error: String(err),
    };
  }
}

export async function deleteConsumerService(
  id: string
): Promise<response> {
  try {
    const consumer = await prisma.consumer.delete({
      where: {
        id,
      }
    });

    return {
      status: true,
      data: {},
      message: "Delete Consumer Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Delete Consumer Failed",
      error: String(err),
    };
  }
}

export async function cronJobUpdateConsumptionDaysRemaining(): Promise<response> {
  try {
    const updateConsumer = await prisma.consumer.updateMany({
      where: {
        consumptionDaysRemaining : {
          lte: 10
        },
      },
      data:{
        consumptionDaysRemaining: {
          increment: 1
        }
      }
    })

    return {
      status: true,
      data: { updateConsumer },
      message: "Update consumer consumption days remaining success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Update consumer consumption days remaining success Failed",
      error: String(err),
    };
  }
}