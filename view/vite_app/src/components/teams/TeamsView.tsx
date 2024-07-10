import { useContext, useEffect, useState } from 'react'
import styles from '../../assets/css/teams/components/teamsView.module.css'
import { Context } from '../context/ThemeContext'
import CSS from 'csstype'
import CustomDroplist from '../CustomDroplist'

export default function TeamsView() {
    const [teams, setTeams] = useState<{id: string, name: string}[]>([{id: '5234612435', name: 'Frontend'}, {id: '346245234523', name: 'Backend'}])
    const [members, setMembers] = useState<{id: string, name: string}[][]>([
        [{id: '08963435', name: 'Jamie Lannister'}, {id: '345236754', name: 'James Maslow'}],
        [{id: '09834502', name: 'Brendan Fraiser'}, {id: '987567754', name: 'Timothy Doan'}, {id: '7563456756', name: 'Norman Osborn'}, {id: '0985340923', name: 'Barry Allen'}],
    ])
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
        }
    }

    function updateSelectedMember(selection: number) {
        const newSelection = [...selectedMember]
        newSelection[selectedTeam] = selection
        setSelectedMember(newSelection)
    }

    function grabData() {
        // grab data
        // remember details of async and await functions!!!!!!!!

        const selectographer = []
        for (var i = 0; i < teams.length; i++) {
            selectographer.push(0)
        }
        setSelectedMember(selectographer)
    }

    useEffect(() => {
        grabData()
    }, [])

    return (
        <div className={styles.gridItemWrapper}>
            <div className={styles.mainContainer} style={inlineStyles.mainContainer}>
                <div className={styles.titleContainer}>
                    <div className={styles.droplistWrapper}><CustomDroplist selected={selectedTeam} payload={teams} callback={setSelectedTeam} color={theme.primary.highlight} highlight={theme.primary.header} relativeContainerWidth={20} relativeContainerUnits='em'/></div>
                    <p className={styles.title} style={inlineStyles.title}>View Your Crews</p>
                </div>
                <div className={styles.memberContainer}>
                    <div className={styles.memberTitleContainer} style={inlineStyles.memberTitleContainer}>
                        <h2 className={styles.memberTitle} style={inlineStyles.memberTitle}>Crew Members</h2>
                        <div className={styles.userDroplistWrapper}><CustomDroplist selected={selectedMember[selectedTeam]} payload={members[selectedTeam]} callback={updateSelectedMember} relativeContainerWidth={20} relativeContainerUnits='em'/></div>
                    </div>
                </div>
                <div className={styles.roleContainer}>
                    <div className={styles.roleTitleContainer} style={inlineStyles.memberTitleContainer}>
                        <h2 className={styles.roleTitle} style={inlineStyles.memberTitle}>Role Call</h2>
                        <div className={styles.roleSelectedWrapper}>
                            <label className={styles.roleSelectedLabel} style={inlineStyles.roleSelectedLabel}>Currently Viewing</label>
                            <div className={styles.roleSelectedContainer} style={inlineStyles.roleSelectedContainer}>
                                <p className={styles.roleSelectedMember} style={inlineStyles.roleSelectedMember}>{members[selectedTeam][selectedMember[selectedTeam]].name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}