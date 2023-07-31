import { prisma } from "$utils/prisma.utils";
import { response } from "$utils/response.utils";
import { salesZoneCreate, salesZoneEdit } from "$utils/salesZone.utils";

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

export async function addSalesZoneService(
  salesZone: salesZoneCreate
): Promise<response> {
  try {
    const createdSalesZone = await prisma.salesZone.create({
      data: {
        ...salesZone,
      },
    });

    return {
      status: true,
      data: { createdSalesZone },
      message: "Create SalesZone Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Create SalesZone Failed",
      error: String(err),
    };
  }
}


export async function editSalesZoneService(
  salesZone: salesZoneEdit
): Promise<response> {
  try {

    const updatedSalesZone = await prisma.salesZone.update({
      where: {
        id: salesZone.id
      },
      data: {
        ...salesZone,
      }
    });

    return {
      status: true,
      data: { updatedSalesZone },
      message: "Update SalesZone Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Update SalesZone Failed",
      error: String(err),
    };
  }
}

export async function deleteSalesZoneService(
  id: string
): Promise<response> {
  try {
    const salesZone = await prisma.salesZone.delete({
      where: {
        id,
      }
    });

    return {
      status: true,
      data: {},
      message: "Delete SalesZone Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Delete SalesZone Failed",
      error: String(err),
    };
  }
}