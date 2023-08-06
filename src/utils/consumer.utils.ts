import { UUID } from "crypto";

interface consumer {
  id: string
  name: string
  address: string
  phone: string
  latitude: string
  longitude: string
  cityCode: string
  refillDate: Date
  refillFive: number
  refillTwelve: number
  refillFifty: number
  isRead: boolean
  consumptionDaysEstimate: number
  consumptionDaysRemaining: number
  consumerTypeid: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

interface consumerWithInclude {
  id: string
  name: string
  address: string
  phone: string
  latitude: string
  longitude: string
  cityCode: string
  City: {
    name: string,
    Province: {
      name: string
    }
  }
  refillDate: Date
  refillFive: number
  refillTwelve: number
  refillFifty: number
  isRead: boolean
  consumptionDaysEstimate: number
  consumptionDaysRemaining: number
  consumerTypeid: string
  ConsumerType: {
    name: string
  }
  userId: string
  User: {
    name: string,
    salesZoneId: string|null,
    shNumber: string|null,
    SalesZone: {
      name: string
    }|null
  },
  createdAt: Date
  updatedAt: Date
}

export interface consumerCreate {
  name: string;
  address: string;
  phone: string;        
  latitude: string;
  longitude: string;
  cityCode: string;
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
  userId?: string;
  salesZoneId?: string;
  consumerTypeId?: string;
  cityCode?: string;
  name?: string;
  export?: boolean;
  listReminder?: boolean;
}

export interface consumerEdit {
  id: string;
  name?: string;
  address?: string;
  phone?: string;        
  latitude?: string;
  longitude?: string;
  cityCode: string;
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

export interface formattedConsumerHistoryType {
  consumerId: string
  name: string
  address: string
  phone: string
  latitude: string
  longitude: string
  cityCode: string
  refillDate: Date
  refillFive: number
  refillTwelve: number
  refillFifty: number
  isRead: boolean
  consumptionDaysEstimate: number
  consumptionDaysRemaining: number
  consumerTypeid: string
  userId: string
}
export interface formattedConsumerExportType {
  'No.': number;
  'Nama Agen': string;
  'No SH Agen': string|null;
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
  'Wilayah Sales': string|null;
  'Provinsi': string,
  'Kota/Kabupaten': string,
}

export interface formattedConsumerResponseType {
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
  salesZoneId: string|null;
  userName: string;
  userShNumber: string|null;
  consumerTypeName: string;
  salesZoneName: string|null;
  provinceName: string;
  cityName: string;
}

export type consumerHistoryData = {
  consumerId: string
  name: string
  address: string
  phone: string
  latitude: string
  longitude: string
  cityCode: string
  refillDate: Date
  refillFive: number
  refillTwelve: number
  refillFifty: number
  isRead: boolean
  consumptionDaysEstimate: number
  consumptionDaysRemaining: number
  consumerTypeid: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

export function formatResponseConsumer(consumer:consumerWithInclude){
  return{
    id: consumer.id,
    name: consumer.name,
    address: consumer.address,
    latitude: consumer.latitude,
    longitude: consumer.longitude,
    consumerTypeid: consumer.consumerTypeid,
    userId: consumer.userId,
    createdAt: consumer.createdAt,
    updatedAt: consumer.updatedAt,
    refillDate: consumer.refillDate,
    refillFifty: consumer.refillFifty,
    refillFive: consumer.refillFive,
    refillTwelve: consumer.refillTwelve,
    isRead: consumer.isRead,
    phone: consumer.phone,
    consumptionDaysEstimate: consumer.consumptionDaysEstimate,
    consumptionDaysRemaining: consumer.consumptionDaysRemaining,
    cityCode: consumer.cityCode,
    salesZoneId: consumer.User.salesZoneId,
    salesZoneName: consumer.User.SalesZone?consumer.User.SalesZone.name: null,
    provinceName: consumer.City.Province.name,
    cityName: consumer.City.name,
    userShNumber: consumer.User.shNumber,
    userName: consumer.User.name,
    consumerTypeName: consumer.ConsumerType.name,
  }
}
export function formatHistoryConsumer(consumer:consumer){
  return {
    consumerId: consumer.id,
    name: consumer.name,
    address: consumer.address,
    phone: consumer.phone,
    latitude: consumer.latitude,
    longitude: consumer.longitude,
    cityCode: consumer.cityCode,
    refillDate: consumer.refillDate,
    refillFive: consumer.refillFive,
    refillTwelve: consumer.refillTwelve,
    refillFifty: consumer.refillFifty,
    isRead: consumer.isRead,
    consumptionDaysEstimate: consumer.consumptionDaysEstimate,
    consumptionDaysRemaining: consumer.consumptionDaysRemaining,
    consumerTypeid: consumer.consumerTypeid,
    userId: consumer.userId,
  }
}

export function formatExportConsumer(consumer:consumerWithInclude){
  const formattedConsumer = {
    'Nama Agen': consumer.User.name,
    'No SH Agen': consumer.User.shNumber? consumer.User.shNumber: null,
    'Jenis Konsumen': consumer.ConsumerType.name,
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
    'Wilayah Sales': consumer.User.SalesZone? consumer.User.SalesZone.name: null,
    'Provinsi': consumer.City.Province.name,
    'Kota/Kabupaten': consumer.City.name,
    'Update Terakhir': consumer.updatedAt
  }

  return formattedConsumer
}