import { BookingItem } from "../../interface";

export default async function editBooking(data:BookingItem, token:string) {
    return fetch(`${process.env.BACKEND}/api/v1/bookings/${data.user}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            hotel: data.hotel,
            checkIn: data.checkIn,
            checkOut: data.checkOut
        })
    })
    .then((prev) => {if(prev.ok) return prev.json(); else return {success: false}})
}