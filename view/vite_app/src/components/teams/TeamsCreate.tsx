import styles from '../../assets/css/teams/components/teamsCreate.module.css'
import CustomInput from '../CustomInput'
import { useContext, useState } from 'react'
import CSS from 'csstype'
import { Context, Theme } from '../context/ThemeContext'

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
    const [error, setError] = useState<string>('')

    const theme: Theme = useContext(Context)
    
    const inlineStyles: {[key: string]: CSS.Properties} = {
        "mainContainer": {
            backgroundColor: theme.background
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

    function throwError(err: string): void {
        setError(err)

        setTimeout(() => {
            setError('')
        }, 8000)
    }

    function isSubmitReady() {
        return newName !== '' && teamDesc !== ''
    }

    function handleSubmit() {
        if (!isSubmitReady()) {
            throwError('Check your values.')
        }
    }

    return (
        <div className={styles.gridItemWrapper}>
            <div className={styles.mainContainer} style={inlineStyles.mainContainer}>
                <div className={styles.containerHeaderWrapper}>
                    <p className={styles.containerHeader} style={{color: theme.glowBase, textShadow: theme.glowLight}}>Create New Team</p>
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

/*
`text-shadow: 1px 1px 12px #bcd1ce, -1px -1px 12px #bcd1ce,
            1px -1px 12px #bcd1ce, -1px 1px 12px #bcd1ce,
            0px 0px 2px #bcd1ce, 0px 0px 3px #bcd1ce, 0px 0px 4px #bcd1ce,
            0px 0px 10px #8fc7bf, 0px 0px 20px #8fc7bf, 0px 0px 40px #8fc7bf,
            0px 0px 50px #8fc7bf, 0px 0px 70px #8fc7bf, 0px 0px 100px #8fc7bf`
*/