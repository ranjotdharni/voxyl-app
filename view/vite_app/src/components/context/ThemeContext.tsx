import React, { useEffect } from "react";
import { useState } from "react";

// #0e544a

// Keep items in alphabetical order
interface Theme {
    bubbles: {
        start: string,
        middle: string,
        stop: string
    },
    background: string,
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
    }
}

const jadeTheme: Theme = {
    bubbles: {
        start: '#00120F',
        middle: '#025A4A',
        stop: '#00120F'
    },
    background: '#1f1f1f',
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
        tertiary: '#e0e0e0a2',
    }
}

export const Context = React.createContext<Theme>({
    bubbles: {
        start: '',
        middle: '',
        stop: ''
    },
    background: '',
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