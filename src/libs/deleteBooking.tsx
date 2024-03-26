export default async function deleteBooking (token:string, bookingId:string) {
    return fetch(`${process.env.BACKEND}/api/v1/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
        }
    })
    .then((prev) => {if(prev.ok) return prev.json();})
}