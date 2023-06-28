import { prisma } from "$utils/prisma.utils";
import { response } from "$utils/response.utils";

import { consumerCreate, consumerEdit, consumerResponse } from "$utils/consumer.utils";

export async function getConsumerService(): Promise<response> {
  try {
    const consumers = await prisma.consumer.findMany();

    return {
      status: true,
      data: { consumers },
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
      }
    });

    return {
      status: true,
      data: { consumer },
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
      data: { consumerType },
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
      data: { consumerType },
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
  user: consumerCreate
): Promise<response> {
  try {
    const selectedUserField = {
      id: true,
      shNumber: true,
      name: true,
    };

    const createdUser = await prisma.user.create({
      data: {
        ...user,
      },
      select: selectedUserField,
    });

    return {
      status: true,
      data: { user: createdUser },
      message: "Register Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Register Failed",
      error: String(err),
    };
  }
}


export async function editConsumerService(
  consumer: consumerEdit
): Promise<response> {
  try {
    const selectedUserField = {
      id: true,
      shNumber: true,
      name: true,
    };

    const createdUser = await prisma.user.create({
      data: {
        ...consumer,
      },
      select: selectedUserField,
    });

    return {
      status: true,
      data: { user: createdUser },
      message: "Register Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Register Failed",
      error: String(err),
    };
  }
}

export async function deleteConsumerService(
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
      data: { salesZone },
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