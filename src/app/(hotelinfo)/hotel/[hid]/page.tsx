import getHotel from "@/libs/getHotel"
import Link from "next/link"

export default async function HotelDetailPage({params}:{params:{hid:string}}){
    
    const hotelDetail = await getHotel(params.hid)
    return(
        <main className="text-center p-5" style={{ marginTop: '60px' }}>
            <h1 className="text-lg font-medium">{hotelDetail.data.name}</h1>
            <p className="text-[0.5em] text-gray-500">{hotelDetail.data._id}</p>
            <div className="flex flex-row my-5">
                <div className="flex flex-col mx-5 my-1">
                    <div className="text-md text-left my-1">Name: {hotelDetail.data.name}</div>
                    <div className="text-md text-left my-1">Address: {hotelDetail.data.address}</div>
                    <div className="text-md text-left my-1">District: {hotelDetail.data.district}</div>
                    <div className="text-md text-left my-1">Province: {hotelDetail.data.province}</div>
                    <div className="text-md text-left my-1">Tel: {hotelDetail.data.tel}</div>
                
                    <Link href={`/booking?id=${params.hid}&name=${hotelDetail.data.name}`}>
                        <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-whilte shadow-sm">
                           Book a stay here
                        </button>
                    </Link>
                
                </div>
            </div>
        </main>
    )
}
