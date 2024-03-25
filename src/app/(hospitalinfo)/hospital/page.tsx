"use client"

import getHospitals from "@/libs/getHospitals"
import HospitalCatalog from "@/components/HospitalCatalog"
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"
import CardPanel from "@/components/CardPanel"

export default function hospital(){
    const hospitals = getHospitals()

    return(
        <main className="text-center p-5" style={{ marginTop: '70px' }}>
            <h1>Select Your hospital</h1>
            <Suspense fallback = {<p>Loading...<LinearProgress/></p>}> 
            <HospitalCatalog hospitalsJson={hospitals}/>
            </Suspense>
             
        </main>
    )

}