import styles from '../../assets/css/teams/teams.module.css'
import TeamsCreateView from '../../components/teams/TeamsCreateView'
import TeamsEditView from '../../components/teams/TeamsEditView'
import TeamsSearchView from '../../components/teams/TeamsSearchView'

export default function Teams() {
    return (
        <section className={styles.mainWrapper}>
            <TeamsCreateView />
            <TeamsEditView />
            <TeamsSearchView />
        </section>
    )
}