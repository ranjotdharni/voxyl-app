import styles from '../../assets/css/settings/components/themeEdit.module.css'
import CSS from 'csstype'
import { MouseEvent, useContext, useEffect, useState } from 'react'
import { Context } from '../../pages/Layout'
import { themes } from '../../theme'
import RadioList from '../misc/RadioList'
import { fetchToApi } from '../../globals'

export default function ThemeEdit() {
    // @ts-ignore Ignore unused setTheme
    const [ selectedTheme, selectedMode, grabTheme ] = useContext(Context)
    const [subjectMode, setSubjectMode] = useState<number>(selectedMode)
    const [subjectTheme, setSubjectTheme] = useState<number>(selectedTheme)

    const inlineStyles: {[key: string]: CSS.Properties} = {
        "mainWrapper": {
            background: themes[selectedMode][selectedTheme].boxGradient,
            backdropFilter: themes[selectedMode][selectedTheme].backgroundBlur,
            border: themes[selectedMode][selectedTheme].glassBorder
        },
        "title": {
            background: themes[selectedMode][selectedTheme].backgroundContrast,
            color: themes[selectedMode][selectedTheme].glowBase,
            textShadow: themes[selectedMode][selectedTheme].glowLight
        },
        "modeTitle": {
            color: themes[selectedMode][selectedTheme].primary.subheader
        },
        "darkMode": {
            borderColor: (subjectMode === 0 ? themes[selectedMode][selectedTheme].glowColor : '#ffffff00'),
            color: (subjectMode === 0 ? themes[selectedMode][selectedTheme].glowColor : themes[selectedMode][selectedTheme].primary.tertiary)
        },
        "lightMode": {
            borderColor: (subjectMode === 1 ? themes[selectedMode][selectedTheme].glowColor : '#ffffff00'),
            color: (subjectMode === 1 ? themes[selectedMode][selectedTheme].glowColor : themes[selectedMode][selectedTheme].primary.tertiary)
        },
        "themeTitle": {
            color: themes[selectedMode][selectedTheme].primary.subheader
        },
        "themeSelector": {
            background: themes[selectedMode][selectedTheme].glassBackground,
            boxShadow: themes[selectedMode][selectedTheme].glassShadow,
            border: themes[selectedMode][selectedTheme].glassBorder
        },
        "cancelButton": {
            background: themes[selectedMode][selectedTheme].primary.quaternary,
            color: themes[selectedMode][selectedTheme].primary.tertiary
        },
        "saveButton": {
            background: (selectedMode !== subjectMode || selectedTheme !== subjectTheme ? themes[selectedMode][selectedTheme].primary.subtext : themes[selectedMode][selectedTheme].primary.tertiary),
            color: (selectedMode !== subjectMode || selectedTheme !== subjectTheme ? themes[selectedMode][selectedTheme].primary.highlight : themes[selectedMode][selectedTheme].primary.quaternary)
        }
    }

    function handleCancel(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        setSubjectMode(selectedMode)
        setSubjectTheme(selectedTheme)
    }

    async function handleSave(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        if (selectedMode === subjectMode && selectedTheme === subjectTheme)
            return

        const meta: Array<[string, string | Blob]> = [
            ['mode', `${subjectMode}`],
            ['theme', `${subjectTheme}`]
        ]

        await fetchToApi('/v1/teams/theme/', 'PUT', meta).then(response => {
            if (response.success) {
                grabTheme()
                return
            }

        })
    }

    async function grabThemeData() {
        await fetchToApi('/v1/teams/theme/', 'GET', []).then(response => {
            if (response.success) {
                setSubjectMode(response.mode)
                setSubjectTheme(response.theme)
                return
            }

        })
    }

    useEffect(() => {
        grabThemeData()
    }, [])

    return (
        <div className={styles.mainWrapper} style={inlineStyles.mainWrapper}>
            <div className={styles.title}><p style={inlineStyles.title}>Change Theme</p></div>
            <div className={styles.modeTitle} style={inlineStyles.modeTitle}>Edit Mode</div>
            <div className={styles.modeBox}>
                <div onClick={() => {setSubjectMode(0)}} style={inlineStyles.darkMode}>Dark</div>
                <div onClick={() => {setSubjectMode(1)}} style={inlineStyles.lightMode}>Light</div>
            </div>
            <div className={styles.themeTitle} style={inlineStyles.themeTitle}>Pick A Theme</div>
            <div className={styles.themeBox}>
                <div className={styles.themeSelector} style={inlineStyles.themeSelector}>
                    <div><RadioList selected={subjectTheme === 1 ? 0 : 1} items={[themes[subjectMode][1].name]} colors={[themes[subjectMode][1].glowColor ]} callback={() => {setSubjectTheme(1)}} itemHeight={33} bubbleDiameter='15px' bubbleColor={themes[subjectMode][1].primary.highlight} backgroundColor={themes[subjectMode][1].primary.tertiary} /></div>
                    <div><RadioList selected={subjectTheme === 2 ? 0 : 1} items={[themes[subjectMode][2].name]} colors={[themes[subjectMode][2].glowColor ]} callback={() => {setSubjectTheme(2)}} itemHeight={33} bubbleDiameter='15px' bubbleColor={themes[subjectMode][2].primary.highlight} backgroundColor={themes[subjectMode][2].primary.tertiary} /></div>
                    <div><RadioList selected={subjectTheme === 3 ? 0 : 1} items={[themes[subjectMode][3].name]} colors={[themes[subjectMode][3].glowColor ]} callback={() => {setSubjectTheme(3)}} itemHeight={33} bubbleDiameter='15px' bubbleColor={themes[subjectMode][3].primary.highlight} backgroundColor={themes[subjectMode][3].primary.tertiary} /></div>
                </div>
                <div className={styles.themeSelector} style={inlineStyles.themeSelector}>
                    <div><RadioList selected={subjectTheme === 4 ? 0 : 1} items={[themes[subjectMode][4].name]} colors={[themes[subjectMode][4].glowColor ]} callback={() => {setSubjectTheme(4)}} itemHeight={33} bubbleDiameter='15px' bubbleColor={themes[subjectMode][4].primary.highlight} backgroundColor={themes[subjectMode][4].primary.tertiary} /></div>
                    <div><RadioList selected={subjectTheme === 5 ? 0 : 1} items={[themes[subjectMode][5].name]} colors={[themes[subjectMode][5].glowColor ]} callback={() => {setSubjectTheme(5)}} itemHeight={33} bubbleDiameter='15px' bubbleColor={themes[subjectMode][5].primary.highlight} backgroundColor={themes[subjectMode][5].primary.tertiary} /></div>
                    <div><RadioList selected={subjectTheme === 6 ? 0 : 1} items={[themes[subjectMode][6].name]} colors={[themes[subjectMode][6].glowColor ]} callback={() => {setSubjectTheme(6)}} itemHeight={33} bubbleDiameter='15px' bubbleColor={themes[subjectMode][6].primary.highlight} backgroundColor={themes[subjectMode][6].primary.tertiary} /></div>
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <div className={styles.buttonWrapper}>
                    <button onClick={handleCancel} style={inlineStyles.cancelButton}>Cancel</button>
                    <button onClick={handleSave} style={inlineStyles.saveButton}>Save</button>
                </div>
            </div>
        </div>
    )
}