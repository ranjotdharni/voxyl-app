import styles from '../../assets/css/teams/components/teamsCreate.module.css'
import CustomInput from '../CustomInput'
import { useState } from 'react'

function NewName({ value, setValue } : { value: string, setValue: (arg1: string) => void }) {
    return (
        <div className={styles.contentNameWrapper + ' ' + styles.contentTypeWrapper}>
            <label className={styles.CreateNameLabel}>Enter Name:</label>
            <div className={styles.CreateNameInput}><CustomInput init={value} callback={setValue} label='Team Name' type='text' name='teamName' color='#093a3e' borderColor='#ebf2fa' /></div>
        </div>
    )
}

function NewDescription({ value, setValue } : { value: string, setValue: (arg1: string) => void }) {
    return (
        <div className={styles.contentDescriptionWrapper + ' ' + styles.contentTypeWrapper}>
            <textarea value={value} onChange={(e) => {setValue(e.target.value)}} placeholder='Enter a Description' className={styles.CreateDescriptionInput}></textarea>
        </div>
    )
}

export default function TeamsCreate() {
    const [newName, setNewName] = useState('')
    const [teamDesc, setTeamDesc] = useState('')
    const [error, setError] = useState('')

    let timeout: number | undefined

    function throwError(arg1: string) {
        setError(arg1)

        if (timeout !== undefined) 
        {
            window.clearTimeout(timeout)
        }

        timeout = window.setTimeout(() => {
            setError('')
            timeout = undefined
        }, 8000)
    }

    function isSubmitReady() {
        return newName !== '' && teamDesc !== ''
    }

    function handleSubmit() {

    }

    return (
        <div className={styles.gridItemWrapper}>
            <div className={styles.mainContainer + ' basicContainer'}>
                <div className={styles.containerHeaderWrapper}>
                    <p className={styles.containerHeader}>Create New Team</p>
                </div>
                <div className={styles.contentWrapper}>
                    <NewName value={newName} setValue={setNewName}/>
                    <NewDescription value={teamDesc} setValue={setTeamDesc} />
                </div>
                <div className={styles.buttonsWrapper}>
                    <p className={styles.error}>{error}</p>
                    <button className={styles.submit + (isSubmitReady() ? ` ${styles.submitReady}` : '')} onClick={handleSubmit}>Create</button>
                </div>
            </div>
        </div>
    )
}

/*
<div className={styles.contentNameWrapper + ' ' + styles.contentTypeWrapper}>
                        <label className={styles.CreateNameLabel}>Enter Name:</label>
                        <div className={styles.CreateNameInput}><CustomInput callback={setNewName} label='Team Name' type='text' name='teamName' color='#093a3e' borderColor='#ebf2fa' /></div>
                    </div>
                    <div className={styles.contentDescriptionWrapper + ' ' + styles.contentTypeWrapper}>
                        <textarea onChange={(e) => {setTeamDesc(e.target.value)}} placeholder='Enter a Description' className={styles.CreateDescriptionInput}></textarea>
                    </div>
*/