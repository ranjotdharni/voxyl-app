import { ChangeEvent, useContext, useState } from 'react'
import { Context } from '../context/ThemeContext'
import CSS from 'csstype'
import styles from '../../assets/css/teams/components/teamsAdd.module.css'
import CustomDroplist from '../CustomDroplist'
import CustomInput from '../CustomInput'

const STRING_TRIM_LIMIT: number = 18

interface Result {
    id: string | number,
    name: string,
    email: string
}

export default function TeamsAdd() {
    const theme = useContext(Context)

    const [selected, setSelected] = useState<number>(0)
    const [search, setSearch] = useState<string>('')
    const [searchResults, setSearchResults] = useState<Result[]>([{id: 345675893474567, name: 'Frontend', email: 'asdasd@gmail.com'}])
    const [selectedResults, setSelectedResults] = useState<Result[]>([])

    const inlineStyles: {[key: string]: CSS.Properties} = {
        "mainContainer": {
            backgroundColor: theme.background
        },
        "title": {
            color: theme.glowBase, 
            textShadow: theme.glowLight
        },
        "submitButton": {
            backgroundColor: theme.background,
            color: theme.primary.subtext,
            borderColor: theme.primary.subtext,
        },
        "submitButtonReady": {
            backgroundColor: theme.primary.subtext,
            color: theme.primary.highlight,
            borderColor: '#ffffff00',
        },
        "addButton": {
            backgroundColor: theme.background,
            color: theme.primary.subtext,
            borderColor: theme.primary.subtext,
        },
        "addButtonReady": {
            backgroundColor: theme.primary.subtext,
            color: theme.primary.highlight,
            borderColor: '#ffffff00',
        },
        "searchResults": {
            border: `solid 1px ${theme.primary.tertiary}`
        },
        "resultHeader": {
            borderBottomColor: theme.primary.tertiary
        },
        "resultHeaderItem": {
            borderLeftColor: theme.primary.tertiary,
            borderRightColor: theme.primary.tertiary
        },
        "resultHeaderItemText": {
            color: theme.primary.subtext
        },
        "resultItem": {
            borderBottomColor: theme.primary.subtext
        },
        "checkbox": {
            accentColor: theme.primary.highlight
        }
    }

    const payload = [
        {id: 234523456876567, name: 'Dev'},
        {id: 745745673456346, name: 'Management'},
        {id: 123453145234564, name: 'HR'},
        {id: 845846734563456, name: 'Backend'},
        {id: 345675675474567, name: 'Frontend'}
    ]

    function stringTrimmer(str: string | number): string {
        if ((str as string).length > STRING_TRIM_LIMIT) {
            return `${(str as string).substring(0, STRING_TRIM_LIMIT - 3)}...`
        }

        return str as string
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>, idx: number) {
        if (e.target.checked) {
            const newItem: Result = searchResults[idx]
            const newArray: Result[] = selectedResults
            newArray.push(newItem)
            setSelectedResults(newArray)
            return  // Return statement very important here!!!
        }

        const oldItem: Result = searchResults[idx]
        const newArray: Result[] = selectedResults
        const itemIdx: number = newArray.indexOf(oldItem)

        if (itemIdx > -1) {
            newArray.splice(itemIdx, 1)
            setSelectedResults(newArray)
        }
    }

    return (
        <div className={styles.gridItemWrapper}>
            <div className={styles.mainContainer} style={inlineStyles.mainContainer}>
                <div className={styles.headerWrapper}>
                    <div className={styles.droplistWrapper}><CustomDroplist selected={selected} payload={payload} callback={setSelected} relativeContainerWidth={40} relativeContainerUnits='%'/></div>
                    <p className={styles.title} style={inlineStyles.title}>Add Team Member</p>
                </div>
                <div className={styles.searchBar}>
                    <div className={styles.inputWrapper}><CustomInput label='Search User by Id, Name, Email' type='text' name='search' init={search} color={theme.primary.highlight} callback={setSearch} /></div>
                    <button className={styles.submitButton} style={(search.trim() !== '' ? inlineStyles.submitButtonReady : inlineStyles.submitButton)}>Search</button>
                </div>
                <div className={styles.searchResults} style={inlineStyles.searchResults}>
                    <div className={styles.resultHeader} style={inlineStyles.resultHeader}>
                        <div style={inlineStyles.resultHeaderItem}></div>
                        <div style={inlineStyles.resultHeaderItem}><p style={inlineStyles.resultHeaderItemText}>Id</p></div>
                        <div style={inlineStyles.resultHeaderItem}><p style={inlineStyles.resultHeaderItemText}>Name</p></div>
                        <div style={inlineStyles.resultHeaderItem}><p style={inlineStyles.resultHeaderItemText}>Email</p></div>
                    </div>
                    <div className={styles.resultWrapper}>
                        {
                            searchResults.map((item: Result, idx: number) => {
                                return (
                                    <div id={item.id as string} className={styles.resultItem} style={inlineStyles.resultItem}>
                                        <div><input type='checkbox' onChange={e => { handleChange(e, idx) }} style={inlineStyles.checkbox}/></div>
                                        <div><p>{stringTrimmer(item.id)}</p></div>
                                        <div><p>{stringTrimmer(item.name)}</p></div>
                                        <div><p>{stringTrimmer(item.email)}</p></div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={styles.addWrapper}>
                    <button className={styles.addButton} style={(search.trim() !== '' ? inlineStyles.addButtonReady : inlineStyles.addButton)}>Add</button>
                </div>
            </div>
        </div>
    )
}