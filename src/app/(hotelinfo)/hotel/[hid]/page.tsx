import getHotel from "@/libs/getHotel"
import Link from "next/link"

export default async function HotelDetailPage({params}:{params:{hid:string}}){
    
    const hotelDetail = await getHotel(params.hid)
    return(
        <main  className="text-center p-5 mt-24" style={{ marginTop: '100px' }}>
            <h1 className="text-lg font-medium">{hotelDetail.data.name}</h1>
            <p className="text-xs text-gray-500">{hotelDetail.data._id}</p>
            <div className="flex flex-col my-5 mx-auto max-w-md border border-gray-800 rounded-lg p-5">
            <div className="flex flex-col my-1">
                    <div className="text-md my-1">Name: {hotelDetail.data.name}</div>
                    <div className="text-md my-1">Address: {hotelDetail.data.address}</div>
                    <div className="text-md my-1">District: {hotelDetail.data.district}</div>
                    <div className="text-md my-1">Province: {hotelDetail.data.province}</div>
                    <div className="text-md my-1">Tel: {hotelDetail.data.tel}</div>
                    <div className="text-md my-1">
            </div>
            <div className="text-md my-1 mt-auto">
                <Link href={`/booking?id=${params.hid}&name=${hotelDetail.data.name}`}>
                    <button className="block rounded-md bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 mt-3 shadow-sm">                    Book a stay here
                    </button>
                </Link>
            </div>
                
                </div>
            </div>
        </main>
    )
}
