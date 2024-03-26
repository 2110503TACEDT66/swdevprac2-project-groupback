import React, { useState, useEffect } from 'react';
import Card from "./Card";
import Link from 'next/link';
import { HotelJson } from '../../interface';

export  default async function HotelCatalog({ hotelsJson }: { hotelsJson: Promise<HotelJson> }) {

    const [hotelResponse, setHotelsResponse] = useState<HotelJson | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const hotels = await hotelsJson;
                setHotelsResponse(hotels);
            } catch (error) {
                console.error('Error fetching hotels:', error);
            }
        };
        fetchData();
    }, [hotelsJson]);

    const [ratings, setRatings] = useState<{[key: string]: number}>({});

    const setRating = (hotelName: string, rating: number) => {
        setRatings(prevRatings => ({
            ...prevRatings,
            [hotelName]: rating
        }));
    };

    if (!hotelResponse) {
        return <div>Loading...</div>;
    }



    return (
        <>
            Explore {hotelResponse.count} places in our catalog
            <div style={{ margin: "20px", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", alignContent: "space-around" }}>
            {hotelResponse.data.map((hotel: any) => (
                <Link key={`/hotel/${hotel.id}`} href={`/hotel/${hotel.id}`} passHref>
                <Card hotelName={hotel.name} initialRating={hotel.rating || 0.1} setRating={setRating}/>
                </Link>
                ))}
            </div>
        </>
    );
};