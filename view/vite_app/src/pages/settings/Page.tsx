import styles from '../../assets/css/settings/settings.module.css'
import ThemeEdit from '../../components/settings/ThemeEdit'
import Layout from '../Layout'

export default function SettingsPage() {

    return (
        <Layout>
            <section className={styles.mainContainer}>
                <ThemeEdit />
            </section>
        </Layout>
    )
}