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
import { addBooking } from '@/redux/features/bookSlice';
import dayjs from 'dayjs';


export default function Booking() {

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

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [id, setId] = useState('');
    const [hotel, setHotel] = useState(getDefaultLocation());
    const [bookDate, setBookDate] = useState<Dayjs | null>(null);

    const handleNameChange : ChangeEventHandler<HTMLInputElement> = (event) => {
        setName(event.target.value); 
    };
    const handleSurnameChange : ChangeEventHandler<HTMLInputElement> = (event) => {
        setSurname(event.target.value); 
    };
    const handleIdChange : ChangeEventHandler<HTMLInputElement> = (event) => {
        setId(event.target.value); 
    };

    const makeBooking = () => {
        if (hotel && bookDate) {
            const item: BookingItem = {
                name: name,
                surname: surname,
                id: id,
                hotel: hotel,
                bookDate: bookDate?.format("YYYY/MM/DD")
            }
            dispatch(addBooking(item));

            setName('');
            setSurname('');
            setId('');
            setHotel('Chula');
            setBookDate(null);
        }
    }
    
    return(
        <main className='w-[100%] flex flex-col items-center space-y-4 m-5 p-5' style={{ marginTop: '70px' }}>
            
            <div className = "text-x1 front-medium" >Vaccine Booking</div>

            <TextField
                id="name"
                label="Name"
                variant="standard"
                name="Name"
                fullWidth
                margin="normal"
                className="h-[2em] w-[200px]"
                value={name}
                onChange={handleNameChange}
            />

            <TextField
                id="lastname"
                label="Lastname"
                variant="standard"
                name="Lastname"
                fullWidth
                margin="normal"
                className="h-[2em] w-[200px]"
                value={surname}
                onChange={handleSurnameChange}
            />

            <TextField
                id="citizen-id"
                label="Citizen ID"
                variant="standard"
                name="Citizen ID"
                fullWidth
                margin="normal"
                className="h-[2em] w-[200px]"
                value={id}
                onChange={handleIdChange}
            />

            <div className='w-fit space-y-2'>
                <div className='text-md text-left text-gray-600'>
                    DatePicker
                </div>
                <LocationDateReserve onDateChange={(value:Dayjs)=>{setBookDate(value)}} onLocationChange={(value:string)=>{setHotel(value)}}/>
            </div>
            <button className='block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm' name='Book Vaccine'
            onClick={makeBooking}>
                Book Vaccine
            </button>
            
        </main>
    );
}