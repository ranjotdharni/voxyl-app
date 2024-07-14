import styles from '../../assets/css/teams/teams.module.css'
import TeamsView from '../../components/teams/TeamsView'
import TeamsCreate from '../../components/teams/TeamsCreate'
import TeamsAdd from '../../components/teams/TeamsAdd'
import { useState } from 'react'
import ConfirmModal, { Confirm } from '../../components/misc/ConfirmModal'

export default function Teams() {
    const [fetch, setFetch] = useState<boolean>(false)
    const [modalSlug, setModalSlug] = useState<Confirm>({title: '', message: '', question: '', callback: () => {}})

    function triggerFetch() {
        setFetch(!fetch)
    }

    return (
        <>
            <ConfirmModal slug={modalSlug} />
            <section className={styles.mainWrapper}>
                <TeamsView fetch={fetch} triggerFetch={triggerFetch} setModal={setModalSlug} />
                <TeamsCreate fetch={fetch} triggerFetch={triggerFetch} />
                <TeamsAdd fetch={fetch} triggerFetch={triggerFetch} />
            </section>
        </>
    )
}