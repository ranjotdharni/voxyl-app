import styles from '../../assets/css/metrics/components/memberMetrics.module.css'
import CSS from 'csstype'
import { themes } from '../../theme'
import { useContext } from 'react'
import { Context } from '../../pages/Layout'

export default function MemberMetrics() {
    const [theme, mode] = useContext(Context)

    const inlineStyles: {[key: string]: CSS.Properties} = {
        "mainContainer": {
            background: themes[mode][theme].boxGradient,
            border: themes[mode][theme].glassBorder
        }
    }

    return (
        <div className={styles.mainContainer} style={inlineStyles.mainContainer}>
            
        </div>
    )
}