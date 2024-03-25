"use client"
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Select,MenuItem,TextField  } from "@mui/material";
import { useState } from "react";
import {Dayjs} from "dayjs";

export default function LocationDateReserve({onDateChange,onLocationChange}:{onDateChange:Function,onLocationChange:Function}){
    
    const getDefaultLocation = () => {
        return 'Chula';
    }

    const [reserveDate,setReserveDate] = useState<Dayjs|null>(null)
    const [location, setLocation] = useState(getDefaultLocation());
    
    return(
        <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 w-fit px-10 py-5 flex flex-row justify-center ">

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="bg-white "
                value={reserveDate}
                onChange={(value)=>{setReserveDate(value);onDateChange(value)}}
                />
            </LocalizationProvider>

            <Select variant="standard" name="location" id="location" className="h-[2em] w-[200px] "
            value={location} onChange={(e)=>{setLocation(e.target.value);onLocationChange(e.target.value)}}>
                <MenuItem value="Chula">Chulalongkorn Hospital</MenuItem>
                <MenuItem value="Rajavithi">Rajavithi Hospital </MenuItem>
                <MenuItem value="Thammasat">Thammasat University Hospital</MenuItem>

            </Select>
        </div>
    );
}