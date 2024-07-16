import { useState } from "react"
import { fetchToApi, generateGlow, PERMISSIONS } from "./globals"

// Keep items in alphabetical order
export interface Theme {
    bubbles: {
        start: string,
        middle: string,
        stop: string
    },
    backgroundBlur: string,
    backgroundOpaque: string,
    backgroundTransparent: string,
    error: string,
    glowColor: string,
    glowLight: string,
    glowBase: string,
    highlightedBackground: {
        start: string,
        middle: string,
        stop: string
    },
    pageGradient: string,
    boxGradient: string,
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

export function useTheme() {
    const [t, st] = useState<number>(0)

    async function getTheme() {
        await fetchToApi('/v1/teams/theme/', 'GET', []).then(response => {
            if (response.error) {
                console.log(response.error)
            }
            else if (response.theme) {
                st(response.theme)
            }
            else {
                setTimeout(getTheme, 30000)
            }
        })
    }

    return [t, getTheme] as [number, () => void]
}

const COMMON_BACKGROUND_GRADIENT: string = 'linear-gradient(45deg, hsla(0, 3%, 6%, 1) 0%, hsla(228, 31%, 6%, 1) 100%), linear-gradient(225deg, hsla(0, 3%, 6%, 1) 0%, hsla(228, 31%, 6%, 1) 100%)'
const COMMON_BOX_GRADIENT: string = 'linear-gradient(45deg, hsla(0, 3%, 7%, 1) 0%, hsla(0, 3%, 6%, 1) 12%)'

// Theme at index 0 is the default
export const themes: Theme[] = [
    {
        bubbles: {
            start: '#878787',
            middle: '#878787',
            stop: '#878787'
        },
        backgroundBlur: 'blur(10px)',
        backgroundOpaque: '#d9ced3',
        backgroundTransparent: '#0000001f',
        error: '#878787',
        glowColor: '#878787',
        glowLight: '',
        glowBase: '#878787',
        highlightedBackground: {
            start: '#878787',
            middle: '#878787',
            stop: '#878787'
        },
        pageGradient: '#998d90',
        boxGradient: COMMON_BOX_GRADIENT,
        primary: {
            header: '#7a404f',
            subheader: '#403639',
            text: '#241214',
            subtext: '#878787',
            highlight: '#b84f5d',
            tertiary: '#783a4ca0',
            quaternary: '#e0e0e0'
        }
    },
    {
        bubbles: {
            start: '#00120F',
            middle: '#025A4A',
            stop: '#00120F'
        },
        backgroundBlur: 'blur(10px)',
        backgroundOpaque: '#0a0a0a',
        backgroundTransparent: '#ffffff00',
        error: '#910f2f',
        glowColor: PERMISSIONS[0].color,
        glowLight: generateGlow(PERMISSIONS[0].glowBase, PERMISSIONS[0].color),
        glowBase: PERMISSIONS[0].glowBase,
        highlightedBackground: {
            start: '',
            middle: '',
            stop: ''
        },
        pageGradient: COMMON_BACKGROUND_GRADIENT,
        boxGradient: COMMON_BOX_GRADIENT,
        primary: {
            header: '#0e544a',
            subheader: '#ffffff',
            text: '',
            subtext: '#0c3629',
            highlight: '#8fc7bf',
            tertiary: '#e0e0e01a',
            quaternary: '#b0b0b0'
        }
    },
    {
        bubbles: {
            start: '#00120F',
            middle: '#025A4A',
            stop: '#00120F'
        },
        backgroundBlur: 'blur(10px)',
        backgroundOpaque: '#0a0a0a',
        backgroundTransparent: '#ffffff00',
        error: '#910f2f',
        glowColor: PERMISSIONS[1].color,
        glowLight: generateGlow(PERMISSIONS[1].glowBase, PERMISSIONS[1].color),
        glowBase: PERMISSIONS[1].glowBase,
        highlightedBackground: {
            start: '',
            middle: '',
            stop: ''
        },
        pageGradient: COMMON_BACKGROUND_GRADIENT,
        boxGradient: COMMON_BOX_GRADIENT,
        primary: {
            header: '#0e544a',
            subheader: '#ffffff',
            text: '',
            subtext: '#0c3629',
            highlight: '#8fc7bf',
            tertiary: '#e0e0e01a',
            quaternary: '#b0b0b0'
        }
    },
    {
        bubbles: {
            start: '#00120F',
            middle: '#025A4A',
            stop: '#00120F'
        },
        backgroundBlur: 'blur(10px)',
        backgroundOpaque: '#0a0a0a',
        backgroundTransparent: '#ffffff00',
        error: '#910f2f',
        glowColor: PERMISSIONS[2].color,
        glowLight: generateGlow(PERMISSIONS[2].glowBase, PERMISSIONS[2].color),
        glowBase: PERMISSIONS[2].glowBase,
        highlightedBackground: {
            start: '',
            middle: '',
            stop: ''
        },
        pageGradient: COMMON_BACKGROUND_GRADIENT,
        boxGradient: COMMON_BOX_GRADIENT,
        primary: {
            header: '#0e544a',
            subheader: '#ffffff',
            text: '',
            subtext: '#0c3629',
            highlight: '#8fc7bf',
            tertiary: '#e0e0e01a',
            quaternary: '#b0b0b0'
        }
    },
    {
        bubbles: {
            start: '#00120F',
            middle: '#025A4A',
            stop: '#00120F'
        },
        backgroundBlur: 'blur(10px)',
        backgroundOpaque: '#0a0a0a',
        backgroundTransparent: '#ffffff00',
        error: '#910f2f',
        glowColor: PERMISSIONS[3].color,
        glowLight: generateGlow(PERMISSIONS[3].glowBase, PERMISSIONS[3].color),
        glowBase: PERMISSIONS[3].glowBase,
        highlightedBackground: {
            start: '',
            middle: '',
            stop: ''
        },
        pageGradient: COMMON_BACKGROUND_GRADIENT,
        boxGradient: COMMON_BOX_GRADIENT,
        primary: {
            header: '#0e544a',
            subheader: '#ffffff',
            text: '',
            subtext: '#0c3629',
            highlight: '#8fc7bf',
            tertiary: '#e0e0e01a',
            quaternary: '#b0b0b0'
        }
    },
    {
        bubbles: {
            start: '#00120F',
            middle: '#025A4A',
            stop: '#00120F'
        },
        backgroundBlur: 'blur(10px)',
        backgroundOpaque: '#0a0a0a',
        backgroundTransparent: '#ffffff00',
        error: '#910f2f',
        glowColor: PERMISSIONS[4].color,
        glowLight: generateGlow(PERMISSIONS[4].glowBase, PERMISSIONS[4].color),
        glowBase: PERMISSIONS[4].glowBase,
        highlightedBackground: {
            start: '',
            middle: '',
            stop: ''
        },
        pageGradient: COMMON_BACKGROUND_GRADIENT,
        boxGradient: COMMON_BOX_GRADIENT,
        primary: {
            header: '#0e544a',
            subheader: '#ffffff',
            text: '',
            subtext: '#0c3629',
            highlight: '#8fc7bf',
            tertiary: '#e0e0e01a',
            quaternary: '#b0b0b0'
        }
    },
    {
        bubbles: {
            start: '#00120F',
            middle: '#025A4A',
            stop: '#00120F'
        },
        backgroundBlur: 'blur(10px)',
        backgroundOpaque: '#0a0a0a',
        backgroundTransparent: '#ffffff00',
        error: '#910f2f',
        glowColor: PERMISSIONS[5].color,
        glowLight: generateGlow(PERMISSIONS[5].glowBase, PERMISSIONS[5].color),
        glowBase: PERMISSIONS[5].glowBase,
        highlightedBackground: {
            start: '',
            middle: '',
            stop: ''
        },
        pageGradient: COMMON_BACKGROUND_GRADIENT,
        boxGradient: COMMON_BOX_GRADIENT,
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
]