import { useState } from 'react'
import styles from '../assets/css/create/customInput.module.css'

export default function CustomInput({ label, type, name, color, borderColor, callback } : { label: string, type: string, name: string, color: string, borderColor: string, callback?: (value: string) => void }) {
    const [active, setActive] = useState('')

    return (
        <label className={styles.wrapper}>
            <span className={styles.inLabel + (active !== '' ? ' ' + styles.active : '')} style={{color: color}} >{label}</span>
            <input onChange={(e) => {setActive(e.target.value); (callback ? callback(e.target.value) : () => {})}} value={active} placeholder=' ' type={type} name={name} className={styles.inInput + (active !== '' ? ' ' + styles.inputActive : '')} style={{borderBottom: 'solid 1px ' + borderColor}} />
        </label>
    )
}