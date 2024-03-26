interface HotelItem {
    _id: string,
    name: string,
    address: string,
    district: string,
    province: string,
    postalcode: string,
    tel: string,
    region: string,
    rating: number,
  }
  
  export  interface HotelJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: HotelItem[]
  }

export  interface BookingItem{
    user:string;
    hotel:string;
    checkIn:string;
    checkOut:string;
  }

export interface BookingJson {
  success: boolean,
  count: number,
  data: BookingItem[]
}