import Image from "next/image"
import getHospital from "@/libs/getHospital"
import Link from "next/link"

export default async function HospitalDetailPage({params}:{params:{hid:string}}){
    
    const hospitalDetail = await getHospital(params.hid)

    //MOCK
    /*const hospitalRepo =new Map()
    hospitalRepo.set("001",{name:"Chulalongkorn Hospital",image:'/img/chula.jpg'})
    hospitalRepo.set("002",{name:"Rajavithi Hospital",image:'/img/rajavithi.jpg'})
    hospitalRepo.set("003",{name:"Thammasat University Hospital",image:'/img/thammasat.jpg'})
    */
    return(
        <main className="text-center p-5" style={{ marginTop: '60px' }}>
            <h1 className="text-lg font-medium">{hospitalDetail.data.name}</h1>
            <div className="flex flex-row my-5">
                <Image src={hospitalDetail.data.picture}
                    alt="Hospital Image"
                    width={0} height={0} sizes="100vw"
                    className="rounded-lg w-[30%]"/>
                <div className="flex flex-col mx-5 my-1">
                    <div className="text-md text-left my-1">Name: {hospitalDetail.data.name}</div>
                    <div className="text-md text-left my-1">Address: {hospitalDetail.data.address}</div>
                    <div className="text-md text-left my-1">District: {hospitalDetail.data.district}</div>
                    <div className="text-md text-left my-1">Province: {hospitalDetail.data.province}</div>
                    <div className="text-md text-left my-1">Tel: {hospitalDetail.data.tel}</div>
                
                    <Link href={`/booking?id=${params.hid}&name=${hospitalDetail.data.name}`}>
                        <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-whilte shadow-sm">
                            Book Vaccine
                        </button>
                    </Link>
                
                </div>
            </div>
        </main>
    )
}
