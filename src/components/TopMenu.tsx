import styles from './topmenu.module.css'
import Image from 'next/image'
import TopMenuItem from './TopMenuItem'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { headers } from "next/headers";

export default async function TopMenu(){
    const session = await getServerSession(authOptions)
    const headersList = headers();
    console.log(headersList.get("next-url"));

    return(
        <div className={styles.munucontainer}>
            <div className='flex flex-row absolute left-0 top-0 w-[50%] h-full text-center align-center'>
            {
                session?
                <div className="flex flex-row h-full">
                    <TopMenuItem title={session.user?.name} pageRef={"/api/auth/signout?callbackUrl=/"}/>
                    <TopMenuItem title='My Bookings' pageRef='/mybooking'/>
                    <TopMenuItem title='Book Hotel' pageRef='/booking'/>
                </div>
                :
                <div className="flex flex-row h-full">
                    <TopMenuItem title="Sign In" pageRef="/api/auth/signin?callbackUrl=/"/>
                    <TopMenuItem title="Register" pageRef="/newuser"/>
                </div>
            }
            </div>
            <div className='flex flex-row-reverse absolute right-0 top-0 w-[50%] h-full text-center align-center'>
            <Image src={'/img/logo2.png'} className={styles.logoimg} alt='logo' 
            width={0} height={0} sizes='100vh'/>
            <TopMenuItem title="Home" pageRef="/"/>
            <TopMenuItem title="Hotels" pageRef="/hotel"/>
            </div>
        </div>
    )
}