import styles from '../../assets/css/settings/settings.module.css'
import ThemeEdit from '../../components/settings/ThemeEdit'

export default function Settings() {

    return (
        <section className={styles.mainContainer}>
            <ThemeEdit />
        </section>
    )
}