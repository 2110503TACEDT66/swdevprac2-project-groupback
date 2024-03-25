import React, { useState, useEffect } from 'react';
import Card from "./Card";
import { useReducer } from "react";
import Link from 'next/link';
import { HotelJson } from '../../interface';

export  default async function HotelCatalog({ hotelsJson }: { hotelsJson: Promise<HotelJson> }) {

    const hotelsJsonReady = await hotelsJson;

    return (
        <>
            Explore {hotelsJsonReady.count} models in our catalog
            <div style={{ margin: "20px", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", alignContent: "space-around" }}>
                {
                    hotelsJsonReady.data.map((hotel: any) => (
                        <Link key={`/hotel/${hotel.id}`} href={`/hotel/${hotel.id}`} className="w-1/5">
                            <Card hotelName={hotel.name} imgSrc={hotel.picture}/>
                        </Link>
                    ))
                }
            </div>
        </>
    )
}
