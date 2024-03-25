"use client"

import getHospitals from "@/libs/getHospitals"
import HospitalCatalog from "@/components/HospitalCatalog"
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"
import CardPanel from "@/components/CardPanel"

export default function hotel(){
    const hotels = getHospitals()

    return(
        <main className="text-center p-5" style={{ marginTop: '70px' }}>
            <h1>Select Your hotel</h1>
            <Suspense fallback = {<p>Loading...<LinearProgress/></p>}> 
            <HospitalCatalog hotelsJson={hotels}/>
            </Suspense>
             
        </main>
    )

}