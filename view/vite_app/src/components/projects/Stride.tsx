import { useContext, useState } from "react"
import Step, { StepProps } from "./Step"
import { Context } from "../../pages/Layout"
import styles from '../../assets/css/projects/components/stride.module.css'
import CSS from 'csstype'
import { themes } from "../../theme"
import CustomInput from "../CustomInput"
import { Project } from "../../pages/projects/Project"
import { FiEdit } from "react-icons/fi"


export interface StrideProps {
    id: string | number
    title: string
    steps: StepProps[]
}

interface Props {
    strideIndex: number
    data: Project
    setData: (data: Project) => void
}

export default function Stride({ strideIndex, data, setData } : Props) {
    const [theme, mode, fetchTheme] = useContext(Context)
    const [editTitle, setEditTitle] = useState<boolean>(false)

    const inlineStyles: {[key: string]: CSS.Properties} = {
        "mainContainer": {
            background: themes[mode][theme].boxGradient,
            border: themes[mode][theme].glassBorder
        },
        "titleContainer": {
            borderColor: themes[mode][theme].primary.tertiary
        },
        "titleWrapper": {
            background: themes[mode][theme].backgroundContrast
        },
        "title": {
            color: themes[mode][theme].glowBase,
            textShadow: themes[mode][theme].glowLight
        }
    }

    function modifyTitle(newTitle: string) {
        let newData: Project = {...data}
        newData.strides[strideIndex].title = newTitle
        setData(newData)
    }

    return (
        <div id={data.strides[strideIndex].id as string} className={styles.mainContainer} style={inlineStyles.mainContainer}>
            <div className={styles.titleContainer} style={inlineStyles.titleContainer}>
                {
                    editTitle ?
                    <div className={styles.titleWrapper}>
                        <CustomInput label='Edit Stride Title' type='text' name='strideTitle' init={data.strides[strideIndex].title} callback={modifyTitle} />
                    </div> :
                    <div className={styles.titleWrapper} style={inlineStyles.titleWrapper}>
                        <p style={inlineStyles.title}>{data.strides[strideIndex].title}</p>
                    </div>
                }
                <button className={styles.titleEditButton} onClick={() => {setEditTitle(!editTitle)}}>
                    <FiEdit />
                </button>
            </div>
            <div className={styles.stepsContainer}>
                {
                    data.strides[strideIndex].steps.map((step, index) => {
                        return (
                            <Step strideIndex={strideIndex} stepIndex={index} data={data} setData={setData} />
                        )
                    })
                }
            </div>
        </div>
    )
}