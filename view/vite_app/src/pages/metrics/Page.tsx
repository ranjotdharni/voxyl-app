import Layout from "../Layout"
import styles from '../../assets/css/metrics/page.module.css'
import ProjectMetrics from "../../components/metrics/ProjectMetrics"
import MemberMetrics from "../../components/metrics/MemberMetrics"
import CSS from 'csstype'
import { themes } from "../../theme"
import { useContext } from "react"
import { Context } from "../Layout"

function MetricsHeader() {
    const [theme, mode] = useContext(Context)

    const inlineStyles: {[key: string]: CSS.Properties} = {
        "headerWrapper": {
            background: themes[mode][theme].backgroundContrast
        },
        "header": {
            color: themes[mode][theme].glowBase,
            textShadow: themes[mode][theme].glowLight
        }
    }
    
    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerWrapper} style={inlineStyles.headerWrapper}>
                <p className={styles.header} style={inlineStyles.header}>Metrics</p>
            </div>
        </div>
    )
}

export default function MetricsPage() {
    return (
        <Layout>
            <section className={styles.mainContainer}>
                <MetricsHeader />
                <div className={styles.contentContainer}>
                    <ProjectMetrics />
                    <MemberMetrics />
                </div>
            </section>
        </Layout>
    )
}