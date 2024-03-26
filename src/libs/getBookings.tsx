export default async function getBookings(token:string) {
    return fetch(`${process.env.BACKEND}/api/v1/bookings`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
        }
    })
    .then((prev) => {if(prev.ok) return prev.json(); else throw new Error("uh oh")})
}