import Link from "next/link";
import styles from './topmenu.module.css'

export default function TopMenuItem({title,pageRef}:{title:string,pageRef:string}){
    return(
        <Link href={pageRef} className="grid grid-cols-1 place-content-center w-[8em] h-full text-sky-600 border-sky-600 border-[0.1em] bg-sky-100
        hover:text-indigo-600 hover:border-indigo-600 hover:bg-indigo-100">
            {title}
        </Link>
    );
}