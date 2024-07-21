import styles from '../../assets/css/teams/components/teamsCreate.module.css'
import CustomInput from '../CustomInput'
import { MouseEvent, useEffect, useState, useContext } from 'react'
import CSS from 'csstype'
import { fetchToApi } from '../../globals'
import useError from '../../hooks/useError'
import { themes } from '../../theme'
import { Context } from '../../pages/Layout'

function NewName({ value, setValue } : { value: string, setValue: (arg1: string) => void }) {
    // @ts-ignore Ignore unused setTheme
    const [ selectedTheme, selectedMode, grabTheme ] = useContext(Context)

    useEffect(() => {
        grabTheme()
    }, [])

    return (
        <div className={styles.contentNameWrapper + ' ' + styles.contentTypeWrapper} style={{borderColor: themes[selectedMode][selectedTheme].primary.tertiary}}>
            <div className={styles.CreateNameLabelWrapper}><label className={styles.CreateNameLabel}>Enter Name:</label></div>
            <div className={styles.CreateNameInput}><CustomInput init={value} callback={setValue} label='' type='text' name='teamName' /></div>
        </div>
    )
}

function NewDescription({ value, setValue } : { value: string, setValue: (arg1: string) => void }) {
    // @ts-ignore Ignore unused setTheme
    const [ selectedTheme, selectedMode, grabTheme ] = useContext(Context)

    useEffect(() => {
        grabTheme()
    }, [])

    return (
        <div className={styles.contentDescriptionWrapper + ' ' + styles.contentTypeWrapper} style={{borderColor: themes[selectedMode][selectedTheme].primary.tertiary}}>
            <textarea value={value} onChange={(e) => {setValue(e.target.value)}} placeholder='Enter a Description' className={styles.CreateDescriptionInput}></textarea>
        </div>
    )
}

export default function TeamsCreate({ fetch, triggerFetch } : { fetch: boolean, triggerFetch: () => void }) {
    const [newName, setNewName] = useState<string>('')
    const [teamDesc, setTeamDesc] = useState<string>('')
    const [error, throwError] = useError('')
    // @ts-ignore Ignore unused setTheme
    const [ selectedTheme, selectedMode, grabTheme ] = useContext(Context)
    
    const inlineStyles: {[key: string]: CSS.Properties} = {
        "mainContainer": {
            background: themes[selectedMode][selectedTheme].boxGradient,
            backdropFilter: themes[selectedMode][selectedTheme].backgroundBlur,
            border: themes[selectedMode][selectedTheme].glassBorder
        },
        "containerHeader": {
            color: themes[selectedMode][selectedTheme].glowBase, 
            textShadow: themes[selectedMode][selectedTheme].glowLight,
            background: themes[selectedMode][selectedTheme].backgroundContrast
        },
        "submit": {
            backgroundColor: '#ffffff00',
            borderColor: themes[selectedMode][selectedTheme].primary.subtext,
            color: themes[selectedMode][selectedTheme].primary.subtext
        },
        "submitReady": {
            backgroundColor: themes[selectedMode][selectedTheme].primary.subtext,
            color: themes[selectedMode][selectedTheme].primary.highlight
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
            throwError('Team Created')
            triggerFetch()
            return
        }

        if (response.error !== undefined) {
            throwError(response.error)
        }
        else {
            throwError('Fatal Error')
        }
    }

    useEffect(() => {
        // do something
    }, [fetch])

    return (
        <div className={styles.gridItemWrapper}>
            <div className={styles.mainContainer} style={inlineStyles.mainContainer}>
                <div className={styles.containerHeaderWrapper}>
                    <p className={styles.containerHeader} style={inlineStyles.containerHeader}>Create New Team</p>
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