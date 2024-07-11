import styles from '../../assets/css/teams/teams.module.css'
import TeamsView from '../../components/teams/TeamsView'
import TeamsCreate from '../../components/teams/TeamsCreate'
import TeamsAdd from '../../components/teams/TeamsAdd'
import { useState } from 'react'

export default function Teams() {
    const [fetch, setFetch] = useState<boolean>(false)

    function triggerFetch() {
        setFetch(!fetch)
    }

    return (
        <>
            <section className={styles.mainWrapper}>
                <TeamsView fetch={fetch} triggerFetch={triggerFetch}/>
                <TeamsCreate fetch={fetch} triggerFetch={triggerFetch}/>
                <TeamsAdd fetch={fetch} triggerFetch={triggerFetch}/>
            </section>
        </>
    )
}