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
            <div className='flex flex-row absolute left-0 top-0 w-[50%] h-full text-center align-center'>
            {
                session?
                <div className="flex flex-row h-full">
                    <TopMenuItem title={session.user?.name} pageRef="/api/auth/signout"/>
                    <TopMenuItem title='My Booking' pageRef='/mybooking'/>
                    <TopMenuItem title='Book Hotel' pageRef='/booking'/>
                </div>
                :
                <TopMenuItem title="Sign In" pageRef="/api/auth/signin"/>
            }
            </div>
            <div className='flex flex-row-reverse absolute right-0 top-0 w-[50%] h-full text-center align-center'>
            <Image src={'/img/logo.png'} className={styles.logoimg} alt='logo' 
            width={0} height={0} sizes='100vh'/>
            <TopMenuItem title="Home" pageRef="/"/>
            <TopMenuItem title="Hotels" pageRef="/hotel"/>
            </div>
        </div>
    )
}