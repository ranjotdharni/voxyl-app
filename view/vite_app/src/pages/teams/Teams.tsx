import styles from '../../assets/css/teams/teams.module.css'
import Scrollbar from '../../components/Scrollbar'
import TeamsView from '../../components/teams/TeamsView'
import TeamsCreate from '../../components/teams/TeamsCreate'
import TeamsAdd from '../../components/teams/TeamsAdd'
import { useRef } from 'react'

export default function Teams() {
    const scrollRef = useRef<HTMLElement>(null)

    return (
        <>
        <Scrollbar scrollRef={scrollRef} />
        <section ref={scrollRef} className={styles.mainWrapper}>
            <TeamsView />
            <TeamsCreate />
            <TeamsAdd />
        </section>
        </>
    )
}