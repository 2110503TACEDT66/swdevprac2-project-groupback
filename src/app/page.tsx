import styles from './page.module.css'
import Banner from '../components/Banner';

export default function Home() {
  return (
    //<h1 className="text-sm bg-blue-500">Hello</h1>
    <main className={styles.main}>
      <Banner />
      
    </main>
  );
}
