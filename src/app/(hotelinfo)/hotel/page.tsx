"use client"
import getHotels from "@/libs/getHotels"
import HotelCatalog from "@/components/HotelCatalog"
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"

export default function hotel(){
    const hotels = getHotels()

    return(
        <main className="text-center p-5" style={{ marginTop: '70px' }}>
            <h1>Select Your hotel</h1>
            <Suspense fallback = {<p>Loading...<LinearProgress/></p>}> 
            <HotelCatalog hotelsJson={hotels}/>
            </Suspense>   
        </main>
    )

}