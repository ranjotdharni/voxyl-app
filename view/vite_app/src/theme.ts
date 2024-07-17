import { generateGlow, PERMISSIONS } from "./globals"

export const DEFAULT_MODE: number = 0
export const DEFAULT_THEME: number = 0

// Keep items in alphabetical order
export interface Theme {
    bubbles: {
        start: string,
        middle: string,
        stop: string
    },
    backgroundBlur: string,
    backgroundContrast: string,
    backgroundOpaque: string,
    backgroundTransparent: string,
    error: string,
    glassBackground: string,
    glassBorder: string,
    glassShadow: string,
    glowColor: string,
    glowLight: string,
    glowBase: string,
    highlightedBackground: {
        start: string,
        middle: string,
        stop: string
    },
    name: string,
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

const COMMON_BOX_GRADIENT: string = 'rgba(255, 255, 255, 0.15)'

// Theme at index 0 is the default (for both subarrays)
export const themes: Theme[][] = [
    [
        {
            bubbles: {
                start: '#878787',
                middle: '#878787',
                stop: '#878787'
            },
            backgroundBlur: 'blur(5px)',
            backgroundContrast: '#0a0a0a00',
            backgroundOpaque: '#d9ced3',
            backgroundTransparent: '#0000001f',
            error: '#878787',
            glassBackground: 'rgba(255, 255, 255, 0.05)',
            glassBorder: '1px solid rgba(255, 255, 255, 0)',
            glassShadow: '-10px 10px 20px 0px rgba(0,0,0,0.15)',
            glowColor: '#878787',
            glowLight: '',
            glowBase: '#878787',
            highlightedBackground: {
                start: '#878787',
                middle: '#878787',
                stop: '#878787'
            },
            name: 'Mulberry',
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
            backgroundBlur: 'blur(5px)',
            backgroundContrast: '#0a0a0a00',
            backgroundOpaque: '#0a0a0a',
            backgroundTransparent: '#ffffff00',
            error: '#910f2f',
            glassBackground: 'rgba(255, 255, 255, 0.05)',
            glassBorder: '1px solid rgba(255, 255, 255, 0)',
            glassShadow: '-10px 10px 20px 0px rgba(0,0,0,0.15)',
            glowColor: PERMISSIONS[0].color,
            glowLight: generateGlow(PERMISSIONS[0].glowBase, PERMISSIONS[0].color),
            glowBase: PERMISSIONS[0].glowBase,
            highlightedBackground: {
                start: '',
                middle: '',
                stop: ''
            },
            name: 'Ra',
            pageGradient: 'linear-gradient(45deg, hsla(0, 3%, 6%, 1) 0%, hsla(228, 31%, 6%, 1) 100%), linear-gradient(225deg, hsla(0, 3%, 6%, 1) 0%, hsla(228, 31%, 6%, 1) 100%)',
            boxGradient: 'linear-gradient(45deg, hsla(0, 3%, 7%, 1) 0%, hsla(0, 3%, 6%, 1) 12%)',
            primary: {
                header: '#dece23',
                subheader: '#ccc683',
                text: '#d1cfbe',
                subtext: '#1f1c01',
                highlight: '#faf889',
                tertiary: '#545453',
                quaternary: '#2b2b2b'
            }
        },
        {
            bubbles: {
                start: '#00120F',
                middle: '#025A4A',
                stop: '#00120F'
            },
            backgroundBlur: 'blur(5px)',
            backgroundContrast: '#0a0a0a00',
            backgroundOpaque: '#06212e',
            backgroundTransparent: '#ffffff00',
            error: '#910f2f',
            glassBackground: 'rgba(255, 255, 255, 0.05)',
            glassBorder: '1px solid rgba(255, 255, 255, 0)',
            glassShadow: '-10px 10px 20px 0px rgba(0,0,0,0.15)',
            glowColor: PERMISSIONS[1].color,
            glowLight: generateGlow(PERMISSIONS[1].glowBase, PERMISSIONS[1].color),
            glowBase: PERMISSIONS[1].glowBase,
            highlightedBackground: {
                start: '',
                middle: '',
                stop: ''
            },
            name: 'Tron',
            pageGradient: 'linear-gradient(45deg, hsla(0, 3%, 6%, 1) 0%, hsla(228, 31%, 6%, 1) 100%), linear-gradient(225deg, hsla(0, 3%, 6%, 1) 0%, hsla(228, 31%, 6%, 1) 100%)',
            boxGradient: 'linear-gradient(45deg, hsla(0, 3%, 7%, 1) 0%, hsla(0, 3%, 6%, 1) 12%)',
            primary: {
                header: '#07628f',
                subheader: '#cee5f5',
                text: '#256a8a',
                subtext: '#0f2b3d',
                highlight: '#12b0db',
                tertiary: '#545453',
                quaternary: '#2b2b2b'
            }
        },
        {
            bubbles: {
                start: '#00120F',
                middle: '#025A4A',
                stop: '#00120F'
            },
            backgroundBlur: 'blur(5px)',
            backgroundContrast: '#0a0a0a00',
            backgroundOpaque: '#0a0a0a',
            backgroundTransparent: '#ffffff00',
            error: '#910f2f',
            glassBackground: 'rgba(255, 255, 255, 0.05)',
            glassBorder: '1px solid rgba(255, 255, 255, 0)',
            glassShadow: '-10px 10px 20px 0px rgba(0,0,0,0.15)',
            glowColor: PERMISSIONS[2].color,
            glowLight: generateGlow(PERMISSIONS[2].glowBase, PERMISSIONS[2].color),
            glowBase: PERMISSIONS[2].glowBase,
            highlightedBackground: {
                start: '',
                middle: '',
                stop: ''
            },
            name: 'Witchcraft',
            pageGradient: 'linear-gradient(45deg, hsla(0, 3%, 6%, 1) 0%, hsla(228, 31%, 6%, 1) 100%), linear-gradient(225deg, hsla(0, 3%, 6%, 1) 0%, hsla(228, 31%, 6%, 1) 100%)',
            boxGradient: 'linear-gradient(45deg, hsla(0, 3%, 7%, 1) 0%, hsla(0, 3%, 6%, 1) 12%)',
            primary: {
                header: '#0e544a',
                subheader: '#ffffff',
                text: '',
                subtext: '#0c3629',
                highlight: '#8fc7bf',
                tertiary: '#545453',
                quaternary: '#2b2b2b'
            }
        },
        {
            bubbles: {
                start: '#00120F',
                middle: '#025A4A',
                stop: '#00120F'
            },
            backgroundBlur: 'blur(5px)',
            backgroundContrast: '#0a0a0a00',
            backgroundOpaque: '#0a0a0a',
            backgroundTransparent: '#ffffff00',
            error: '#910f2f',
            glassBackground: 'rgba(255, 255, 255, 0.05)',
            glassBorder: '1px solid rgba(255, 255, 255, 0)',
            glassShadow: '-10px 10px 20px 0px rgba(0,0,0,0.15)',
            glowColor: PERMISSIONS[3].color,
            glowLight: generateGlow(PERMISSIONS[3].glowBase, PERMISSIONS[3].color),
            glowBase: PERMISSIONS[3].glowBase,
            highlightedBackground: {
                start: '',
                middle: '',
                stop: ''
            },
            name: 'Energon',
            pageGradient: 'linear-gradient(45deg, hsla(0, 3%, 6%, 1) 0%, hsla(228, 31%, 6%, 1) 100%), linear-gradient(225deg, hsla(0, 3%, 6%, 1) 0%, hsla(228, 31%, 6%, 1) 100%)',
            boxGradient: 'linear-gradient(45deg, hsla(0, 3%, 7%, 1) 0%, hsla(0, 3%, 6%, 1) 12%)',
            primary: {
                header: '#41118f',
                subheader: '#dac7f0',
                text: '#6b11ad',
                subtext: '#330454',
                highlight: '#af39e6',
                tertiary: '#545453',
                quaternary: '#2b2b2b'
            }
        },
        {
            bubbles: {
                start: '#00120F',
                middle: '#025A4A',
                stop: '#00120F'
            },
            backgroundBlur: 'blur(5px)',
            backgroundContrast: '#0a0a0a00',
            backgroundOpaque: '#0a0a0a',
            backgroundTransparent: '#ffffff00',
            error: '#910f2f',
            glassBackground: 'rgba(255, 255, 255, 0.05)',
            glassBorder: '1px solid rgba(255, 255, 255, 0)',
            glassShadow: '-10px 10px 20px 0px rgba(0,0,0,0.15)',
            glowColor: PERMISSIONS[4].color,
            glowLight: generateGlow(PERMISSIONS[4].glowBase, PERMISSIONS[4].color),
            glowBase: PERMISSIONS[4].glowBase,
            highlightedBackground: {
                start: '',
                middle: '',
                stop: ''
            },
            name: 'Phonk',
            pageGradient: 'linear-gradient(45deg, hsla(0, 3%, 6%, 1) 0%, hsla(228, 31%, 6%, 1) 100%), linear-gradient(225deg, hsla(0, 3%, 6%, 1) 0%, hsla(228, 31%, 6%, 1) 100%)',
            boxGradient: 'linear-gradient(45deg, hsla(0, 3%, 7%, 1) 0%, hsla(0, 3%, 6%, 1) 12%)',
            primary: {
                header: '#cc1464',
                subheader: '#f0c2d6',
                text: '#8f153a',
                subtext: '#450320',
                highlight: '#f08db9',
                tertiary: '#545453',
                quaternary: '#2b2b2b'
            }
        },
        {
            bubbles: {
                start: '#00120F',
                middle: '#025A4A',
                stop: '#00120F'
            },
            backgroundBlur: 'blur(5px)',
            backgroundContrast: '#0a0a0a00',
            backgroundOpaque: '#0a0a0a',
            backgroundTransparent: '#ffffff00',
            error: '#910f2f',
            glassBackground: 'rgba(255, 255, 255, 0.05)',
            glassBorder: '1px solid rgba(255, 255, 255, 0)',
            glassShadow: '-10px 10px 20px 0px rgba(0,0,0,0.15)',
            glowColor: PERMISSIONS[5].color,
            glowLight: generateGlow(PERMISSIONS[5].glowBase, PERMISSIONS[5].color),
            glowBase: PERMISSIONS[5].glowBase,
            highlightedBackground: {
                start: '',
                middle: '',
                stop: ''
            },
            name: 'Volcanic',
            pageGradient: 'linear-gradient(45deg, hsla(0, 3%, 6%, 1) 0%, hsla(228, 31%, 6%, 1) 100%), linear-gradient(225deg, hsla(0, 3%, 6%, 1) 0%, hsla(228, 31%, 6%, 1) 100%)',
            boxGradient: 'linear-gradient(45deg, hsla(0, 3%, 7%, 1) 0%, hsla(0, 3%, 6%, 1) 12%)',
            primary: {
                header: '#bf3613',
                subheader: '#f5ccc1',
                text: '#9c3628',
                subtext: '#420b04',
                highlight: '#f29363',
                tertiary: '#545453',
                quaternary: '#2b2b2b'
            }
        }
    ],
    [
        {
            bubbles: {
                start: '#878787',
                middle: '#878787',
                stop: '#878787'
            },
            backgroundBlur: 'blur(5px)',
            backgroundContrast: '#0a0a0a',
            backgroundOpaque: '#d9ced3',
            backgroundTransparent: '#0000001f',
            error: '#878787',
            glassBackground: 'linear-gradient(to right, #d3cce340, #e9e4f040)',
            glassBorder: '1px solid rgba(255, 255, 255, 0.3)',
            glassShadow: '-10px 10px 20px 0px rgba(0,0,0,0.15)',
            glowColor: '#878787',
            glowLight: '',
            glowBase: '#878787',
            highlightedBackground: {
                start: '#878787',
                middle: '#878787',
                stop: '#878787'
            },
            name: 'Mulberry',
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
            backgroundBlur: 'blur(5px)',
            backgroundContrast: '#0a0a0a',
            backgroundOpaque: '#0a0a0a',
            backgroundTransparent: '#ffffff00',
            error: '#910f2f',
            glassBackground: 'linear-gradient(to right, #d3cce340, #e9e4f040)',
            glassBorder: '1px solid rgba(255, 255, 255, 0.3)',
            glassShadow: '-10px 10px 20px 0px rgba(0,0,0,0.15)',
            glowColor: PERMISSIONS[0].color,
            glowLight: generateGlow(PERMISSIONS[0].glowBase, PERMISSIONS[0].color),
            glowBase: PERMISSIONS[0].glowBase,
            highlightedBackground: {
                start: '',
                middle: '',
                stop: ''
            },
            name: 'Beach Day',
            pageGradient: 'linear-gradient(to right, #ffb75e, #ed8f03)',
            boxGradient: COMMON_BOX_GRADIENT,
            primary: {
                header: '#9c8202',
                subheader: '#d9db0f',
                text: '#1a1919',
                subtext: '#2e2001',
                highlight: '#ccfa14',
                tertiary: '#545453',
                quaternary: '#2b2b2b'
            }
        },
        {
            bubbles: {
                start: '#00120F',
                middle: '#025A4A',
                stop: '#00120F'
            },
            backgroundBlur: 'blur(5px)',
            backgroundContrast: '#0a0a0a',
            backgroundOpaque: '#06212e',
            backgroundTransparent: '#ffffff00',
            error: '#910f2f',
            glassBackground: 'linear-gradient(to right, #d3cce340, #e9e4f040)',
            glassBorder: '1px solid rgba(255, 255, 255, 0.3)',
            glassShadow: '-10px 10px 20px 0px rgba(0,0,0,0.15)',
            glowColor: PERMISSIONS[1].color,
            glowLight: generateGlow(PERMISSIONS[1].glowBase, PERMISSIONS[1].color),
            glowBase: PERMISSIONS[1].glowBase,
            highlightedBackground: {
                start: '',
                middle: '',
                stop: ''
            },
            name: 'Blue Sky',
            pageGradient: 'linear-gradient(to right, #1488cc, #2b32b2)',
            boxGradient: COMMON_BOX_GRADIENT,
            primary: {
                header: '#07628f',
                subheader: '#cee5f5',
                text: '#256a8a',
                subtext: '#0f2b3d',
                highlight: '#14faad',
                tertiary: '#545453',
                quaternary: '#2b2b2b'
            }
        },
        {
            bubbles: {
                start: '#00120F',
                middle: '#025A4A',
                stop: '#00120F'
            },
            backgroundBlur: 'blur(5px)',
            backgroundContrast: '#0a0a0a',
            backgroundOpaque: '#0a0a0a',
            backgroundTransparent: '#ffffff00',
            error: '#910f2f',
            glassBackground: 'linear-gradient(to right, #d3cce340, #e9e4f040)',
            glassBorder: '1px solid rgba(255, 255, 255, 0.3)',
            glassShadow: '-10px 10px 20px 0px rgba(0,0,0,0.15)',
            glowColor: PERMISSIONS[2].color,
            glowLight: generateGlow(PERMISSIONS[2].glowBase, PERMISSIONS[2].color),
            glowBase: PERMISSIONS[2].glowBase,
            highlightedBackground: {
                start: '',
                middle: '',
                stop: ''
            },
            name: 'Mint Berry',
            pageGradient: 'linear-gradient(to right, #02aab0, #00cdac)',
            boxGradient: COMMON_BOX_GRADIENT,
            primary: {
                header: '#0e544a',
                subheader: '#ffffff',
                text: '',
                subtext: '#0c3629',
                highlight: '#82f593',
                tertiary: '#545453',
                quaternary: '#2b2b2b'
            }
        },
        {
            bubbles: {
                start: '#00120F',
                middle: '#025A4A',
                stop: '#00120F'
            },
            backgroundBlur: 'blur(5px)',
            backgroundContrast: '#0a0a0a',
            backgroundOpaque: '#0a0a0a',
            backgroundTransparent: '#ffffff00',
            error: '#910f2f',
            glassBackground: 'linear-gradient(to right, #d3cce340, #e9e4f040)',
            glassBorder: '1px solid rgba(255, 255, 255, 0.3)',
            glassShadow: '-10px 10px 20px 0px rgba(0,0,0,0.15)',
            glowColor: PERMISSIONS[3].color,
            glowLight: generateGlow(PERMISSIONS[3].glowBase, PERMISSIONS[3].color),
            glowBase: PERMISSIONS[3].glowBase,
            highlightedBackground: {
                start: '',
                middle: '',
                stop: ''
            },
            name: 'Lavender',
            pageGradient: 'linear-gradient(to right, #da22ff, #9733ee)',
            boxGradient: COMMON_BOX_GRADIENT,
            primary: {
                header: '#41118f',
                subheader: '#dac7f0',
                text: '#6b11ad',
                subtext: '#330454',
                highlight: '#faacce',
                tertiary: '#545453',
                quaternary: '#2b2b2b'
            }
        },
        {
            bubbles: {
                start: '#00120F',
                middle: '#025A4A',
                stop: '#00120F'
            },
            backgroundBlur: 'blur(5px)',
            backgroundContrast: '#0a0a0a',
            backgroundOpaque: '#0a0a0a',
            backgroundTransparent: '#ffffff00',
            error: '#910f2f',
            glassBackground: 'linear-gradient(to right, #d3cce340, #e9e4f040)',
            glassBorder: '1px solid rgba(255, 255, 255, 0.3)',
            glassShadow: '-10px 10px 20px 0px rgba(0,0,0,0.15)',
            glowColor: PERMISSIONS[4].color,
            glowLight: generateGlow(PERMISSIONS[4].glowBase, PERMISSIONS[4].color),
            glowBase: PERMISSIONS[4].glowBase,
            highlightedBackground: {
                start: '',
                middle: '',
                stop: ''
            },
            name: 'Lychee',
            pageGradient: 'linear-gradient(to right, #f953c6, #b91d73)',
            boxGradient: COMMON_BOX_GRADIENT,
            primary: {
                header: '#cc1464',
                subheader: '#f0c2d6',
                text: '#8f153a',
                subtext: '#450320',
                highlight: '#acf9fa',
                tertiary: '#545453',
                quaternary: '#2b2b2b'
            }
        },
        {
            bubbles: {
                start: '#00120F',
                middle: '#025A4A',
                stop: '#00120F'
            },
            backgroundBlur: 'blur(5px)',
            backgroundContrast: '#0a0a0a',
            backgroundOpaque: '#0a0a0a',
            backgroundTransparent: '#ffffff00',
            error: '#910f2f',
            glassBackground: 'linear-gradient(to right, #d3cce340, #e9e4f040)',
            glassBorder: '1px solid rgba(255, 255, 255, 0.3)',
            glassShadow: '-10px 10px 20px 0px rgba(0,0,0,0.15)',
            glowColor: PERMISSIONS[5].color,
            glowLight: generateGlow(PERMISSIONS[5].glowBase, PERMISSIONS[5].color),
            glowBase: PERMISSIONS[5].glowBase,
            highlightedBackground: {
                start: '',
                middle: '',
                stop: ''
            },
            name: 'Mango',
            pageGradient: 'linear-gradient(to right, #f12711, #f5af19)',
            boxGradient: COMMON_BOX_GRADIENT,
            primary: {
                header: '#bf3613',
                subheader: '#f5ccc1',
                text: '#9c3628',
                subtext: '#420b04',
                highlight: '#bafaac',
                tertiary: '#545453',
                quaternary: '#2b2b2b'
            }
        }
    ]
]