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

    const getDefaultLocation = () => {
        const urlParams = useSearchParams();
        const nameParam = urlParams.get('name');
    
        if (nameParam) {
            return nameParam;
        } else {
            return 'Chulalongkorn Hotel';
        }
    }

    const [hotel, setHotel] = useState(getDefaultLocation());
    const [checkIn, setCheckIn] = useState<Dayjs | null>(null);
    const [checkOut, setCheckOut] = useState<Dayjs | null>(null);


    const makeBooking = async () => {
        if (session && hotel && checkIn && checkOut) {
            const item: BookingItem = {
                user: session.user._id,
                hotel: hotel,
                checkIn: checkIn.format("YYYY-MM-DDTHH:MM:ss.000Z"),
                checkOut: checkOut.format("YYYY-MM-DDTHH:MM:ss.000Z")
            }
            const response = await addBooking(item, session.user.token);
            console.log(response);

            // dispatch(addBooking(item));

            // setName('');
            // setSurname('');
            // setId('');
            // setHotel('Chula');
            // setBookDate(null);
        }
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
                <div className='text-md text-left text-gray-600'>
                    DatePicker
                </div>
                <LocationDateReserve onDateChange={(value:Dayjs)=>{setCheckIn(value)}} onLocationChange={(value:string)=>{setHotel(value)}}/>
            </div>

            <div className='w-fit space-y-2'>
                <div className='text-md text-left text-gray-600'>
                    DatePicker
                </div>
                <LocationDateReserve onDateChange={(value:Dayjs)=>{setCheckOut(value)}} onLocationChange={(value:string)=>{setHotel(value)}}/>
            </div>

            <button className='block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm' name='Book Vaccine'
            onClick={makeBooking}>
                Book Hotel
            </button>
            
        </main>
    );
}