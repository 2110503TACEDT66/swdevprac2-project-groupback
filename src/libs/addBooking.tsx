import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { BookingItem } from "../../interface";
import { getServerSession } from "next-auth";

export default async function addBooking(data:BookingItem, token:string) {
    return fetch(`${process.env.BACKEND}/api/v1/hotels/${data.hotel}/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            checkIn: data.checkIn,
            checkOut: data.checkOut
        })
    })
    .then((prev) => {if(prev.ok) return prev.json(); else return {success: false}})
}