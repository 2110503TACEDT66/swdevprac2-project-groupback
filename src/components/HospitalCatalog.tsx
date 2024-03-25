import React, { useState, useEffect } from 'react';
import Card from "./Card";
import { useReducer } from "react";
import Link from 'next/link';
import { HospitalJson } from '../../interface';

export  default async function HospitalCatalog({ hospitalsJson }: { hospitalsJson: Promise<HospitalJson> }) {

    const hospitalsJsonReady = await hospitalsJson;

    return (
        <>
            Explore {hospitalsJsonReady.count} models in our catalog
            <div style={{ margin: "20px", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", alignContent: "space-around" }}>
                {
                    hospitalsJsonReady.data.map((hospital: any) => (
                        <Link key={`/hospital/${hospital.id}`} href={`/hospital/${hospital.id}`} className="w-1/5">
                            <Card hospitalName={hospital.name} imgSrc={hospital.picture}/>
                        </Link>
                    ))
                }
            </div>
        </>
    )
}
