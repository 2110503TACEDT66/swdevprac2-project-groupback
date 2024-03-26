import { createSlice ,PayloadAction} from "@reduxjs/toolkit";
import { BookingItem } from "../../../interface";

type BookState = {
    bookItems:BookingItem[]
}

const initialState:BookState = {bookItems:[]}

export const bookSlice = createSlice({
    name:"booking",
    initialState,
    reducers:{
        addBooking : async (state,action:PayloadAction<BookingItem>)=>{
            console.log(action.payload);
            await fetch(`${process.env.BACKEND}/api/v1/hotels/${action.payload.hotel}`)
        },
        removeBooking : (state,action:PayloadAction<string>)=>{
            state.bookItems = state.bookItems.filter(item => item.id !== action.payload);
        }
    }
})

export const {addBooking,removeBooking} = bookSlice.actions
export default bookSlice.reducer