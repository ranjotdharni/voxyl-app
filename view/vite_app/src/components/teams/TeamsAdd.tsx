import { useState } from 'react'
import styles from '../../assets/css/teams/components/teamsAdd.module.css'
import CustomDroplist from '../CustomDroplist'
import CustomInput from '../CustomInput'

export default function TeamsAdd() {
    const [selected, setSelected] = useState(0)
    const [search, setSearch] = useState('')

    const payload = [
        {id: Math.floor(Math.random() * 1000000), name: 'Dev'},
        {id: Math.floor(Math.random() * 1000000), name: 'Management'},
        {id: Math.floor(Math.random() * 1000000), name: 'HR'},
        {id: Math.floor(Math.random() * 1000000), name: 'Backend'},
        {id: Math.floor(Math.random() * 1000000), name: 'Frontend'}
    ]

    return (
        <div className={styles.gridItemWrapper}>
            <div className={styles.mainContainer + ' basicContainer'}>
                <div className={styles.headerWrapper}>
                    <p className={styles.header}>Add Team Members</p>
                </div>
                <div className={styles.configWrapper}>
                    <div className={styles.droplistWrapper}><CustomDroplist selected={selected} payload={payload} callback={setSelected} /></div>
                    <div className={styles.searchWrapper}><div className={styles.searchContainer}><CustomInput label='Username' type='text' name='search' color='#ebf2fa' borderColor='#ffffff' init={search} callback={setSearch} /></div></div>
                </div>
                <div className={styles.listWrapper}>

                </div>
                <div className={styles.buttonsWrapper}>

                </div>
            </div>
        </div>
    )
}