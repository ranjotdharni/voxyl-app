import { useEffect, useState } from 'react'
import styles from '../../assets/css/misc/confirmModal.module.css'

export interface Confirm {
    title: string,
    message: string,
    question: string,
    callback: () => void
}

export default function ConfirmModal({ slug } : { slug: Confirm }) {
    const [visible, setVisible] = useState<boolean>(false)

    function hide() {
        setVisible(false)
    }

    useEffect(() => {
        if (slug.message.trim() !== '') {
            setVisible(true)
        }
    }, [slug])

    return (
        <div className={styles.container} style={{display: (visible ? 'flex' : 'none')}}>
            <div className={styles.wrapper}>
                <div className={styles.titleWrapper}>
                    <h2>{slug.title}</h2>
                </div>
                <div className={styles.messageWrapper}>
                    <p>{slug.message}</p>
                </div>
                <div className={styles.questionWrapper}>
                    <p>{slug.question}</p>
                    <div className={styles.buttonWrapper}>
                        <button onClick={hide}>Cancel</button>
                        <button onClick={() => { slug.callback(); hide() }}>Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    )
}