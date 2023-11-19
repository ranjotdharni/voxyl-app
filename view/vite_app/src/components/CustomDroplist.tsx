import styles from '../assets/css/misc/customDroplist.module.css'
import { IoChevronDownOutline } from 'react-icons/io5'

export default function CustomDroplist( { selected, payload, callback } : { selected: number, payload: Array<any> , callback: (arg1: number) => void } ) {
    return (
        <div className={styles.wrapper}>
            <div tabIndex={0} className={styles.selector}>
                {payload[selected].name}
                <IoChevronDownOutline className={styles.icon} />
            </div>
            <div className={styles.listbox}>
                {
                    payload.map((v, i) => {
                        return (
                            <div id={v.id} onClick={() => {callback(i)}} className={styles.item}>
                                {v.name}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}