/** @jsxImportSource @emotion/react */

import { useContext } from 'react';
import styles from '../assets/css/create/customInput.module.css'
import { Context } from './context/ThemeContext';
import { css } from '@emotion/react'

// Set 'label' to empty string to disable placeholder animations/resizing and make the component more compact (less sizing issues)
export default function CustomInput({ label, type, name, init, color, highlight, callback } : { label: string, type: string, name: string, init: string, color?: string, highlight?: string, callback?: (value: string) => void }) {
    const theme = useContext(Context)

    const SpanStyles = css`
        color: ${color ? color : theme.primary.subtext} !important;
    `
    
    const TextStyles = css`
        border-color: ${color ? color : theme.primary.subtext} !important;

        &:focus {
            color: ${highlight ? highlight : theme.primary.highlight} !important;
            border-color: ${highlight ? highlight : theme.primary.highlight} !important;
        }
    `

    const activeStyles = css`
        &:focus-within > span {
            color: ${highlight ? highlight : theme.primary.highlight} !important;
        }
    `
    
    function handleChange(str: string) {
        if (callback !== undefined)
            callback(str)
    }


    return (
        <label css={activeStyles} className={styles.wrapper}>
            {   
                label !== '' ? 
                <span css={SpanStyles} className={styles.inLabel + (init !== '' ? ' ' + styles.active : '')} >
                    {label}
                </span> :
                <></>
            }
            <input css={TextStyles} onChange={ (e) => { handleChange(e.target.value) } } value={init} placeholder=' ' type={type} name={name} className={styles.inInput} style={(init !== '' ? {color: theme.primary.highlight} : {})} />
        </label>
    )
}