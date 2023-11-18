import { useState } from 'react'
import styles from '../assets/css/create/customInput.module.css'

export default function CustomInput({ label, type, name, color, borderColor, init, callback } : { label: string, type: string, name: string, color: string, borderColor: string, init: string, callback?: (value: string) => void }) {
    function handleChange(str: string) {
        if (callback !== undefined)
            callback(str)
    }


    return (
        <label className={styles.wrapper}>
            <span className={styles.inLabel + (init !== '' ? ' ' + styles.active : '')} style={{color: color}} >{label}</span>
            <input onChange={ (e) => { handleChange(e.target.value) } } value={init} placeholder=' ' type={type} name={name} className={styles.inInput + (init !== '' ? ' ' + styles.inputActive : '')} style={{borderBottom: 'solid 1px ' + borderColor}} />
        </label>
    )
}