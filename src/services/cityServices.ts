import { cityFilter } from "$utils/city.utils";
import { LooseObject } from "$utils/common.utils";
import { prisma } from "$utils/prisma.utils";
import { response } from "$utils/response.utils";
import { validate as uuidValidate } from 'uuid'

export async function getCityService(filter:cityFilter): Promise<response> {
  try {
    let formattedWhere:LooseObject = {};

    if(filter.provinceCode){
      formattedWhere = {
        Province:{
          code: filter.provinceCode
        }
      }
    }

    const cities = await prisma.city.findMany({
      where: formattedWhere
    });

    return {
      status: true,
      data: cities,
      message: "Get Cities Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Get Cities Failed",
      error: String(err),
    };
  }
}

export async function getCityByIdService(
  id: string
): Promise<response> {
  try {
    let formattedWhere:LooseObject = {}
    
    if( uuidValidate(id) ) {
        formattedWhere.id = id;
    } else {
        formattedWhere.code = id;
    };
    const city = await prisma.city.findUnique({
      where: formattedWhere
    });

    return {
      status: true,
      data: { ...city },
      message: "Get City by ID Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Get City by ID Failed",
      error: String(err),
    };
  }
}
