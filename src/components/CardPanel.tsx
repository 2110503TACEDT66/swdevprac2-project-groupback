"use client"

import React, { useState } from 'react';
import Card from "./Card";
import { useReducer, useEffect} from "react";
import Link from 'next/link';
import getHospitals from '@/libs/getHospitals';

export default function CardPanel(){

    const [hospitalResponse,setHospitalsResponse] = useState(null)

    useEffect(()=>{
        const fetchData = async () => {
            const hospitals = await getHospitals()
            setHospitalsResponse(hospitals)
        }
        fetchData()
    },[])

    const compareReducer = ( compareList:Set<string>,action:{type:string,hospitalName:string})=>{
        switch(action.type){
            case 'add':{
                return new Set(compareList.add(action.hospitalName))
            }
            case 'remove':{
                compareList.delete(action.hospitalName)
                return new Set(compareList)
            }
            default:return compareList
        }
    }

    const [compareList,dispatchCompare] = useReducer(compareReducer,new Set<string>())
    const [ratings, setRatings] = useState<{[key: string]: number}>({});

    const setRating = (hospitalName: string, rating: number) => {
        setRatings(prevRatings => ({
            ...prevRatings,
            [hospitalName]: rating
        }));
        dispatchCompare({type:'add', hospitalName: hospitalName});
    }

    //MOCK DATA    
    /*const hospitalRepo = [
        {hid:"001",name:"Chulalongkorn Hospital",image:'/img/chula.jpg'}
        ,{hid:"002",name:"Rajavithi Hospital",image:'/img/rajavithi.jpg'}
        ,{hid:"003",name:"Thammasat University Hospital",image:'/img/thammasat.jpg'}
    ]*/

    if(!hospitalResponse) return <div>Hospital Panel is Loading...</div>;


    return(
        <div>
            <div style={{margin:"20px",display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"space-around",alignContent:"space-around"}}>
                {
                    /*hospitalResponse.data.map((hospital:object)=>(
                        <Link key={hospital.id} href={`/hospital/${hospital.hid}`} className="w-1/5">
                            <Card hospitalName={hospital.name} imgSrc={hospital.picture} initialRating={5}
                            setRating={setRating}/>
                        </Link>
                    ))*/
                }
            </div>
            <div className="w-full text-xl font-medium">Compare List:{compareList.size}
                {Array.from(compareList).map((hospital)=>
                <div key={hospital} data-testid={`${hospital}`} onClick={() => dispatchCompare({ type: "remove", hospitalName: hospital })}>
                    {hospital} Rating: {ratings[hospital] || 'Not Rated'} 
                </div>)}
            </div>
        </div>
    );
}
