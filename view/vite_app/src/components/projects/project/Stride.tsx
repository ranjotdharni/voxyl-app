import { MouseEvent, useContext, useState } from "react"
import Step, { STATUS_LITERALS, StepProps } from "./Step"
import { Context } from "../../../pages/Layout"
import styles from '../../../assets/css/projects/components/stride.module.css'
import CSS from 'csstype'
import { themes } from "../../../theme"
import CustomInput from "../../CustomInput"
import { Project } from "../../../pages/projects/Page"
import { FiEdit, FiTrash2 } from "react-icons/fi"
import { inclusiveRandomInteger } from "../../../globals"
import { Confirm } from "../../misc/ConfirmModal"

const TEMP_ID_PREFIX: string = 'TEMP_STEP_ID_'

export interface StrideProps {
    id: string
    title: string
    steps: StepProps[]
}

interface Props {
    strideIndex: number
    data: Project
    setData: (data: Project) => void
    setModal: (slug: Confirm) => void
}

export default function Stride({ strideIndex, data, setData, setModal } : Props) {
    // @ts-ignore
    const [theme, mode, fetchTheme] = useContext(Context)
    const [editTitle, setEditTitle] = useState<boolean>(false)

    const inlineStyles: {[key: string]: CSS.Properties} = {
        "mainContainer": {
            background: themes[mode][theme].boxGradient,
            border: themes[mode][theme].glassBorder
        },
        "titleItemsContainer": {
            borderColor: themes[mode][theme].primary.tertiary
        },
        "addStepButton": {
            color: themes[mode][theme].primary.subheader,
            backgroundColor: themes[mode][theme].primary.header
        },
        "titleWrapper": {
            background: themes[mode][theme].backgroundContrast
        },
        "title": {
            color: themes[mode][theme].glowBase,
            textShadow: themes[mode][theme].glowLight
        }
    }

    function toggleEditTitle() {
        setEditTitle(!editTitle)
    }

    function modifyTitle(newTitle: string) {
        let newData: Project = {...data}
        newData.strides[strideIndex].title = newTitle
        setData(newData)
    }

    function addStep(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        let newData: Project = {...data}
        let newStep: StepProps = {
            id: TEMP_ID_PREFIX + `${newData.strides[strideIndex].steps.length}_` + inclusiveRandomInteger(1, 9999),  // Randomize a temporary id to avoid collision
            title: 'New Step',
            points: 1,
            deadline: new Date(),
            description: '',
            status: STATUS_LITERALS[0]
        }
        newData.strides[strideIndex].steps.push(newStep)
        setData(newData)
    }

    function deleteStride(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        const callback = () => {
            let newData: Project = {...data}
            newData.strides.splice(strideIndex, 1)
            setData(newData)
        }

        setModal({
            title: 'Are You Sure?',
            message: 'This will delete the selected Stride.',
            question: 'Do you still want to continue?',
            callback: callback
        })
    }

    return (
        <div id={data.strides[strideIndex].id as string} className={styles.mainContainer} style={inlineStyles.mainContainer}>
            <div className={styles.titleItemsContainer} style={inlineStyles.titleItemsContainer}>
                <div className={styles.titleButtonsContainer}>
                    <button onClick={deleteStride} className={styles.deleteButton}>
                        <FiTrash2 size={18} />
                    </button>
                    <button className={styles.addStepButton} style={inlineStyles.addStepButton} onClick={addStep}>New Step</button>
                </div>
                <div className={styles.titleContainer}>
                    {
                        editTitle ?
                        <div className={styles.titleWrapper}>
                            <CustomInput label='Edit Stride Title' type='text' name='strideTitle' init={data.strides[strideIndex].title} callback={modifyTitle} />
                        </div> :
                        <div className={styles.titleWrapper} style={inlineStyles.titleWrapper}>
                            <p style={inlineStyles.title}>{data.strides[strideIndex].title}</p>
                        </div>
                    }
                    <button className={styles.titleEditButton} onClick={toggleEditTitle}>
                        <FiEdit />
                    </button>
                </div>
            </div>
            <div className={styles.stepsContainer}>
                {
                    // @ts-ignore
                    data.strides[strideIndex].steps.map((step, index) => {
                        return (
                            <Step strideIndex={strideIndex} stepIndex={index} data={data} setData={setData} setModal={setModal} />
                        )
                    })
                }
            </div>
        </div>
    )
}