import React, { useEffect, useState } from 'react';
import FloatingBackground from '../components/FloatingBackground';
import { bakedOrigin, fetchToApi } from '../globals';
import { useNavigate } from 'react-router-dom';

export const Context = React.createContext<[number, () => void | Promise<void>]>([
    0,
    () => {}
])

function Layout({ children } : { children: string | JSX.Element | JSX.Element[] }) {
    const [theme, setTheme] = useState<number>(0)

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
            }
            else if (response.theme) {
                setTheme(response.theme)
            }
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
        <Context.Provider value={[theme, getTheme]}>
            <>
                <FloatingBackground />
                {children}
            </>
        </Context.Provider>
    )
}

export default Layout