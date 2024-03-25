
import React, { useState } from 'react';
import styles from './card.module.css'
import Image from 'next/image';
import InteractionCard from './InteractiveCard';
import Rating from '@mui/material/Rating';

export default function Card({ hotelName, imgSrc, setRating, initialRating }: { hotelName: string, imgSrc: string, setRating?: Function, initialRating?: number }) {
  const [ratingValue, setRatingValue] = useState<number | undefined | null>(initialRating);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number | null) => {
    setRatingValue(newValue);
    if (setRating) setRating(hotelName, newValue);
  };
    
  return (
    <InteractionCard contentName={hotelName}>
      <div className='w-full h-[70%] relative rounded-t-lg '>
        <Image src={imgSrc}  alt="card p"  fill = {true} className='object-cover rounded-t-lg'
        />
      </div>
      <div className='w-full h-[20%] p-[10px]'>
        {hotelName}
      </div>
      <div className='block h-[10%] shadow-sm rating-horizontal'>
        
        {setRating && initialRating && <Rating
          onClick={(e)=>{e.stopPropagation();}}
          id={`${hotelName} Rating`}
          name={`${hotelName} Rating`}
          data-testid={`${hotelName} Rating`}
          value={ratingValue}
          onChange={handleChange}
        />}
        
      </div>
    </InteractionCard>
  );
};
