'use client'
import {useState} from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './banner.module.css';
import {useSession} from 'next-auth/react'

export default function Banner () {
  const covers =['/img/cover5.jpg','/img/cover6.jpg','/img/cover7.jpg','/img/cover8.jpg']
  const [index,setIndex] = useState(0)
  const router = useRouter();

  const {data:session} = useSession()

  return (
    <div className={styles.banner} onClick={()=>{setIndex(index+1);}}>
      <Image 
        src={covers[index%4]} 
        alt="background" 
        fill = {true}
        style={{objectFit:'cover'}}
        
      />
      <div className={styles.bannerText}>
        <h1>Hotel booking</h1>
        <h3>Work in progress</h3>
      </div>
      {
        session? <div className='z-30 absolute top-5 right-10 font-semibold text-cyan-800 text-x1'>
          Welcome {session.user?.name}</div>
          :null
      }
      <button className='bg-white text-cyan-600 border border-cyan-600 
      font-semibold py-2 px-2 m-2 rounded z-30 absolute bottom-0 right-0
      hover:bg-cyan-600 hover:text-white hover:border-transparent'
      onClick={(e)=>{e.stopPropagation();router.push('/hotel')}}>
        Select Hotel
      </button>
    </div>
  );
};


