interface HospitalItem {
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
  
  export  interface HospitalJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: HospitalItem[]
  }

export  interface BookingItem{
    name:string;
    surname:string;
    id:string;
    hospital:string;
    bookDate:string;
  }