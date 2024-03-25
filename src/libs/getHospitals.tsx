import { resolve } from "path"

export default async function getHospitals() {
    
    await new Promise((resolve)=>setTimeout(resolve,1000))

    const response = await fetch("https://vaccine-app-backend.vercel.app/api/v1/hotels")
    if(!response.ok){
        throw new Error("Failed to fetch Hospitals")
    }
    return await response.json()
}