import { useContext, useState } from 'react'
import { Context } from '../context/ThemeContext'
import CSS from 'csstype'
import styles from '../../assets/css/teams/components/teamsAdd.module.css'
import CustomDroplist from '../CustomDroplist'
import CustomInput from '../CustomInput'

export default function TeamsAdd() {
    const theme = useContext(Context)

    const [selected, setSelected] = useState(0)
    const [search, setSearch] = useState('')

    const inlineStyles: {[key: string]: CSS.Properties} = {
        "mainContainer": {
            backgroundColor: theme.background
        },
        "title": {
            color: theme.glowBase, 
            textShadow: theme.glowLight
        }
    }

    const payload = [
        {id: Math.floor(Math.random() * 1000000), name: 'Dev'},
        {id: Math.floor(Math.random() * 1000000), name: 'Management'},
        {id: Math.floor(Math.random() * 1000000), name: 'HR'},
        {id: Math.floor(Math.random() * 1000000), name: 'Backend'},
        {id: Math.floor(Math.random() * 1000000), name: 'Frontend'}
    ]

    return (
        <div className={styles.gridItemWrapper}>
            <div className={styles.mainContainer} style={inlineStyles.mainContainer}>
                <div className={styles.headerWrapper}>
                    <div className={styles.droplistWrapper}><CustomDroplist selected={selected} payload={payload} callback={setSelected} relativeContainerWidth={40} relativeContainerUnits='%'/></div>
                    <p className={styles.title} style={inlineStyles.title}>Add Team Member</p>
                </div>
            </div>
        </div>
    )
}