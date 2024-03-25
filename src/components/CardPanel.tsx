"use client"

import React, { useState } from 'react';
import Card from "./Card";
import { useReducer, useEffect} from "react";
import Link from 'next/link';
import getHospitals from '@/libs/getHospitals';

export default function CardPanel(){

    const [hotelResponse,setHospitalsResponse] = useState(null)

    useEffect(()=>{
        const fetchData = async () => {
            const hotels = await getHospitals()
            setHospitalsResponse(hotels)
        }
        fetchData()
    },[])

    const compareReducer = ( compareList:Set<string>,action:{type:string,hotelName:string})=>{
        switch(action.type){
            case 'add':{
                return new Set(compareList.add(action.hotelName))
            }
            case 'remove':{
                compareList.delete(action.hotelName)
                return new Set(compareList)
            }
            default:return compareList
        }
    }

    const [compareList,dispatchCompare] = useReducer(compareReducer,new Set<string>())
    const [ratings, setRatings] = useState<{[key: string]: number}>({});

    const setRating = (hotelName: string, rating: number) => {
        setRatings(prevRatings => ({
            ...prevRatings,
            [hotelName]: rating
        }));
        dispatchCompare({type:'add', hotelName: hotelName});
    }

    //MOCK DATA    
    /*const hotelRepo = [
        {hid:"001",name:"Chulalongkorn Hospital",image:'/img/chula.jpg'}
        ,{hid:"002",name:"Rajavithi Hospital",image:'/img/rajavithi.jpg'}
        ,{hid:"003",name:"Thammasat University Hospital",image:'/img/thammasat.jpg'}
    ]*/

    if(!hotelResponse) return <div>Hospital Panel is Loading...</div>;


    return(
        <div>
            <div style={{margin:"20px",display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"space-around",alignContent:"space-around"}}>
                {
                    /*hotelResponse.data.map((hotel:object)=>(
                        <Link key={hotel.id} href={`/hotel/${hotel.hid}`} className="w-1/5">
                            <Card hotelName={hotel.name} imgSrc={hotel.picture} initialRating={5}
                            setRating={setRating}/>
                        </Link>
                    ))*/
                }
            </div>
            <div className="w-full text-xl font-medium">Compare List:{compareList.size}
                {Array.from(compareList).map((hotel)=>
                <div key={hotel} data-testid={`${hotel}`} onClick={() => dispatchCompare({ type: "remove", hotelName: hotel })}>
                    {hotel} Rating: {ratings[hotel] || 'Not Rated'} 
                </div>)}
            </div>
        </div>
    );
}
