import styles from '../../assets/css/teams/components/teamsCreate.module.css'
import CustomInput from '../CustomInput'
import { MouseEvent, useContext, useState } from 'react'
import CSS from 'csstype'
import { Context, Theme } from '../context/ThemeContext'
import { fetchToApi } from '../../globals'
import useError from '../../hooks/useError'

function NewName({ value, setValue } : { value: string, setValue: (arg1: string) => void }) {
    const theme: Theme = useContext(Context)

    return (
        <div className={styles.contentNameWrapper + ' ' + styles.contentTypeWrapper} style={{borderColor: theme.primary.tertiary}}>
            <label className={styles.CreateNameLabel}>Enter Name:</label>
            <div className={styles.CreateNameInput}><CustomInput init={value} callback={setValue} label='' type='text' name='teamName' /></div>
        </div>
    )
}

function NewDescription({ value, setValue } : { value: string, setValue: (arg1: string) => void }) {
    const theme: Theme = useContext(Context)

    return (
        <div className={styles.contentDescriptionWrapper + ' ' + styles.contentTypeWrapper} style={{borderColor: theme.primary.tertiary}}>
            <textarea value={value} onChange={(e) => {setValue(e.target.value)}} placeholder='Enter a Description' className={styles.CreateDescriptionInput}></textarea>
        </div>
    )
}

export default function TeamsCreate() {
    const [newName, setNewName] = useState<string>('')
    const [teamDesc, setTeamDesc] = useState<string>('')
    const [error, throwError] = useError('')

    const theme: Theme = useContext(Context)
    
    const inlineStyles: {[key: string]: CSS.Properties} = {
        "mainContainer": {
            backgroundColor: theme.background
        },
        "containerHeader": {
            color: theme.glowBase, 
            textShadow: theme.glowLight
        },
        "submit": {
            backgroundColor: '#ffffff00',
            borderColor: theme.primary.subtext,
            color: theme.primary.subtext
        },
        "submitReady": {
            backgroundColor: theme.primary.subtext,
            color: theme.primary.highlight
        }
    }

    function isSubmitReady() {
        return newName !== '' && teamDesc !== ''
    }

    async function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        if (!isSubmitReady())
        {
            throwError('Please fill all fields.')
            return
        }

        const meta: Array<[string, string | Blob]> = [
            ['name', newName],
            ['desc', teamDesc],
        ]

        let response = await fetchToApi("/v1/teams/create/", "POST", meta)

        if (response.success) {
            throwError('Crew Created')
            return
        }

        if (response.error !== undefined) {
            throwError(response.error)
        }
        else {
            throwError('Fatal Error')
        }
    }

    return (
        <div className={styles.gridItemWrapper}>
            <div className={styles.mainContainer} style={inlineStyles.mainContainer}>
                <div className={styles.containerHeaderWrapper}>
                    <p className={styles.containerHeader} style={inlineStyles.containerHeader}>Create New Crew</p>
                </div>
                <div className={styles.contentWrapper}>
                    <NewName value={newName} setValue={setNewName}/>
                    <NewDescription value={teamDesc} setValue={setTeamDesc} />
                </div>
                <div className={styles.buttonsWrapper}>
                    <p className={styles.error}>{error}</p>
                    <button className={styles.submit + (isSubmitReady() ? ` ${styles.submitReady}` : '')} style={(isSubmitReady() ? inlineStyles.submitReady : inlineStyles.submit)} onClick={handleSubmit}>Create</button>
                </div>
            </div>
        </div>
    )
}