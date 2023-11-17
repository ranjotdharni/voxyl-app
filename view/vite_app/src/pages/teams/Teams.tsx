import styles from '../../assets/css/teams/teams.module.css'
import Scrollbar from '../../components/Scrollbar'
import TeamsCreateView from '../../components/teams/TeamsCreateView'
import TeamsEditView from '../../components/teams/TeamsEditView'
import TeamsSearchView from '../../components/teams/TeamsSearchView'
import { useRef } from 'react'

export default function Teams() {
    const scrollRef = useRef<HTMLElement>(null)

    return (
        <>
        <Scrollbar scrollRef={scrollRef} />
        <section ref={scrollRef} className={styles.mainWrapper}>
            <TeamsCreateView />
            <TeamsEditView />
            <TeamsSearchView />
        </section>
        </>
    )
}