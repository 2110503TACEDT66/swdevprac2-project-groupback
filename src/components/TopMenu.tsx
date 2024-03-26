import styles from './topmenu.module.css'
import Image from 'next/image'
import TopMenuItem from './TopMenuItem'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Link from 'next/link'

export default async function TopMenu(){
    
    const session = await getServerSession(authOptions)

    return(
        <div className={styles.munucontainer}>
            <Image src={'/img/logo.png'} className={styles.logoimg} alt='logo' 
            width={0} height={0} sizes='100vh'/>
            <div className='flex flex-row absolute left-0 top-0 h-full text-center align-center'>
                
            {
                session?
                <div className="flex flex-row h-full">
                    <TopMenuItem title={session.user?.name} pageRef="/api/auth/signout"/>
                    <TopMenuItem title='My Booking' pageRef='/mybooking'/>
                    <TopMenuItem title='Book a reservation' pageRef='/booking'/>
                </div>
                :
                <TopMenuItem title="Sign In" pageRef="/api/auth/signin"/>
            }
            </div>
        </div>
    )
}