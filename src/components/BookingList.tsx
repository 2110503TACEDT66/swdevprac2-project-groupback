"use client"

import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { removeBooking } from "@/redux/features/bookSlice";
import { ClassNames } from "@emotion/react";
import getBookings from "@/libs/getBookings";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { BookingItem, BookingJson } from "../../interface";
import { useSession } from "next-auth/react";
import deleteBooking from "@/libs/deleteBooking";
import { useRouter } from "next/navigation";

export default function BookingList(bookItems:any) {
    const data = bookItems ? bookItems.bookItems as BookingJson : null;
    const {data:session} = useSession();
    const router = useRouter();

    return (
        <div style={{ marginTop: '70px' }}>
            {session && data && data.count > 0 ? (
                (data.data).map((bookItem:any) => (
                    <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2" key={bookItem._id}>
                        <div className="text-xl">Name: {bookItem.user ? bookItem.user.name : null}</div>
                        <div className="text-[0.5em] text-gray-500">{bookItem._id}</div>
                        <div className="text-sm">Hotel: {bookItem.hotel ? bookItem.hotel.name : null}</div>
                        <div className="text-sm">Check-In: {bookItem.checkIn}</div>
                        <div className="text-sm">Check-Out: {bookItem.checkOut}</div>
                        <button
                            className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 
                            text-white shadow-sm"
                            onClick={async () => {await deleteBooking(session?.user.token, bookItem._id); router.refresh()}}
                        >
                            Remove from Booking
                        </button>
                    </div>
                ))
            ) : (
                <div className="text-center">Nothing here.</div>
            )}
        </div>
    );
}
