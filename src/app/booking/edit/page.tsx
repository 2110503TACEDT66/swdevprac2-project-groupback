"use client"
import LocationDateReserve from '@/components/DateReserve';
import { useSearchParams } from 'next/navigation';
import { TextField } from "@mui/material";
import { useState , ChangeEventHandler} from 'react';
import { Dayjs } from 'dayjs';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { BookingItem } from '../../../../interface';
import addBooking from '@/libs/addBooking';
import { useSession } from 'next-auth/react';
import editBooking from '@/libs/editBooking';


export default function Booking() {
    const { data:session } = useSession();
    const [booking, setBooking] = useState(useSearchParams().get("id") || "");
    const [hotel, setHotel] = useState(useSearchParams().get("hotel") || "");
    const [checkIn, setCheckIn] = useState<Dayjs | null>(null);
    const [checkOut, setCheckOut] = useState<Dayjs | null>(null);


    const handleEditBooking = async () => {
        if (session && booking && hotel && checkIn && checkOut) {
            const submitButton = document.getElementById("submitButton");
            if (!submitButton) throw new Error("submit button has gone AWOL. how'd that even happen?");
            const item: BookingItem = {
                user: booking,
                hotel: hotel,
                checkIn: checkIn.format("YYYY-MM-DDTHH:MM:ss.000Z"),
                checkOut: checkOut.format("YYYY-MM-DDTHH:MM:ss.000Z")
            }
            submitButton.innerText = "Editing..."
            submitButton.classList.remove("bg-sky-600", "bg-red-600", "bg-green-600");
            submitButton.classList.add("bg-gray-200");
            const response = await editBooking(item, session.user.token);
            submitButton.classList.remove("bg-gray-200")
            if(!(response.success || response.seccess)){
                    submitButton.innerText = "Failed.";
                    submitButton.classList.add("bg-red-600");
            } else {
                submitButton.innerText = "Edited!";
                submitButton.classList.add("bg-green-600");
            }
        }
    }

    const handleBookingChange : ChangeEventHandler<HTMLInputElement> = (event) => {
        setBooking(event.target.value); 
    };
    const handleHotelChange : ChangeEventHandler<HTMLInputElement> = (event) => {
        setHotel(event.target.value); 
    };
    
    return(
        <main className='w-[100%] flex flex-col items-center space-y-4 m-5 p-5' style={{ marginTop: '70px' }}>
            
            <div className = "text-x1 front-medium" >Hotel Booking</div>

            <div className='m-[0.2em]'>
            <TextField
                id="booking"
                label="Booking ID"
                variant="standard"
                name="booking_id"
                fullWidth
                margin="normal"
                className="h-[2em] w-[200px]"
                value={booking}
                onChange={handleBookingChange}
            />
            </div>

            <div className='m-[0.2em]'>
            <TextField
                id="hotel"
                label="Hotel ID"
                variant="standard"
                name="hotel_id"
                fullWidth
                margin="normal"
                className="h-[2em] w-[200px]"
                value={hotel}
                onChange={handleHotelChange}
            />
            </div>

            <div className='w-fit space-y-2'>
                <div className='text-md text-left mt-[1em] text-gray-600'>
                    Check-In Time
                </div>
                <LocationDateReserve onDateChange={(value:Dayjs)=>{setCheckIn(value)}}/>
            </div>

            <div className='w-fit space-y-2'>
                <div className='text-md text-left text-gray-600'>
                    Check-Out Time
                </div>
                <LocationDateReserve onDateChange={(value:Dayjs)=>{setCheckOut(value)}}/>
            </div>

            <button id="submitButton" className='block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm' name='Book Vaccine'
            onClick={handleEditBooking}>
                Edit Booking
            </button>
            
        </main>
    );
}