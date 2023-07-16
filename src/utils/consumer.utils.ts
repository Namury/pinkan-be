import { UUID } from "crypto";
import { Consumer } from "@prisma/client";
export interface consumerCreate {
  name: string;
  address: string;
  phone: string;        
  latitude: string;
  longitude: string;
  refillDate: Date;
  refillFive?: number;           
  refillTwelve?: number;           
  refillFifty?: number;       
  consumptionDaysEstimate: number;           
  consumptionDaysRemaining?: number;           
  consumerTypeid: string;
  userId: string;
}

export interface consumerFilter {
  userId: string;
  salesZoneId: string;
  consumerTypeId: string;
  name: string;
  export: boolean;
}

export interface consumerEdit {
  id: string;
  name?: string;
  address?: string;
  phone?: string;        
  latitude?: string;
  longitude?: string;
  refillDate?: Date;
  refillFive?: number;           
  refillTwelve?: number;           
  refillFifty?: number;           
  isRead?: boolean;       
  consumptionDaysEstimate?: number;           
  consumptionDaysRemaining?: number;           
  consumerTypeid?: string;
  userId?: string;
  isAdmin?: boolean;
}

export interface consumerResponse {
  token: string;
  name: string;
  shNumber: string;
  isAdmin?: boolean | null;
}

export interface formattedConsumerType {
  'No.': number;
  'Nama Agen': string;
  'No SH Agen': string;
  'Jenis Konsumen': string;
  'Nama Konsumen': string;
  'Alamat': string;
  'Waktu Penebusan': Date;
  'BG 5.5': number;
  'BG 12': number;
  'BG 50': number;
  'Estimasi Hari Konsumsi': number;
  'Sisa Hari Konsumsi': number;
  'No. Telepon': string;
  'Wilayah Sales': string;
}

interface consumerDatabaseResponse {
  id: string;
  name: string;
  address: string;
  phone: string;
  latitude: string;
  longitude: string;
  refillDate: Date;
  refillFive: number;
  refillTwelve: number;
  refillFifty: number;
  isRead: boolean;
  consumptionDaysEstimate: number;
  consumptionDaysRemaining: number;
  consumerTypeid: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  salesZoneId: string;
  userName: string;
  userShNumber: string;
  consumerTypeName: string;
  salesZoneName: string;
}

export function formatExportConsumer(consumer:consumerDatabaseResponse){
  const formattedConsumer = {
    'Nama Agen': consumer.userName,
    'No SH Agen': consumer.userShNumber,
    'Jenis Konsumen': consumer.consumerTypeName,
    'Nama Konsumen': consumer.name,
    'Alamat': consumer.address,
    'Longitude': consumer.longitude,
    'Latitude': consumer.latitude,
    'Waktu Penebusan': consumer.refillDate,
    'BG 5.5': consumer.refillFive,
    'BG 12': consumer.refillTwelve,
    'BG 50': consumer.refillFifty,
    'Estimasi Hari Konsumsi': consumer.consumptionDaysEstimate,
    'Sisa Hari Konsumsi': consumer.consumptionDaysRemaining,
    'No. Telepon': consumer.phone,
    'Wilayah Sales': consumer.salesZoneName,
    'Update Terakhir': consumer.updatedAt
  }

  return formattedConsumer
}