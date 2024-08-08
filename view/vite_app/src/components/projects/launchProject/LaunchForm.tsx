import { MouseEvent, useContext, useEffect, useState } from 'react'
import styles from '../../../assets/css/projects/launch.module.css'
import CSS from 'csstype'
import { Context } from '../../../pages/Layout'
import { themes } from '../../../theme'
import CustomDroplist from '../../CustomDroplist'
import { PayloadItem } from '../../CustomDroplist'
import CustomInput from '../../CustomInput'
import useError from '../../../hooks/useError'
import { fetchToApi } from '../../../globals'

export default function LaunchForm() {
    // @ts-ignore
    const [theme, mode, fetchTheme] = useContext(Context)
    const [error, throwError] = useError()

    const [name, setName] = useState<string>('')
    const [selectedTeam, setSelectedTeam] = useState<number>(0)
    // @ts-ignore
    const [teams, setTeams] = useState<PayloadItem[]>([])

    const inlineStyles: {[key: string]: CSS.Properties} = {
        "launchContainer": {
            background: themes[mode][theme].boxGradient,
            border: themes[mode][theme].glassBorder,
            boxShadow: themes[mode][theme].glassShadow
        },
        "title": {
            color: themes[mode][theme].primary.header
        },
        "teamContainerTitle": {
            color: themes[mode][theme].primary.subheader
        },
        "nameContainerTitle": {
            color: themes[mode][theme].primary.subheader
        },
        "launchButton": {
            color: 'lightgray',
            backgroundColor: themes[mode][theme].primary.quaternary
        },
        "launchButtonReady": {
            color: themes[mode][theme].primary.subheader,
            backgroundColor: themes[mode][theme].primary.header
        }
    }

    function isLaunchReady(): boolean {
        return name.trim() !== ''
    }

    async function grabTeams() {
        await fetchToApi('/v1/teams/create/', 'GET', []).then(response => {
            if (response.error !== undefined) {
                throwError(response.error)
                return
            }
            
            if (response.success) {
                let teamData: PayloadItem[] = [];

                (JSON.parse(response.teams) as Array<{pk: string, fields: {name: string}}>).forEach((team) => {
                    teamData.push({
                        id: team.pk,
                        name: team.fields.name,
                        title: team.fields.name
                    })
                })

                setTeams(teamData)
                setSelectedTeam(0)
            }
        })
    }

    async function handleLaunch(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        if (!isLaunchReady()) {
            throwError('Make a title for your new project first')
            return
        }

        // create project logic
        const meta: Array<[string, string | Blob]> = [
            ['team', teams[selectedTeam].id as string],
            ['title', name]
        ]

        await fetchToApi("/v1/projects/project/", "POST", meta).then(response => {
            if (response.error !== undefined) {
                throwError(response.error)
            }
        })
    }

    useEffect(() => {
        grabTeams()
    }, [])

    return (
        <div className={styles.mainContainer}>
            <div className={styles.launchContainer} style={inlineStyles.launchContainer}>
                <div className={styles.titleContainer}>
                    <h2 style={inlineStyles.title}>Launch New Project</h2>
                </div>
                <div className={styles.teamContainer}>
                    <p style={inlineStyles.teamContainerTitle}>Select a Team</p>
                    <div className={styles.droplistWrapper}>
                        <CustomDroplist selected={selectedTeam} payload={teams} callback={setSelectedTeam} />
                    </div>
                </div>
                <div className={styles.nameContainer}>
                    <p style={inlineStyles.nameContainerTitle}>Create a Title</p>
                    <div className={styles.inputWrapper}>
                        <CustomInput label='Enter Project Title' type='text' name='name' init={name} callback={setName} />
                    </div>
                </div>
                <div className={styles.buttonsContainer}>
                    <p>{error}</p>
                    <button onClick={handleLaunch} style={isLaunchReady() ? inlineStyles.launchButtonReady : inlineStyles.launchButton}>Launch</button>
                </div>
            </div>
        </div>
    )
}