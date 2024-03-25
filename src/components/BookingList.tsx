import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { removeBooking } from "@/redux/features/bookSlice";
import { ClassNames } from "@emotion/react";

export default function BookingList() {
    const bookItems = useAppSelector((state) => state.bookSlice.bookItems);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div style={{ marginTop: '70px' }}>
            {bookItems.length > 0 ? (
                bookItems.map((bookItem) => (
                    <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2" key={bookItem.id}>
                        <div className="text-xl">Name: {bookItem.name}</div>
                        <div className="text-sm">SurName: {bookItem.surname}</div>
                        <div className="text-sm">ID: {bookItem.id}</div>
                        <div className="text-sm">Hotel: {bookItem.hospital}</div>
                        <div className="text-sm">BookDate: {bookItem.bookDate}</div>
                        <button
                            className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 
                            text-white shadow-sm"
                            onClick={() => dispatch(removeBooking(bookItem.id))}
                        >
                            Remove from Booking
                        </button>
                    </div>
                ))
            ) : (
                <div className="text-center">No Vaccine Booking</div>
            )}
        </div>
    );
}
