export default async function getHotels() {
    
    const response = await fetch(`${process.env.BACKEND}/api/v1/hotels`)
    if(!response.ok){
        throw new Error("Failed to fetch Hotel")
    }
    return await response.json()
}