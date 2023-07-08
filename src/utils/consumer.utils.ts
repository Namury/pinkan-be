import { UUID } from "crypto";

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

export interface consumerEdit {
  name: string;
  address: string;
  phone: string;        
  latitude: string;
  longitude: string;
  refillDate: Date;
  refillFive?: number;           
  refillTwelve?: number;           
  refillFifty?: number;           
  isRead?: boolean;       
  consumptionDaysEstimate: number;           
  consumptionDaysRemaining?: number;           
  consumerTypeid: string;
  userId: string;
}

export interface consumerResponse {
  token: string;
  name: string;
  shNumber: string;
  isAdmin?: boolean | null;
}
