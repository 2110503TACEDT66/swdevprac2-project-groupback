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
    name:string;
    surname:string;
    id:string;
    hotel:string;
    bookDate:string;
  }