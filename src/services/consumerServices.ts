import { prisma } from "$utils/prisma.utils";
import { response } from "$utils/response.utils";

import { consumerCreate, consumerEdit, consumerFilter, consumerResponse } from "$utils/consumer.utils";

export async function getConsumerService(userId:string, isAdmin:boolean, filter:consumerFilter): Promise<response> {
  try {
    userId = filter.userId?`%${filter.userId}%`: userId ? `%${userId}%` : '%%'
    
    if(isAdmin && !filter.userId){
      userId = '%%' 
    }

    const name = filter.name?`%${filter.name}%`:'%%'
    const salesZoneId = filter.salesZoneId?`%${filter.salesZoneId}%`:'%%'
    const consumerTypeId = filter.consumerTypeId?`%${filter.consumerTypeId}%`:'%%'
    
    console.log(consumerTypeId)
    const consumers = await prisma.$queryRaw<[]>`
      SELECT public."Consumer".*, public."User"."salesZoneId", public."ConsumerType".name as "consumerTypeName" FROM public."Consumer" 
      LEFT JOIN public."User" ON public."User".id = public."Consumer"."userId"
      LEFT JOIN public."ConsumerType" ON public."ConsumerType".id = public."Consumer"."consumerTypeid"
      WHERE "userId" ILIKE ${userId} AND public."Consumer"."name" ILIKE ${name} AND public."User"."salesZoneId" ILIKE ${salesZoneId}
      AND public."Consumer"."consumerTypeid" ILIKE ${consumerTypeId}
    `;

    if(consumers.length === 0){
      return {
        status: false,
        data: {},
        message: "Get All Consumer Failed",
        error: "Data not found"
      };
    }

    return {
      status: true,
      data: consumers,
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

export async function addConsumerService(
  consumer: consumerCreate
): Promise<response> {
  try {
    if(!consumer.consumptionDaysRemaining)
      consumer.consumptionDaysRemaining = -Math.abs(consumer.consumptionDaysEstimate)
    
    consumer.refillDate = new Date(Date.now())
    if(consumer.refillDate)consumer.refillDate = new Date(consumer.refillDate)
    if(consumer.consumptionDaysEstimate) consumer.consumptionDaysEstimate = Number(Math.abs(consumer.consumptionDaysEstimate))
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

    if(!consumer.consumptionDaysRemaining && consumer.consumptionDaysEstimate)
      consumer.consumptionDaysRemaining = -Math.abs(consumer.consumptionDaysEstimate)

    if(consumer.refillDate)consumer.refillDate = new Date(consumer.refillDate)
    if(consumer.consumptionDaysEstimate) consumer.consumptionDaysEstimate = Number(Math.abs(consumer.consumptionDaysEstimate))
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