/** @jsxImportSource @emotion/react */

import styles from '../assets/css/misc/customDroplist.module.css'
import CSS from 'csstype'
import { IoChevronDownOutline } from 'react-icons/io5'
import { css } from '@emotion/react'
import { themes } from '../theme'
import { useContext } from 'react'
import { Context } from '../pages/Layout'

interface PayLoadRequiredFields {
    id: string | number;
    name: string;
}

export interface PayloadItem extends PayLoadRequiredFields {
    [key: string]: any
}

// Relative container width is used to size absolutely positioned items in this component, its value should be the same as or close to the width of the component wrapper you make
// Example: You have a <CustomDroplist /> item in a wrapper that has width 40%, a good practice here is to pass in '40' for relative container width and '%' from units
// Remember, this component always expects a wrapper that it will take the full width/height of, effectively this component is sized by the size of said wrapper
export default function CustomDroplist( { selected, payload, relativeContainerWidth, relativeContainerUnits, color, highlight, callback } : { selected: number, payload: PayloadItem[], relativeContainerWidth: number, relativeContainerUnits: string, color?: string, highlight?: string, callback: (arg1: number) => void } ) {
    // @ts-ignore Ignore unused setTheme
    const [ selectedTheme, selectedMode, grabTheme ] = useContext(Context)

    const sub = [{id: 'vncjksadncl', name: '----'}]
    
    const inlineStyles: {[key: string]: CSS.Properties} = {
        "listbox": {
            width: `${relativeContainerWidth}${relativeContainerUnits}`,
            background: themes[selectedMode][selectedTheme].glassBackground
        },
        "selector": {
            background: themes[selectedMode][selectedTheme].glassBackground,
            boxShadow: themes[selectedMode][selectedTheme].glassShadow,
            color: (highlight ? highlight : themes[selectedMode][selectedTheme].primary.highlight),
            border: themes[selectedMode][selectedTheme].glassBorder
        },
        "icon": {
            color: (color ? color : themes[selectedMode][selectedTheme].primary.header)
        }
    }

    const WrapperStyles = css`
        box-shadow: ${themes[selectedMode][selectedTheme].glassShadow};

        &:hover span {
            color: ${(highlight ? highlight : themes[selectedMode][selectedTheme].primary.highlight)} !important;
        }
        
        &:focus-within span {
            color: ${(highlight ? highlight : themes[selectedMode][selectedTheme].primary.highlight)} !important;
        }
    `

    const ItemStyles = css`
        color: ${(color ? color : themes[selectedMode][selectedTheme].primary.header)};

        &:hover {
            color: ${themes[selectedMode][selectedTheme].backgroundOpaque};
            background-color: ${(highlight ? highlight : themes[selectedMode][selectedTheme].primary.highlight)} !important;
        }
    `
    
    return (
        <div css={WrapperStyles} className={styles.wrapper}>
            <div tabIndex={0} className={styles.selector} style={inlineStyles.selector}>
                <div className={styles.titleWrapper}>{payload !== undefined && payload.length !== 0 && payload[selected] !== undefined && payload[selected].name !== undefined ? payload[selected].name : 'Select'}</div>
                <div style={inlineStyles.icon}><IoChevronDownOutline className={styles.icon}/></div>
            </div>
            <div className={styles.listbox} style={inlineStyles.listbox}>
                {
                    (payload ? payload : sub).map((v: PayloadItem, i: number) => {
                        return (
                            <div id={v.id as string} onClick={() => {callback(i)}} css={ItemStyles} className={styles.item}>
                                {v.name}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}