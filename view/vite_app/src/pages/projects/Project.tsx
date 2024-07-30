import { useContext, useState } from 'react'
import styles from '../../assets/css/projects/project.module.css'
import { themes } from '../../theme'
import CSS from 'csstype'
import { Context } from '../Layout'
import Stride, { StrideProps } from '../../components/projects/Stride'
import CustomInput from '../../components/CustomInput'
import { FiEdit } from "react-icons/fi";

export interface Project {
    id: string | number
    title: string
    strides: StrideProps[]
}

export default function Project() {
    const [theme, mode, fetchTheme] = useContext(Context)
    
    const [editTitle, setEditTitle] = useState<boolean>(false)
    const [projectData, setProjectData] = useState<Project>({
        id: '523452345',
        title: "Jim's Project",
        strides: [
            {
                id: 'jim',
                title: 'Stride 1',
                steps: [
                    {
                        id: 'jim1',
                        title: 'Step 1',
                        points: 5,
                        deadline: new Date(),
                        description: 'Generic Description of Something.'
                    },
                    {
                        id: 'jim2',
                        title: 'Step 2',
                        points: 4,
                        deadline: new Date(),
                        description: 'Generic Description of Something.'
                    },
                    {
                        id: 'jim3',
                        title: 'Step 3',
                        points: 11,
                        deadline: new Date(),
                        description: 'Generic Description of Something.'
                    }
                ]
            }
        ]
    })
    const [projectBuffer, setProjectBuffer] = useState<Project>(projectData)

    const inlineStyles: {[key: string]: CSS.Properties} = {
        "pageHeaderContainer": {
            background: themes[mode][theme].boxGradient,
            boxShadow: themes[mode][theme].glassShadow,
            border: themes[mode][theme].glassBorder
        },
        "projectTitleWrapper": {
            background: themes[mode][theme].backgroundContrast
        },
        "projectTitle": {
            color: themes[mode][theme].glowBase,
            textShadow: themes[mode][theme].glowLight
        }
    }

    function editProjectTitle(newTitle: string) {
        let newData: Project = {...projectBuffer}
        newData.title = newTitle
        setProjectBuffer(newData)
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.pageHeaderContainer} style={inlineStyles.pageHeaderContainer}>
                <div className={styles.titleEditContainer}>
                    {
                        editTitle ?
                        <div className={styles.projectTitleWrapper}>
                            <CustomInput label='Edit Project Title' type='text' name='projectTitle' init={projectBuffer.title} callback={editProjectTitle} />
                        </div> :
                        <div className={styles.projectTitleWrapper} style={inlineStyles.projectTitleWrapper}>
                            <p style={inlineStyles.projectTitle}>{projectBuffer.title}</p>
                        </div>
                    }
                    <button className={styles.titleEditButton} onClick={() => {setEditTitle(!editTitle)}}>
                        <FiEdit />
                    </button>
                </div>
            </div>

            {
                projectBuffer.strides.map((stride, index) => {
                    return <Stride strideIndex={index} data={projectBuffer} setData={setProjectBuffer} />
                })
            }
        </div>
    )
}