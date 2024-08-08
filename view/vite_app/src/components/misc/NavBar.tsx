import { MouseEvent, useContext, useState } from 'react'
import styles from '../../assets/css/misc/navBar.module.css'
import CSS from 'csstype'
import { Context } from '../../pages/Layout'
import { themes } from '../../theme'
import statsIcon from '../../assets/img/png/pie.png'
import flagIcon from '../../assets/img/png/flag.png'
import rocketIcon from '../../assets/img/png/rocket.png'
import toolsIcon from '../../assets/img/png/tools.png'
import { useNavigate } from 'react-router-dom'
import { IoMenuSharp } from 'react-icons/io5'

export default function Navbar() {
    const redirect = useNavigate()
    const [selectedTheme, selectedMode] = useContext(Context)
    const [isOpen, setOpen] = useState<boolean>(false)

    const inlineStyles: {[key: string]: CSS.Properties} = {
        "mainContainer": {
            background: themes[selectedMode][selectedTheme].boxGradient,
            backdropFilter: themes[selectedMode][selectedTheme].backgroundBlur,
            border: themes[selectedMode][selectedTheme].glassBorder
        },
        "toggle": {
            background: themes[selectedMode][selectedTheme].boxGradient,
            boxShadow: themes[selectedMode][selectedTheme].glassShadow,
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

    function openNav(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        setOpen(true)
    }

    document.addEventListener('click', (e: globalThis.MouseEvent) => {
        if (isOpen && e.clientX > 60)
            setOpen(false)
    })

    // Keep Nav Icons in order of their tooltiptext set in related CSS file
    return (
        <>
            <button onClick={openNav} className={styles.toggle} style={inlineStyles.toggle} tabIndex={0}>
                <IoMenuSharp size={18} color={themes[selectedMode][selectedTheme].primary.subheader} />
            </button>
            <div className={[styles.mainContainer, isOpen ? styles.open : ''].join(' ')} style={inlineStyles.mainContainer}>
                <div className={styles.linkContainer}>
                    <NavIcon src={statsIcon} link='/metrics' />
                    <NavIcon src={flagIcon} link='/teams' />
                    <NavIcon src={rocketIcon} link='/project/launch' />
                    <NavIcon src={toolsIcon} link='/settings' />
                </div>
            </div>
        </>
    )
}