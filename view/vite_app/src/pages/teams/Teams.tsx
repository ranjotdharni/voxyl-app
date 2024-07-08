import styles from '../../assets/css/teams/teams.module.css'
import TeamsView from '../../components/teams/TeamsView'
import TeamsCreate from '../../components/teams/TeamsCreate'
import TeamsAdd from '../../components/teams/TeamsAdd'

export default function Teams() {
    return (
        <>
            <section className={styles.mainWrapper}>
                <TeamsView />
                <TeamsCreate />
                <TeamsAdd />
            </section>
        </>
    )
}