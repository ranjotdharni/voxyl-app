import React, { useEffect, useState } from 'react';
import FloatingBackground from '../components/FloatingBackground';
import { bakedOrigin, fetchToApi } from '../globals';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_MODE, DEFAULT_THEME } from '../theme';
import Loader from '../components/misc/Loader';
import Navbar from '../components/misc/NavBar';

export const Context = React.createContext<[number, number, () => void | Promise<void>]>([
    DEFAULT_THEME,
    DEFAULT_MODE,
    () => {}
])

function Layout({ children } : { children: string | JSX.Element | JSX.Element[] }) {
    const [theme, setTheme] = useState<number>(DEFAULT_THEME)
    const [mode, setMode] = useState<number>(DEFAULT_MODE)
    const [loader, setLoader] = useState<boolean>(true)

    const redirect = useNavigate()
    
    async function Authenticate() {
        await fetch(bakedOrigin + '/v1/auth/access/').then(result => {
            if (result.redirected && result.url.startsWith(bakedOrigin + '/entry'))
            {
                redirect('/entry/login/next=' + encodeURIComponent(window.location.pathname))
            }
        })
    }

    async function getTheme() {
        await fetchToApi('/v1/teams/theme/', 'GET', []).then(response => {
            if (response.error) {
                console.log(response.error)
                setTheme(0)
                setMode(0)
            }
            else if (response.success) {
                setTheme(response.theme)
                setMode(response.mode)
            }

            setLoader(false)
        })
    }

    async function init() {
        await Authenticate().then(() => {
            getTheme()
        })
    }

    useEffect(() => {
        init()
    }, [])

    return (
        <Context.Provider value={[theme, mode, getTheme]}>
            <>
                <FloatingBackground muteBackground={loader} particles={mode === 0} />
                <Navbar />
                {loader ? <Loader /> : children}
            </>
        </Context.Provider>
    )
}

export default Layout