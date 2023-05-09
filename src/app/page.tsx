import styles from './page.module.css'
import {CountryTable} from "./components/CountryTable";


export default function Home() {
  return (
    <main className={styles.main}>
      <CountryTable/>
    </main>
  )
}
