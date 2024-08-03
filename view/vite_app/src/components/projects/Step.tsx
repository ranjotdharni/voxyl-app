import { ChangeEvent, MouseEvent, useContext, useState } from 'react'
import styles from '../../assets/css/projects/components/step.module.css'
import { themes } from '../../theme'
import CSS from 'csstype'
import { Context } from '../../pages/Layout'
import { Project } from '../../pages/projects/Project'
import CustomInput from '../CustomInput'
import { dateToFormat, parseDateString } from '../../globals'
import CustomCounter from '../misc/CustomCounter'
import { FiChevronDown, FiChevronUp, FiTrash2 } from 'react-icons/fi'
import { Confirm } from '../misc/ConfirmModal'

export const STATUS_LITERALS: string[] = [
    'Unassigned',
    'In Progress',
    'Complete',
    'Discarded'
]

export const STATUS_COLORS: string[] = [
    'lightgrey',
    'yellow',
    'green',
    'darkred'
]

export interface StepProps {
    id: string
    title: string
    points: number
    deadline: Date
    description: string
    status: string
}

interface Props {
    strideIndex: number
    stepIndex: number
    data: Project
    setData: (data: Project) => void
    setModal: (slug: Confirm) => void
}

export default function Step({ strideIndex, stepIndex, data, setData, setModal } : Props) {
    // @ts-ignore
    const [theme, mode, fetchTheme] = useContext(Context)
    const [expanded, setExpanded] = useState<boolean>(false)

    const inlineStyles: {[key: string]: CSS.Properties} = {
        "mainContainer": {
            background: themes[mode][theme].glassBackground,
            border: themes[mode][theme].glassBorder,
            boxShadow: themes[mode][theme].glassShadow
        },
        "description": {
            background: themes[mode][theme].glassBackground,
            border: themes[mode][theme].glassBorder,
        },
        "expandWrapper": {
            color: themes[mode][theme].primary.header
        }
    }

    function modifyTitle(newTitle: string) {
        let newData: Project = {...data}
        newData.strides[strideIndex].steps[stepIndex].title = newTitle
        setData(newData)
    }

    function modifyDeadline(e: ChangeEvent<HTMLInputElement>) {
        let newDeadline: Date = parseDateString(e.target.value)
        let newData: Project = {...data}
        newData.strides[strideIndex].steps[stepIndex].deadline = newDeadline
        setData(newData)
    }

    function modifyPoints(newPoints: number) {
        let newData: Project = {...data}
        newData.strides[strideIndex].steps[stepIndex].points = newPoints
        setData(newData)
    }

    function modifyDescription(e: ChangeEvent<HTMLTextAreaElement>) {
        let newDescription: string = e.target.value
        let newData: Project = {...data}
        newData.strides[strideIndex].steps[stepIndex].description = newDescription
        setData(newData)
    }

    function modifyStatus(e: MouseEvent<HTMLParagraphElement>) {
        e.preventDefault()

        let index: number = STATUS_LITERALS.indexOf(data.strides[strideIndex].steps[stepIndex].status)

        if (index === STATUS_LITERALS.length - 1) {
            index = 0
        }
        else {
            index++
        }

        let newStatus: string = STATUS_LITERALS[index]
        let newData: Project = {...data}
        newData.strides[strideIndex].steps[stepIndex].status = newStatus
        setData(newData)
    }

    function deleteStep(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        const callback = () => {
            let newData: Project = {...data}
            newData.strides[strideIndex].steps.splice(stepIndex, 1)
            setData(newData)
        }

        setModal({
            title: 'Are You Sure?',
            message: 'This will delete the selected Step.',
            question: 'Do you still want to continue?',
            callback: callback
        })
    }

    function handleExpand(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        setExpanded(!expanded)
    }

    return (
        <div className={styles.mainContainer} id={data.strides[strideIndex].steps[stepIndex].id} style={inlineStyles.mainContainer}>
            <div className={styles.basicContainer}>
                <div className={styles.titleContainer}>
                    <div className={styles.titleWrapper}>
                        <CustomInput label='Edit Step Title' type='text' name='stepTitle' init={data.strides[strideIndex].steps[stepIndex].title} color={themes[mode][theme].primary.header} callback={modifyTitle} />
                    </div>
                    <div className={styles.dateWrapper}>
                        <input type='date' value={dateToFormat('YYYY-MM-DD', data.strides[strideIndex].steps[stepIndex].deadline)} onChange={modifyDeadline} />
                    </div>
                </div>
                <p onClick={modifyStatus} className={styles.status} style={{color: STATUS_COLORS[STATUS_LITERALS.indexOf(data.strides[strideIndex].steps[stepIndex].status)]}}>{data.strides[strideIndex].steps[stepIndex].status}</p>
                <div className={styles.titleButtonsContainer}>
                    <div className={styles.counterWrapper}>
                        <CustomCounter min={1} max={99} value={data.strides[strideIndex].steps[stepIndex].points} setValue={modifyPoints} />
                    </div>
                    <button className={styles.deleteWrapper} onClick={deleteStep}>
                        <FiTrash2 size={18} />
                    </button>
                    <button className={styles.expandWrapper} style={inlineStyles.expandWrapper} onClick={handleExpand}>
                        {
                            expanded ? 
                            <FiChevronUp /> : 
                            <FiChevronDown />
                        }
                    </button>
                </div>
            </div>
            {
                expanded ?
                <div className={styles.expandedContainer}>
                    <textarea value={data.strides[strideIndex].steps[stepIndex].description} onChange={modifyDescription} placeholder='Enter a Description...' style={inlineStyles.description}></textarea>
                </div> :
                <></>
            }
        </div>
    )
}