import { LooseObject } from "$utils/common.utils";
import { prisma } from "$utils/prisma.utils";
import { response } from "$utils/response.utils";
import { validate as uuidValidate } from 'uuid'

export async function getProvinceService(): Promise<response> {
  try {
    const provinces = await prisma.province.findMany();

    return {
      status: true,
      data: provinces,
      message: "Get Provinces Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Get Provinces Failed",
      error: String(err),
    };
  }
}

export async function getProvinceByIdService(
  id: string
): Promise<response> {
  try {
    let formattedWhere:LooseObject = {}
    
    if( uuidValidate(id) ) {
        formattedWhere.id = id;
    } else {
        formattedWhere.code = id;
    };
    const province = await prisma.province.findUnique({
      where: formattedWhere
    });

    return {
      status: true,
      data: { ...province },
      message: "Get Province by ID Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Get Province by ID Failed",
      error: String(err),
    };
  }
}
