export default async function getHotel(id:string) {
    const response = await fetch(`${process.env.BACKEND}/api/v1/hotels/${id}`)
    if(!response.ok){
        throw new Error("Failed to fetch hotel")
    }

    return await response.json()
}


