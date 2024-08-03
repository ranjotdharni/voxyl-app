import { MouseEvent, useEffect, useState, useContext } from 'react'
import { Context } from '../../pages/Layout'
import styles from '../../assets/css/teams/components/teamsView.module.css'
import CSS from 'csstype'
import CustomDroplist, { PayloadItem } from '../CustomDroplist'
import { FiUser } from "react-icons/fi"
import { fetchToApi, generateArray, generateGlow, inclusiveRandomInteger, PERMISSIONS } from '../../globals'
import useError from '../../hooks/useError'
import { Confirm } from '../misc/ConfirmModal'
import RadioList from '../misc/RadioList'
import FloatingParticle from '../misc/FloatingParticle'
import { themes } from '../../theme'

export default function TeamsView({ fetch, triggerFetch, setModal } : { fetch: boolean, triggerFetch: () => void, setModal: (slug: Confirm) => void}) {
    const [error, throwError] = useError('')
    const [teams, setTeams] = useState<PayloadItem[]>([])
    const [members, setMembers] = useState<Array<PayloadItem[]>>([[]])
    const [selectedTeam, setSelectedTeam] = useState<number>(0)
    const [selectedMember, setSelectedMember] = useState<number[]>([0])
    const [subjectPermissionLevel, setSubjectPermissionLevel] = useState<number>(0)
    const [selectedPermissionLevel, setSelectedPermissionLevel] = useState<number>(0)
    // @ts-ignore Ignore unused setTheme
    const [ selectedTheme, selectedMode, grabTheme ] = useContext(Context)

    const inlineStyles: {[key: string]: CSS.Properties} = {
        "mainContainer": {
            background: themes[selectedMode][selectedTheme].boxGradient,
            backdropFilter: themes[selectedMode][selectedTheme].backgroundBlur,
            border: themes[selectedMode][selectedTheme].glassBorder
        },
        "title": {
            color: themes[selectedMode][selectedTheme].glowBase,
            textShadow: themes[selectedMode][selectedTheme].glowLight,
            background: themes[selectedMode][selectedTheme].backgroundContrast
        },
        "memberTitleContainer": {
            borderBottomColor: themes[selectedMode][selectedTheme].primary.tertiary
        },
        "memberTitle": {
            color: themes[selectedMode][selectedTheme].primary.highlight
        },
        "roleSelectedLabel": {
            color: themes[selectedMode][selectedTheme].primary.quaternary
        },
        "roleSelectedContainer": {
            borderColor: themes[selectedMode][selectedTheme].primary.tertiary,
            backgroundColor: themes[selectedMode][selectedTheme].backgroundOpaque
        },
        "roleSelectedMember": {
            color: themes[selectedMode][selectedTheme].glowBase,
            textShadow: (subjectPermissionLevel !== 0 ? generateGlow(themes[selectedMode][selectedTheme].glowBase, themes[selectedMode][selectedTheme].glowColor) : '')
        }, 
        "pic": {
            borderColor: themes[selectedMode][selectedTheme].primary.header
        },
        "icon": {
            color: themes[selectedMode][selectedTheme].primary.highlight
        },
        "bioTitle": {
            color: themes[selectedMode][selectedTheme].primary.header
        },
        "bioItem": {
            color: themes[selectedMode][selectedTheme].primary.highlight
        },
        "statsButton": {
            borderColor: themes[selectedMode][selectedTheme].primary.highlight,
            color: themes[selectedMode][selectedTheme].primary.subheader
        },
        "roleInputContainerTitle": {
            color: themes[selectedMode][selectedTheme].primary.header
        },
        "roleDescriptionContainerTitle": {
            color: themes[selectedMode][selectedTheme].primary.subtext
        },
        "roleDescriptionContainerDiv": {
            borderColor: themes[selectedMode][selectedTheme].primary.subtext
        },
        "cancelButton": {
            color: themes[selectedMode][selectedTheme].primary.subheader,
            backgroundColor: themes[selectedMode][selectedTheme].primary.tertiary,
        },
        "saveButton": {
            backgroundColor: (selectedPermissionLevel !== subjectPermissionLevel ? themes[selectedMode][selectedTheme].primary.header : themes[selectedMode][selectedTheme].primary.quaternary),
            color: (selectedPermissionLevel !== subjectPermissionLevel ? themes[selectedMode][selectedTheme].primary.highlight : themes[selectedMode][selectedTheme].primary.subheader)
        },
        "error": {
            color: themes[selectedMode][selectedTheme].error
        }
    }

    function updateSelectedMember(selection: number) {
        const newSelection = [...selectedMember]
        newSelection[selectedTeam] = selection
        setSelectedMember(newSelection)
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
                throwError(`${members[selectedTeam][selectedMember[selectedTeam]].name} was dropped from this team`)
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
            message: 'This will permanently delete this team. THIS ACTION CANNOT BE UNDONE!',
            question: 'Do you still want to continue?',
            callback: disbandCrew
        })
    }

    function handleDrop(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        setModal({
            title: 'Are You Sure?',
            message: 'This will remove this member from this team unless they are manually re-added.',
            question: 'Do you still want to continue?',
            callback: dropMember
        })
    }

    async function grabRole() {
        const meta: Array<[string, string | Blob]> = [
            ['id', teams[selectedTeam].id as string],
            ['user', members[selectedTeam][selectedMember[selectedTeam]].username]
        ]

        await fetchToApi('/v1/teams/role/', 'POST', meta).then(response => {
            if (response.success) {
                setSelectedPermissionLevel(response.level)
                setSubjectPermissionLevel(response.level)
                return
            }

            throwError(response.error)
        })
    }

    async function setRole() {
        const meta: Array<[string, string | Blob]> = [
            ['id', teams[selectedTeam].id as string],
            ['user', members[selectedTeam][selectedMember[selectedTeam]].username],
            ['level', selectedPermissionLevel]
        ]

        await fetchToApi('/v1/teams/role/', 'PUT', meta).then(response => {
            if (response.success) {
                setSubjectPermissionLevel(selectedPermissionLevel)
                return
            }

            throwError(response.error)
        })
    }

    function restoreRole() {
        setSelectedPermissionLevel(subjectPermissionLevel)
    }

    function updateRole() {
        if (selectedPermissionLevel === subjectPermissionLevel)
            return

        if (subjectPermissionLevel === PERMISSIONS.length - 1) {
            throwError('Owner may not demote themself, transfer ownership by assigning new Owner')
            return
        }

        if (selectedPermissionLevel === PERMISSIONS.length - 1) {
            setModal({
                title: 'Are You Sure?',
                message: `This will transfer ownership of the crew to ${members[selectedTeam][selectedMember[selectedTeam]].name}. THIS ACTION CANNOT BE UNDONE except by the existing Crew Chief!`,
                question: 'Do you still want to continue?',
                callback: setRole
            })

            return
        }

        setRole()
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

    useEffect(() => {
        grabData()
    }, [])

    useEffect(() => {
        grabData()
    }, [fetch])

    useEffect(() => {
        grabRole()
    }, [teams, members, selectedTeam, selectedMember])

    return (
        <div className={styles.gridItemWrapper}>
            <div className={styles.blurContainer}></div>
            <div className={styles.mainContainer} style={inlineStyles.mainContainer}>
                <div className={styles.titleContainer}>
                    <div className={styles.droplistWrapper}><CustomDroplist selected={selectedTeam} payload={teams} callback={setSelectedTeam} color={themes[selectedMode][selectedTheme].primary.highlight} highlight={themes[selectedMode][selectedTheme].primary.header} /></div>
                    <div className={styles.titleWrapper} style={inlineStyles.titleWrapper}>
                        <p className={styles.title} style={inlineStyles.title}>View Your Teams</p>
                    </div>
                </div>
                <div className={styles.deleteWrapper}><button className={styles.delete} onClick={handleDisband}>Disband</button></div>
                <div className={styles.memberContainer}>
                    <div className={styles.memberTitleContainer} style={inlineStyles.memberTitleContainer}>
                        <h2 className={styles.memberTitle} style={inlineStyles.memberTitle}>Team Members</h2>
                        <div className={styles.userDroplistWrapper}><CustomDroplist selected={selectedMember[selectedTeam]} payload={members[selectedTeam]} callback={updateSelectedMember} /></div>
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
                            <label className={styles.roleSelectedLabel} style={inlineStyles.roleSelectedLabel}>Role</label>
                            <div className={styles.roleSelectedContainer} style={inlineStyles.roleSelectedContainer}>
                                {
                                    generateArray(7).map(() => {
                                        return (
                                            <FloatingParticle particleWidth={inclusiveRandomInteger(1, 3)} width={inclusiveRandomInteger(25, 50)} duration={inclusiveRandomInteger(4, 12)} glowBase={themes[selectedMode][selectedTheme].glowBase} glowColor={themes[selectedMode][selectedTheme].glowColor} left={inclusiveRandomInteger(-15, 15)} />
                                        )
                                    })
                                }
                                <p className={styles.roleSelectedMember} style={inlineStyles.roleSelectedMember}>{members.length !== 0 && members[selectedTeam].length !== 0 && members[selectedTeam][selectedMember[selectedTeam]] !== undefined ? PERMISSIONS[subjectPermissionLevel].alias : '--------'}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.roleBody}>
                        <div className={styles.roleWrapper}>
                            <div className={styles.roleInputContainer}>
                                <h3 style={inlineStyles.roleInputContainerTitle}>Assign Roles</h3>
                                <div className={styles.roleInputList}>
                                    <RadioList 
                                        selected={selectedPermissionLevel} 
                                        items={PERMISSIONS.map(item => { return item.alias })}
                                        colors={PERMISSIONS.map(item => { return item.color })}
                                        itemHeight={10}
                                        bubbleDiameter='10px'
                                        bubbleColor={themes[selectedMode][selectedTheme].primary.highlight}
                                        backgroundColor={themes[selectedMode][selectedTheme].primary.tertiary} 
                                        callback={setSelectedPermissionLevel} />
                                </div>
                            </div>
                            <div className={styles.roleDescriptionContainer}>
                                <h4 style={inlineStyles.roleDescriptionContainerTitle}>Description</h4>
                                <div style={inlineStyles.roleDescriptionContainerDiv}>
                                    <p>{PERMISSIONS[selectedPermissionLevel].details}</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.roleButtonContainer}>
                            <button style={inlineStyles.cancelButton} onClick={restoreRole}>Cancel</button>
                            <button style={inlineStyles.saveButton} onClick={updateRole}>Save</button>
                        </div>
                    </div>
                </div>
                <div className={styles.errorWrapper}>
                    <p className={styles.error} style={inlineStyles.error}>{error}</p>
                </div>
            </div>
        </div>
    )
}