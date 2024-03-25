'use client'

import { useWindowListener } from "@/hooks/useWindowListener"
import VlogPlayer from "./VideoPlayer"
import { useState } from "react"

export  default  function  PromoteCard(){
    const [playing,setPlaying] = useState(true)

    useWindowListener("contextmenu",(e)=>(e.preventDefault()));
    return(
        <div className="w-[80%] shadow-lg mx-[10%] my-10 p-2 rounded-lg bg-gray-200 flex flex-row">
            <VlogPlayer vdoSrc="/vdo/getvaccine.mp4" isPlaying={playing}></VlogPlayer>
            <div className="m-2">Get your vaccine today.
                <button className="m-5 block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
                onClick={() => {setPlaying(!playing)}}>
                    {playing? 'Pause':'Play'}
                </button>
            </div>
        </div>

    )
}