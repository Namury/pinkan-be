import { prisma } from "$utils/prisma.utils";
import { response } from "$utils/response.utils";
import * as XLSX from 'xlsx';

import { consumerCreate, consumerEdit, consumerFilter, consumerResponse, formattedConsumerExportType, formatExportConsumer, consumerHistoryData, formatHistoryConsumer, formattedConsumerHistoryType, formatResponseConsumer, formattedConsumerResponseType } from "$utils/consumer.utils";
import { LooseObject } from "$utils/common.utils";

export async function getConsumerService(userId:string, isAdmin:number, filter:consumerFilter): Promise<response> {
  try {
    if(!isAdmin){
      delete filter.salesZoneId;
      delete filter.userId;
    }

    if(isAdmin){
      if(isAdmin == 1){
        delete filter.salesZoneId;

        const findSalesZone = await prisma.user.findUnique({
          where: { id: userId }
        })
        if(findSalesZone && findSalesZone.salesZoneId) filter.salesZoneId = findSalesZone.salesZoneId
  
      }

      const findCompatibleUser = await prisma.user.findMany({
        where:{
          id: filter.userId?filter.userId:undefined,
          email: null,
          salesZoneId: filter.salesZoneId?filter.salesZoneId:undefined
        }
      })
      if(!findCompatibleUser) delete filter.userId
    }

    let nameSearch:[{id: string}];
    let nameSearchId:Array<string> = []
    if(filter.name){
      
      let userIdParams = filter.userId?`%${filter.userId}%`: !isAdmin ? `%${userId}%` : '%%';
      nameSearch = await prisma.$queryRaw<[{id:string}]>`
        SELECT public."Consumer".id
        FROM public."Consumer" 
        WHERE "userId" ILIKE ${userIdParams} AND public."Consumer"."name" ILIKE ${`%${filter.name}%`}
      `;

      nameSearchId = nameSearch.map(consumer => {
        return consumer.id
      })
    }

    const formattedWhere:LooseObject = {
      id: filter.name?{ in: nameSearchId }:undefined,
      userId: filter.userId?filter.userId:!isAdmin?userId:undefined,
      cityCode: filter.cityCode?filter.cityCode:undefined,
      consumerTypeid: filter.consumerTypeId?filter.consumerTypeId:undefined,
      consumptionDaysRemaining: filter.listReminder?{gte: -7}:undefined,
      User: filter.salesZoneId? {
        salesZoneId: filter.salesZoneId
      }: undefined
    }

    const consumers = await prisma.consumer.findMany({
      where: formattedWhere, 
      include: {
        User: { select:{ name: true, shNumber:true, salesZoneId: true, SalesZone: true } },
        ConsumerType: { select: { name: true } },
        City: { select: { name: true, Province: { select: {name: true } } } }
      }, orderBy: {
        updatedAt: 'desc'
      }
    })

    // if(consumers.length === 0){
    //   return {
    //     status: false,
    //     data: {},
    //     message: "Get All Consumer Failed",
    //     error: "Data not found"
    //   };
    // }

    
    let formattedExportConsumer:formattedConsumerExportType[] = []
    let formattedConsumer:formattedConsumerResponseType[] = []
    if(filter.export){
      let nomor = 1
      consumers.forEach(consumer => {
        formattedExportConsumer.push({'No.': nomor, ...formatExportConsumer(consumer)});
        nomor++
      })
    }else {
      consumers.forEach(consumer => {
        formattedConsumer.push({...formatResponseConsumer(consumer)});
      })
    }

    return {
      status: true,
      data: filter.export?formattedExportConsumer:formattedConsumer,
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

export async function getConsumerHistoryService(
  userId:string, 
  isAdmin:number,
  currentDate: Date,
){
  try {
    let findSalesZone
    const today = new Date(currentDate);
    const todayMidnight = new Date(currentDate);
    today.setHours(0, 0, 0, 0);
    todayMidnight.setHours(23, 59, 59, 999);
    if(isAdmin){
      if(isAdmin == 1){
        findSalesZone = await prisma.user.findUnique({
          where: { id: userId }
        })
      }
    }

    const formattedWhere:LooseObject = {
      userId: !isAdmin?userId:undefined,
      User: findSalesZone? {
        salesZoneId: findSalesZone.salesZoneId
      }: undefined,
      createdAt: {
        gte: today,
        lte: todayMidnight
      }
    }

    const consumers = await prisma.consumerHistory.findMany({
      where: formattedWhere, 
      include: {
        User: { select:{ name: true, shNumber:true, salesZoneId: true, SalesZone: true } },
        ConsumerType: { select: { name: true } },
        City: { select: { name: true, Province: { select: {name: true } } } }
      }
    })
    
    let formattedExportConsumer:formattedConsumerExportType[] = []
    let nomor = 1
    if(consumers.length){
      consumers.forEach(consumer => {
        formattedExportConsumer.push({'No.': nomor, ...formatExportConsumer(consumer)});
        nomor++
      })
    }else{
      return {
        status: false,
        data: {},
        message: "Get Consumer History Failed",
      };
    }

    return {
      status: true,
      data: formattedExportConsumer,
      message: "Get Consumer History Success",
    };    
  } catch (err:unknown) {
    return {
      status: false,
      data: {},
      message: "Get Consumer History Failed",
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

export async function getConsumerCountService(userId: string, isAdmin: number): Promise<response> {
  try {
    const getAllConsumerType = await prisma.consumerType.findMany()

    const usersWithCount:LooseObject = {};

    const formattedWhere:LooseObject = {
      userId
    }

    if(isAdmin){
      let salesZoneId = undefined;
      if(isAdmin == 1){
        const findSalesZone = await prisma.user.findUnique({
          where: { id: userId },
          select: {salesZoneId: true}
        })
        if(findSalesZone && findSalesZone.salesZoneId) salesZoneId = findSalesZone.salesZoneId
      }
      const findCompatibleUser = await prisma.user.findMany({
        where:{
          email: null,
          salesZoneId: salesZoneId
        }
      })

      let compatibleUserId = findCompatibleUser.map(user => {
        return user.id
      })

      formattedWhere.userId = { in: compatibleUserId }
    }

    for (let index = 0; index < getAllConsumerType.length; index++) {
      const camelCaseName = camelCase(getAllConsumerType[index].name)
      formattedWhere.consumerTypeid = getAllConsumerType[index].id;
      usersWithCount[camelCaseName] = await prisma.consumer.count({
        where: formattedWhere
      })
    }

    formattedWhere.consumerTypeid = undefined
    formattedWhere.consumptionDaysRemaining = { gte: -7 };
    formattedWhere.isRead =  false;

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

export async function getConsumerReminderListCountService(userId: string, isAdmin: number, salesZoneId: string): Promise<response> {
  try {
    let salesZone;
    let cityFilter:LooseObject = {
      City: {
        code: '',
        Province:{
          code: ''
        }
      }
    };
    if(isAdmin != 2){
      salesZone = await prisma.salesZone.findUnique({
        where: {
          id: salesZoneId
        }
      })

      if(salesZone){
        if(salesZone.cityCode){
          cityFilter.City.code = salesZone.cityCode;
        }else {
          delete cityFilter.City.code;
        }

        if(salesZone.provinceCode){
          cityFilter.City.Province.code = salesZone.provinceCode;
        }else{
          delete cityFilter.City.Province.code
        }
      }
    }

    const dayRanges = [
      {name: 'underThreeDays', query: {gte: -7, lte: -3}}, 
      {name: 'zeroDay', query: {gte: -2, lte: 0}}, 
      {name: 'threeDays', query: {gte: 1, lte: 3}}, 
      {name: 'sevenDays', query: {gte: 4, lte: 7}}, 
      {name: 'tenDays', query: {gte: 8, lte: 10}}, 
      {name: 'tenMoreDays', query: {gt: 10}}
    ]

    const usersWithCount:LooseObject = {};
    for (let index = 0; index < dayRanges.length; index++) {
      const formattedWhere:LooseObject = {
        consumptionDaysRemaining: dayRanges[index].query,
        userId,
        ...cityFilter
      }
      if(isAdmin){
        delete formattedWhere.userId;
      }

      if(isAdmin == 2){
        delete formattedWhere.City;
      }

      usersWithCount[dayRanges[index].name] = await prisma.consumer.count({
        where: formattedWhere
      })
    }

    return {
      status: true,
      data: { ...usersWithCount },
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
    const today = new Date(Date.now())
    const todayDateTime = today.getTime()
    const consumers = await prisma.consumer.findMany({
      where: {
        consumptionDaysRemaining : {
          lte: 20
        },
      }
    })

    const resMap = consumers.map(async (consumer) => {
      const refillDateTime = consumer.refillDate.getTime()
      const diffTime = todayDateTime - refillDateTime;
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1; 
      let currentDaysRemaining = -Math.abs(consumer.consumptionDaysEstimate) +  diffDays
      const updatedUser = await prisma.consumer.update({
        where:{
          id: consumer.id
        },data: {
          consumptionDaysRemaining: currentDaysRemaining
        }
      })

      return updatedUser
    });

    const result = (await Promise.all(resMap)).length;
    
    return {
      status: true,
      data: {result},
      message: "Update consumer consumption days remaining success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Update consumer consumption days remaining Failed",
      error: String(err),
    };
  }
}

export async function updateConsumptionDaysRemainingHistoryService(date: Date): Promise<response> {
  try {
    const today = new Date(date);
    const todayMidnight = new Date(date);
    const todayDateTime = date.getTime()
    today.setHours(0, 0, 0, 0);
    todayMidnight.setHours(23, 59, 59, 999);

    const consumers = await prisma.consumerHistory.findMany({
      select:{
        id: true,
        refillDate: true,
        consumptionDaysEstimate: true
      },
      where:{
        consumptionDaysRemaining : {
          lte: 20
        },
        createdAt: {
          gte: today,
          lte: todayMidnight
        }
      }
    })

    const resMap = consumers.map(async (consumer) => {
      const refillDateTime = consumer.refillDate.getTime()
      const diffTime = todayDateTime - refillDateTime;
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1; 
      let currentDaysRemaining = -Math.abs(consumer.consumptionDaysEstimate) +  diffDays
      const updatedUser = await prisma.consumerHistory.update({
        where:{
          id: consumer.id
        },data: {
          consumptionDaysRemaining: currentDaysRemaining
        }
      })

      return updatedUser
    });

    const result = (await Promise.all(resMap)).length;
    
    return {
      status: true,
      data: {result},
      message: "Update consumer consumption days remaining History success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Update consumer consumption days remaining History failed",
      error: String(err),
    };
  }
}

export async function cronJobUpdateConsumerWeeklyHistory(): Promise<response> {
  try {
    const today = new Date(Date.now());
    const todayMidnight = new Date(Date.now());
    today.setHours(0, 0, 0, 0);
    todayMidnight.setHours(23, 59, 59, 999);

    const consumers = await prisma.consumer.findMany()

    const todayHistory = await prisma.consumerHistory.findMany({
      select:{
        consumerId: true
      },
      where:{
        createdAt: {
          gte: today,
          lte: todayMidnight
        }
      }
    })

    const todayHistoryConsumerIds = todayHistory.map(consumer => {
      return consumer.consumerId
    })

    let formattedConsumer:formattedConsumerHistoryType[] = []
    consumers.map(consumer => {
      if(!todayHistoryConsumerIds.includes(consumer.id)){
        formattedConsumer.push({...formatHistoryConsumer(consumer)});
      }
    })

    const createdConsumerHistory = await prisma.consumerHistory.createMany({
      data: formattedConsumer
    })

    return {
      status: true,
      data: createdConsumerHistory,
      message: "Update consumer history success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Update consumer history Failed",
      error: String(err),
    };
  }
}