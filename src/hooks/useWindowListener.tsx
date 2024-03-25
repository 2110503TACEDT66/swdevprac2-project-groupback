'use client'
import {useEffect, useState } from "react"

export function useWindowListener(eventType:string,listener:EventListener){
    
    
    useEffect(()=>{
        const handleEvent = (event: Event) => {
            event.preventDefault();
            listener(event);
        };
        
        window.addEventListener(eventType,listener)

        return ()=>{
            window.removeEventListener(eventType,listener)
        }
    }, [eventType, listener])
}