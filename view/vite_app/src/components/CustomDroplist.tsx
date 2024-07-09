/** @jsxImportSource @emotion/react */

import styles from '../assets/css/misc/customDroplist.module.css'
import CSS from 'csstype'
import { useContext } from 'react'
import { IoChevronDownOutline } from 'react-icons/io5'
import { Context } from './context/ThemeContext'
import { css } from '@emotion/react'

// Relative container width is used to size absolutely positioned items in this component, its value should be the same as or close to the width of the component wrapper you make
// Example: You have a <CustomDroplist /> item in a wrapper that has width 40%, a good practice here is to pass in '40' for relative container width and '%' from units
// Remember, this component always expects a wrapper that it will take the full width/height of, effectively this component is sized by the size of said wrapper
export default function CustomDroplist( { selected, payload, relativeContainerWidth, relativeContainerUnits, callback } : { selected: number, payload: Array<any>, relativeContainerWidth: number, relativeContainerUnits: string, callback: (arg1: number) => void } ) {
    const theme = useContext(Context)
    
    const inlineStyles: {[key: string]: CSS.Properties} = {
        "listbox": {
            width: `${relativeContainerWidth}${relativeContainerUnits}`,
            backgroundColor: theme.background
        },
        "selector": {
            backgroundColor: theme.background,
            color: theme.primary.highlight,
            border: `solid 1px ${theme.primary.tertiary}`
        },
        "icon": {
            color: theme.primary.header
        }
    }

    const WrapperStyles = css`
        &:hover span {
            color: ${theme.primary.highlight} !important;
        }
        
        &:focus-within span {
            color: ${theme.primary.highlight} !important;
        }
    `

    const ItemStyles = css`
        color: ${theme.primary.header};

        &:hover {
            color: ${theme.background};
            background-color: ${theme.primary.highlight} !important;
        }
    `
    
    return (
        <div css={WrapperStyles} className={styles.wrapper}>
            <div tabIndex={0} className={styles.selector} style={inlineStyles.selector}>
                {payload.length !== 0 ? payload[selected].name : ''}
                <span style={inlineStyles.icon}><IoChevronDownOutline className={styles.icon}/></span>
            </div>
            <div className={styles.listbox} style={inlineStyles.listbox}>
                {
                    payload.map((v, i) => {
                        return (
                            <div id={v.id} onClick={() => {callback(i)}} css={ItemStyles} className={styles.item}>
                                {v.name}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}