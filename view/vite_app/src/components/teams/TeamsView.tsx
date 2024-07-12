import { MouseEvent, useContext, useEffect, useState } from 'react'
import styles from '../../assets/css/teams/components/teamsView.module.css'
import { Context } from '../context/ThemeContext'
import CSS from 'csstype'
import CustomDroplist, { PayloadItem } from '../CustomDroplist'
import { FiUser } from "react-icons/fi"
import { fetchToApi } from '../../globals'
import useError from '../../hooks/useError'
import { Confirm } from '../misc/ConfirmModal'

export default function TeamsView({ fetch, triggerFetch, setModal } : { fetch: boolean, triggerFetch: () => void, setModal: (slug: Confirm) => void}) {
    const [error, throwError] = useError('')
    const [teams, setTeams] = useState<PayloadItem[]>([])
    const [members, setMembers] = useState<Array<PayloadItem[]>>([[]])
    const [selectedTeam, setSelectedTeam] = useState<number>(0)
    const [selectedMember, setSelectedMember] = useState<number[]>([0])

    const theme = useContext(Context)

    const inlineStyles: {[key: string]: CSS.Properties} = {
        "mainContainer": {
            backgroundColor: theme.background
        },
        "title": {
            color: theme.glowBase,
            textShadow: theme.glowLight
        },
        "memberTitleContainer": {
            borderBottomColor: theme.primary.tertiary
        },
        "memberTitle": {
            color: theme.primary.highlight
        },
        "roleSelectedLabel": {
            color: theme.primary.quaternary
        },
        "roleSelectedContainer": {
            borderColor: theme.primary.tertiary
        },
        "roleSelectedMember": {
            color: theme.primary.highlight
        }, 
        "pic": {
            borderColor: theme.primary.header
        },
        "icon": {
            color: theme.primary.highlight
        },
        "bioTitle": {
            color: theme.primary.header
        },
        "bioItem": {
            color: theme.primary.highlight
        },
        "statsButton": {
            borderColor: theme.primary.highlight,
            color: theme.primary.subheader
        },
        "error": {
            color: theme.error
        }
    }

    function updateSelectedMember(selection: number) {
        const newSelection = [...selectedMember]
        newSelection[selectedTeam] = selection
        setSelectedMember(newSelection)
    }

    async function grabData() {
        await fetchToApi("/v1/teams/view/", "GET", []).then((response) => {
            if (response.error !== undefined) {
                throwError(response.error)
                return
            }
    
            const newMembers = response.members
            for (var i = 0; i < newMembers.length; i++) {
                for (var j = 0; j < newMembers[i].length; j++) {
                    newMembers[i][j]['name'] = `${newMembers[i][j]['last']}, ${newMembers[i][j]['first']}`
                }
            }

            setSelectedTeam(0)
            updateSelectedMember(0)
            setTeams(response.crew)
            setMembers(newMembers)
    
            const selectographer = []
            for (var i = 0; i < teams.length; i++) {
                selectographer.push(0)
            }
            setSelectedMember(selectographer)
        })
    }

    async function disbandCrew() {
        const meta: Array<[string, string | Blob]> = [
            ['id', teams[selectedTeam].id as string]
        ]

        await fetchToApi("/v1/teams/create/", "DELETE", meta).then(response => {
            if (response.success) {
                throwError(`${teams[selectedTeam].name} was Disbanded`)
                triggerFetch()
                return
            }

            throwError(response.error)
        })
    }

    async function dropMember() {
        const meta: Array<[string, string | Blob]> = [
            ['id', teams[selectedTeam].id as string],
            ['username', members[selectedTeam][selectedMember[selectedTeam]].username]
        ]

        await fetchToApi("/v1/teams/view/", "DELETE", meta).then(response => {
            if (response.success) {
                throwError(`${members[selectedTeam][selectedMember[selectedTeam]].name} was dropped from this crew`)
                const deleteIdx: number = selectedMember[selectedTeam]
                updateSelectedMember(Math.max(deleteIdx - 1, 0))
                const newMembers = [...members]
                newMembers[selectedTeam].splice(deleteIdx, 1)
                setMembers(newMembers)
                return
            }

            throwError(response.error)
        })
    }

    function handleDisband(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        setModal({
            title: 'Are You Sure?',
            message: 'This will permanently delete this crew. THIS ACTION CANNOT BE UNDONE!',
            question: 'Do you still want to continue?',
            callback: disbandCrew
        })
    }

    function handleDrop(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        setModal({
            title: 'Are You Sure?',
            message: 'This will remove this member from this crew unless they are manually re-added.',
            question: 'Do you still want to continue?',
            callback: dropMember
        })
    }

    useEffect(() => {
        grabData()
    }, [])

    useEffect(() => {
        grabData()
    }, [fetch])

    return (
        <div className={styles.gridItemWrapper}>
            <div className={styles.mainContainer} style={inlineStyles.mainContainer}>
                <div className={styles.titleContainer}>
                    <div className={styles.droplistWrapper}><CustomDroplist selected={selectedTeam} payload={teams} callback={setSelectedTeam} color={theme.primary.highlight} highlight={theme.primary.header} relativeContainerWidth={20} relativeContainerUnits='em'/></div>
                    <p className={styles.title} style={inlineStyles.title}>View Your Crews</p>
                </div>
                <div className={styles.deleteWrapper}><button className={styles.delete} onClick={handleDisband}>Disband</button></div>
                <div className={styles.memberContainer}>
                    <div className={styles.memberTitleContainer} style={inlineStyles.memberTitleContainer}>
                        <h2 className={styles.memberTitle} style={inlineStyles.memberTitle}>Crew Members</h2>
                        <div className={styles.userDroplistWrapper}><CustomDroplist selected={selectedMember[selectedTeam]} payload={members[selectedTeam]} callback={updateSelectedMember} relativeContainerWidth={20} relativeContainerUnits='em'/></div>
                    </div>
                    <div className={styles.memberBody}>
                        <div className={styles.picContainer}>
                            <div className={styles.pic} style={inlineStyles.pic}>
                                <FiUser className={styles.icon} style={inlineStyles.icon} />
                            </div>
                            <a className={styles.profileLink}>View Profile</a>
                        </div>
                        <div className={styles.bioContainer}>
                            {
                                members[selectedTeam][selectedMember[selectedTeam]] !== undefined ? 
                                <>
                                    <p className={styles.bioTitle} style={inlineStyles.bioTitle}>Member Name</p>
                                    <p className={styles.bioItem} style={inlineStyles.bioItem}>{members[selectedTeam][selectedMember[selectedTeam]].name}</p>
                                    <p className={styles.bioTitle} style={inlineStyles.bioTitle}>Tag</p>
                                    <p className={styles.bioItem} style={inlineStyles.bioItem}>{`#${members[selectedTeam][selectedMember[selectedTeam]].username}`}</p>
                                    <p className={styles.bioTitle} style={inlineStyles.bioTitle}>Email</p>
                                    <p className={styles.bioItem} style={inlineStyles.bioItem}>{members[selectedTeam][selectedMember[selectedTeam]].email}</p>

                                    <div className={styles.statsButtonContainer}>
                                        <button className={styles.statsButton} style={inlineStyles.statsButton}>View Statistics</button>
                                        <button className={styles.dropButton} onClick={handleDrop}>Drop This Member</button>
                                    </div>
                                </> :
                                <></>
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.roleContainer}>
                    <div className={styles.roleTitleContainer} style={inlineStyles.memberTitleContainer}>
                        <h2 className={styles.roleTitle} style={inlineStyles.memberTitle}>Role Call</h2>
                        <div className={styles.roleSelectedWrapper}>
                            <label className={styles.roleSelectedLabel} style={inlineStyles.roleSelectedLabel}>Currently Viewing</label>
                            <div className={styles.roleSelectedContainer} style={inlineStyles.roleSelectedContainer}>
                                <p className={styles.roleSelectedMember} style={inlineStyles.roleSelectedMember}>{members.length !== 0 && members[selectedTeam].length !== 0 && members[selectedTeam][selectedMember[selectedTeam]] !== undefined ? members[selectedTeam][selectedMember[selectedTeam]].name : 'Select a Member'}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.roleBody}>
                        
                    </div>
                </div>
                <div className={styles.errorWrapper}>
                    <p className={styles.error} style={inlineStyles.error}>{error}</p>
                </div>
            </div>
        </div>
    )
}