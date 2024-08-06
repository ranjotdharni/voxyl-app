import React, { useEffect, useState } from 'react'
import FloatingBackground from '../components/FloatingBackground'
import { bakedOrigin } from '../globals'
import { useNavigate } from 'react-router-dom'
import { DEFAULT_MODE, DEFAULT_THEME } from '../theme'
import Navbar from '../components/misc/NavBar'

export const Context = React.createContext<[number, number, () => void | Promise<void>]>([
    DEFAULT_THEME,
    DEFAULT_MODE,
    () => {}
])

function Layout({ children } : { children: string | JSX.Element | JSX.Element[] }) {
    const [theme, setTheme] = useState<number>((localStorage.getItem('theme') !== null ? +localStorage.getItem('theme')! : DEFAULT_THEME))
    const [mode, setMode] = useState<number>((localStorage.getItem('mode') !== null ? +localStorage.getItem('mode')! : DEFAULT_MODE))

    const redirect = useNavigate()
    
    async function Authenticate() {
        await fetch(bakedOrigin + '/v1/auth/access/').then(result => {
            if (result.redirected && result.url.startsWith(bakedOrigin + '/entry'))
            {
                redirect('/entry/login/next=' + encodeURIComponent(window.location.pathname))
            }
        })
    }

    function getTheme() {
        let m = localStorage.getItem('mode')
        let t = localStorage.getItem('theme')
        let mode: number = (m !== null ? +m : DEFAULT_MODE)
        let theme: number = (t !== null ? +t : DEFAULT_THEME)

        setMode(mode)
        setTheme(theme)
    }

    useEffect(() => {
        Authenticate()
    }, [])

    return (
        <Context.Provider value={[theme, mode, getTheme]}>
            <>
                <FloatingBackground muteBackground={false} particles={mode === 0} />
                <Navbar />
                {children}
            </>
        </Context.Provider>
    )
}

export default Layout