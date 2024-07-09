import React, { useEffect } from "react";
import { useState } from "react";

// Neon Constants
const jadeGlowBase: string = '#caeddd'
const jadeGlowTheme: string = '#127a6a'

// Keep items in alphabetical order
export interface Theme {
    bubbles: {
        start: string,
        middle: string,
        stop: string
    },
    background: string,
    glowLight: string,
    glowBase: string,
    highlightedBackground: {
        start: string,
        middle: string,
        stop: string
    },
    primary: {
        header: string,
        subheader: string,
        text: string,
        subtext: string,
        highlight: string
        tertiary: string,
        quaternary: string
    }
}

const jadeTheme: Theme = {
    bubbles: {
        start: '#00120F',
        middle: '#025A4A',
        stop: '#00120F'
    },
    background: '#1f1f1f',
    glowLight: `0px 0px 12px ${jadeGlowBase},
           0px 0px 2px ${jadeGlowTheme}, 0px 0px 3px ${jadeGlowTheme}, 0px 0px 4px ${jadeGlowTheme},
           0px 0px 10px ${jadeGlowTheme}, 0px 0px 20px ${jadeGlowTheme}, 0px 0px 40px ${jadeGlowTheme},
           0px 0px 50px ${jadeGlowTheme}, 0px 0px 70px ${jadeGlowTheme}, 0px 0px 100px ${jadeGlowTheme}`,
    glowBase: jadeGlowBase,
    highlightedBackground: {
        start: '',
        middle: '',
        stop: ''
    },
    primary: {
        header: '#0e544a',
        subheader: '#ffffff',
        text: '',
        subtext: '#0c3629',
        highlight: '#8fc7bf',
        tertiary: '#e0e0e01a',
        quaternary: '#b0b0b0'
    }
}

export const Context = React.createContext<Theme>({
    bubbles: {
        start: '',
        middle: '',
        stop: ''
    },
    background: '',
    glowLight: '',
    glowBase: '',
    highlightedBackground: {
        start: '',
        middle: '',
        stop: ''
    },
    primary: {
        header: '',
        subheader: '',
        text: '',
        subtext: '',
        highlight: '',
        tertiary: '',
        quaternary: ''
    }
})

export default function ThemeContext({ children } : { children: string | JSX.Element | JSX.Element[] }) {
    const [theme, setTheme] = useState<Theme>(jadeTheme)

    // This can be removed, TypeScript wouldn't shut up about not using setTheme, even temporarily
    useEffect(() => {
        setTheme(jadeTheme)
    })

    return (
        <Context.Provider value={theme}>
            {children}
        </Context.Provider>
    )
}