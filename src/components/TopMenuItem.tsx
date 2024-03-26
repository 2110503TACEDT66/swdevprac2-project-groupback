import Link from "next/link";
import styles from './topmenu.module.css'

export default function TopMenuItem({title,pageRef}:{title:string,pageRef:string}){
    return(
        <Link href={pageRef} className="w-[8em] h-full border-blue-700 border-2">
            {title}
        </Link>
    );
}