import { ChangeEvent, MouseEvent, useContext, useState } from 'react'
import styles from '../../assets/css/projects/components/members.module.css'
import CSS from 'csstype'
import { Context } from '../../pages/Layout'
import { themes } from '../../theme'
import { FiX } from 'react-icons/fi'

const STRING_TRIM_LIMIT: number = 18

interface Member {
    id: string
    name: string
    email: string
}

interface Props {
    active: boolean
    setActive: (active: boolean) => void
}

export default function Members({ active, setActive } : Props) {
    // @ts-ignore
    const [theme, mode, fetchTheme] = useContext(Context)

    // @ts-ignore
    const [rawAddData, setRawAddData] = useState<Member[]>([])
    // @ts-ignore
    const [rawDropData, setRawDropData] = useState<Member[]>([])
    const [dropable, setDropable] = useState<Member[]>([])
    const [addable, setAddable] = useState<Member[]>([])

    const inlineStyles: {[key: string]: CSS.Properties} = {
        "mainWrapper": {
            background: themes[mode][theme].glassBackground,
            border: themes[mode][theme].glassBorder,
            boxShadow: themes[mode][theme].glassShadow
        },
        "titleWrapper": {
            background: themes[mode][theme].backgroundContrast
        },
        "title": {
            color: themes[mode][theme].glowBase,
            textShadow: themes[mode][theme].glowLight
        },
        "bodyTitle": {
            color: themes[mode][theme].primary.header
        },
        "cancelButton": {
            color: 'lightgray',
            backgroundColor: themes[mode][theme].primary.quaternary
        },
        "cancelButtonReady": {
            color: 'darkslategrey',
            backgroundColor: themes[mode][theme].primary.subheader
        },
        "saveButton": {
            color: 'lightgray',
            backgroundColor: themes[mode][theme].primary.quaternary
        },
        "saveButtonReady": {
            color: themes[mode][theme].primary.subheader,
            backgroundColor: themes[mode][theme].primary.header
        }
    }

    function stringTrimmer(str: string | number): string {
        if ((str as string).length > STRING_TRIM_LIMIT) {
            return `${(str as string).substring(0, STRING_TRIM_LIMIT - 3)}...`
        }

        return str as string
    }

    function toggleModal(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        setActive(!active)
    }

    function isSubmitReady(): boolean {
        return addable.length !== 0 || dropable.length !== 0
    }

    function handleDropChange(e: ChangeEvent<HTMLInputElement>, idx: number) {
        if (e.target.checked) {
            const newItem: Member = dropable[idx]
            const newArray: Member[] = [...dropable]
            newArray.push(newItem)
            setDropable(newArray)
            return  // Return statement very important here!!!
        }

        const oldItem: Member = dropable[idx]
        const newArray: Member[] = [...dropable]
        const itemIdx: number = newArray.indexOf(oldItem)

        if (itemIdx > -1) {
            newArray.splice(itemIdx, 1)
            setDropable(newArray)
        }
    }

    function handleAddChange(e: ChangeEvent<HTMLInputElement>, idx: number) {
        if (e.target.checked) {
            const newItem: Member = addable[idx]
            const newArray: Member[] = [...addable]
            newArray.push(newItem)
            setAddable(newArray)
            return  // Return statement very important here!!!
        }

        const oldItem: Member = addable[idx]
        const newArray: Member[] = [...addable]
        const itemIdx: number = newArray.indexOf(oldItem)

        if (itemIdx > -1) {
            newArray.splice(itemIdx, 1)
            setAddable(newArray)
        }
    }

    function handleCancel(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        if (!isSubmitReady())
            return

        setAddable([])
        setDropable([])
    }

    function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        if (!isSubmitReady())
            return

        // add/drop member(s) logic
    }

    return (
        <div className={styles.mainContainer} style={{display: active ? '' : 'none'}}>
            <div className={styles.mainWrapper} style={inlineStyles.mainWrapper}>
                <div className={styles.headerContainer}>
                    <div className={styles.titleWrapper} style={inlineStyles.titleWrapper}>
                        <p style={inlineStyles.title}>Edit Members</p>
                    </div>
                    <button onClick={toggleModal} className={styles.closeButton}>
                        <FiX size={18} />
                    </button>
                </div>
                <div className={styles.bodyContainer}>
                    <div className={styles.bodyTitleWrapper}>
                        <p style={inlineStyles.bodyTitle}>Add Members</p>
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
                                rawAddData.map((item: Member, idx: number) => {
                                    return (
                                        <div id={item.id as string} className={styles.resultItem} style={inlineStyles.resultItem}>
                                            <div><input type='checkbox' onChange={e => { handleAddChange(e, idx) }} style={inlineStyles.checkbox}/></div>
                                            <div><p>{stringTrimmer(item.id)}</p></div>
                                            <div><p>{stringTrimmer(item.name)}</p></div>
                                            <div><p>{stringTrimmer(item.email)}</p></div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={styles.bodyTitleWrapper}>
                        <p style={inlineStyles.bodyTitle}>Drop Members</p>
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
                                rawDropData.map((item: Member, idx: number) => {
                                    return (
                                        <div id={item.id as string} className={styles.resultItem} style={inlineStyles.resultItem}>
                                            <div><input type='checkbox' onChange={e => { handleDropChange(e, idx) }} style={inlineStyles.checkbox}/></div>
                                            <div><p>{stringTrimmer(item.id)}</p></div>
                                            <div><p>{stringTrimmer(item.name)}</p></div>
                                            <div><p>{stringTrimmer(item.email)}</p></div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.footerContainer}>
                    <button onClick={handleCancel} style={isSubmitReady() ? inlineStyles.cancelButtonReady : inlineStyles.cancelButton}>Cancel</button>
                    <button onClick={handleSubmit} style={isSubmitReady() ? inlineStyles.saveButtonReady : inlineStyles.saveButton}>Save</button>
                </div>
            </div>
        </div>
    )
} 