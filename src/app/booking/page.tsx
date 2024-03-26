"use client"
import styles from './booking.module.css'
import LocationDateReserve from '@/components/DateReserve';
import { useSearchParams } from 'next/navigation';
import { TextField } from "@mui/material";
//import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import getUserProfile from '@/libs/getUserProfile';
import { useState , ChangeEventHandler} from 'react';
import { Dayjs } from 'dayjs';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { BookingItem } from '../../../interface';
import addBooking from '@/libs/addBooking';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import dayjs from 'dayjs';


export default function Booking() {
    const { data:session } = useSession();

    //const session = await getServerSession(authOptions)
    //if(!session || !session.user.token) return null

    //const profile = await getUserProfile(session.user.token)
    //var createdAt = new Date(profile.data.createdAt)

    const dispatch = useDispatch<AppDispatch>();

    // const getDefaultLocation = () => {
    //     const urlParams = useSearchParams();
    //     const nameParam = urlParams.get('name');
    
    //     if (nameParam) {
    //         return nameParam;
    //     } else {
    //         return 'Chulalongkorn Hotel';
    //     }
    // }

    const [hotel, setHotel] = useState(useSearchParams().get("id") || null);
    const [checkIn, setCheckIn] = useState<Dayjs | null>(null);
    const [checkOut, setCheckOut] = useState<Dayjs | null>(null);


    const makeBooking = async () => {
        if (session && hotel && checkIn && checkOut) {
            const submitButton = document.getElementById("submitButton");
            if (!submitButton) throw new Error("submit button has gone AWOL. how'd that even happen?");
            const item: BookingItem = {
                user: session.user._id,
                hotel: hotel,
                checkIn: checkIn.format("YYYY-MM-DDTHH:MM:ss.000Z"),
                checkOut: checkOut.format("YYYY-MM-DDTHH:MM:ss.000Z")
            }
            submitButton.innerText = "Booking..."
            submitButton.classList.remove("bg-sky-600", "bg-red-600", "bg-green-600");
            submitButton.classList.add("bg-gray-200");
            const response = await addBooking(item, session.user.token);
            submitButton.classList.remove("bg-gray-200")
            if(!(response.success || response.seccess)){ //success intentionally misspelt
                    submitButton.innerText = "Failed.";
                    submitButton.classList.add("bg-red-600");
            } else {
                submitButton.innerText = "Booked!";
                submitButton.classList.add("bg-green-600");
            }
        }

            // dispatch(addBooking(item));

            // setName('');
            // setSurname('');
            // setId('');
            // setHotel('Chula');
            // setBookDate(null);
        }

    const handleHotelChange : ChangeEventHandler<HTMLInputElement> = (event) => {
        setHotel(event.target.value); 
    };
    
    return(
        <main className='w-[100%] flex flex-col items-center space-y-4 m-5 p-5' style={{ marginTop: '70px' }}>
            
            <div className = "text-x1 front-medium" >Hotel Booking</div>

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

            <div className='w-fit space-y-2'>
                <div className='text-md text-left mt-[1em] text-gray-600'>
                    Check-In Time
                </div>
                <LocationDateReserve onDateChange={(value:Dayjs)=>{setCheckIn(value)}} onLocationChange={(value:string)=>{setHotel(value)}}/>
            </div>

            <div className='w-fit space-y-2'>
                <div className='text-md text-left text-gray-600'>
                    Check-Out Time
                </div>
                <LocationDateReserve onDateChange={(value:Dayjs)=>{setCheckOut(value)}} onLocationChange={(value:string)=>{setHotel(value)}}/>
            </div>

            <button id="submitButton" className='block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm' name='Book Vaccine'
            onClick={makeBooking}>
                Book Hotel
            </button>
            
        </main>
    );
}