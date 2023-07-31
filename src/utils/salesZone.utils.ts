export interface salesZoneCreate {
    name: string;
    cityCode?: string;
    provinceCode: string;
  }
  
  export interface salesZoneFilter {
    userId: string;
    salesZoneId: string;
    salesZoneTypeId: string;
    name: string;
    export: boolean;
  }
  
  export interface salesZoneEdit {
    id: string;
    name?: string;
    cityCode?: string;
    provinceCode?: string;

  }