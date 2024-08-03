import { useContext } from 'react'
import styles from '../../assets/css/misc/navBar.module.css'
import CSS from 'csstype'
import { Context } from '../../pages/Layout'
import { themes } from '../../theme'
import flagIcon from '../../assets/img/png/flag.png'
import rocketIcon from '../../assets/img/png/rocket.png'
import toolsIcon from '../../assets/img/png/tools.png'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const redirect = useNavigate()
    // @ts-ignore Ignore unused setTheme
    const [selectedTheme, selectedMode, grabTheme] = useContext(Context)

    const inlineStyles: {[key: string]: CSS.Properties} = {
        "mainContainer": {
            background: themes[selectedMode][selectedTheme].boxGradient,
            backdropFilter: themes[selectedMode][selectedTheme].backgroundBlur,
            border: themes[selectedMode][selectedTheme].glassBorder
        }
    }

    function NavIcon({ src, link } : { src: string, link: string }) {
        return (
            <div className={styles.iconContainer}>
                <img onClick={() => { redirect(link) }} src={src} />
            </div>
        )
    }

    // Keep Nav Icons in order of their tooltiptext set in related CSS file
    return (
        <div className={styles.mainContainer} style={inlineStyles.mainContainer}>
            <div className={styles.linkContainer}>
                <NavIcon src={flagIcon} link='/teams' />
                <NavIcon src={rocketIcon} link='/project/launch' />
                <NavIcon src={toolsIcon} link='/settings' />
            </div>
        </div>
    )
}