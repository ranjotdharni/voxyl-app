import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi'
import styles from '../../assets/css/misc/customCounter.module.css'
import { themes } from '../../theme'
import { useContext } from 'react'
import { Context } from '../../pages/Layout'

interface Props {
    min?: number
    max?: number
    value: number
    setValue: (value: number) => void
}

export default function CustomCounter({ min, max, value, setValue } : Props) {
    const [theme, mode, fetchTheme] = useContext(Context)

    function decrement() {
        if (min !== undefined && value === min)
            return

        setValue(value - 1)
    }

    function increment() {
        if (max !== undefined && value === max)
            return

        setValue(value + 1)
    }
    
    return (
        <div className={styles.mainContainer}>
            <div className={styles.button} onClick={decrement}>
                <FiMinusCircle color={themes[mode][theme].primary.highlight} />
            </div>
            <div className={styles.display}>
                <p style={{color: themes[mode][theme].primary.text}}>{value}</p>
            </div>
            <div className={styles.button} onClick={increment}>
                <FiPlusCircle color={themes[mode][theme].primary.highlight} />
            </div>
        </div>
    )
}