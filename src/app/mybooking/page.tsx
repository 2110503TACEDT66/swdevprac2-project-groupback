import BookingList from "@/components/BookingList"
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import getBookings from "@/libs/getBookings";

export default async function MyBooking(){
    const session = await getServerSession(authOptions);
    return(
        <main>
            <BookingList bookItems={session ? await getBookings(session.user.token) : null }></BookingList>
        </main>
    )
}