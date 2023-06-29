import { prisma } from "$utils/prisma.utils";
import { response } from "$utils/response.utils";

export async function getSalesZoneService(): Promise<response> {
  try {
    const salesZones = await prisma.salesZone.findMany();

    return {
      status: true,
      data: salesZones,
      message: "Get Sales Zones Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Get Sales Zones Failed",
      error: String(err),
    };
  }
}

export async function getSalesZoneByIdService(
  id: string
): Promise<response> {
  try {
    const salesZone = await prisma.salesZone.findUnique({
      where: {
        id,
      }
    });

    return {
      status: true,
      data: { ...salesZone },
      message: "Get Sales Zone by ID Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Get Sales Zone by ID Failed",
      error: String(err),
    };
  }
}
