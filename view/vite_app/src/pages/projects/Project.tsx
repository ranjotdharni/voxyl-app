import { MouseEvent, useContext, useEffect, useState } from 'react'
import styles from '../../assets/css/projects/project.module.css'
import { themes } from '../../theme'
import CSS from 'csstype'
import { Context } from '../Layout'
import Stride, { StrideProps } from '../../components/projects/Stride'
import CustomInput from '../../components/CustomInput'
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { fetchToApi, hardCopyProject, inclusiveRandomInteger, shallowCompareProjects } from '../../globals'
import ConfirmModal, { Confirm } from '../../components/misc/ConfirmModal'
import Members from '../../components/projects/Members'
import { useNavigate, useParams } from 'react-router-dom'
import useError from '../../hooks/useError'

const TEMP_ID_PREFIX = 'TEMP_STRIDE_ID_'

export interface Project {
    id: string
    title: string
    strides: StrideProps[]
}

export default function Project() {
    const navigate = useNavigate()
    const { id } = useParams()
    // @ts-ignore
    const [theme, mode, fetchTheme] = useContext(Context)
    const [error, throwError] = useError()
    const [modalSlug, setModal] = useState<Confirm>({title: '', message: '', question: '', callback: () => {}})
    const [membersModal, setMembersModal] = useState<boolean>(false)

    const [editTitle, setEditTitle] = useState<boolean>(false)
    // @ts-ignore
    const [projectData, setProjectData] = useState<Project>({id: '', title: '', strides: []})
    const [projectBuffer, setProjectBuffer] = useState<Project>({id: '', title: '', strides: []})
    const [isSaveReady, setSaveReady] = useState<boolean>(false)

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
        },
        "addMemberButton": {
            color: themes[mode][theme].primary.subheader,
            backgroundColor: themes[mode][theme].primary.header
        },
        "error": {
            background: themes[mode][theme].backgroundOpaque,
            color: themes[mode][theme].error
        }
    }

    async function fetchProject() {
        const meta: Array<[string, string | Blob]> = [
            ['project', id as string],
        ]

        await fetchToApi("/v1/projects/describe/", "POST", meta).then(response => {
            if (response.error !== undefined) {
                throwError(response.error)
                return
            }

            setProjectData(JSON.parse(response.data)[0] as Project)
            setProjectBuffer(JSON.parse(response.data)[0] as Project)
        })
    }

    function saveReady(): boolean {
        return !shallowCompareProjects(projectData, projectBuffer)
    }

    function editProjectTitle(newTitle: string) {
        let newData: Project = {...projectBuffer}
        newData.title = newTitle
        setProjectBuffer(newData)
    }

    function onCancel(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        if (isSaveReady) {
            setProjectBuffer(hardCopyProject(projectData))
        }
    }

    function addStride(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        let newData: Project = {...projectBuffer}
        newData.strides.push({
            id: TEMP_ID_PREFIX + `${newData.strides.length}_` + inclusiveRandomInteger(1, 9999),  // Randomize a temporary id to avoid collision,
            title: 'New Stride',
            steps: []
        })
        setProjectBuffer(newData)
    }

    function deleteProject(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        const callback = () => {
            // delete logic
        }

        setModal({
            title: 'Are You Sure?',
            message: 'You are about to delete this Project permanently. THIS ACTION IS IRREVERSIBLE!',
            question: 'Do you still want to continue?',
            callback: callback
        })
    }

    function saveProject(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        if (!isSaveReady)
            return

        // save logic
    }

    function toggleMembers(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        setMembersModal(!membersModal)
    }

    useEffect(() => {
        setSaveReady(saveReady())
    }, [projectBuffer])

    useEffect(() => {
        if (id === undefined) {
            navigate('/project/launch')
        }
        else {
            fetchProject()
        }
    }, [])

    return (
        <>
            <ConfirmModal slug={modalSlug} />
            <Members active={membersModal} setActive={setMembersModal} />
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
                    <div className={styles.buttonsContainer}>
                        <div className={styles.buttonsWrapper}>
                            <button onClick={onCancel} style={isSaveReady ? inlineStyles.cancelButtonReady : inlineStyles.cancelButton}>Cancel</button>
                            <button onClick={saveProject} style={isSaveReady ? inlineStyles.saveButtonReady : inlineStyles.saveButton}>Save</button>
                            <button onClick={toggleMembers} style={inlineStyles.addMemberButton}>Add Team Member</button>
                            <button onClick={addStride} style={inlineStyles.addMemberButton}>New Stride</button>
                        </div>
                        <button onClick={deleteProject} className={styles.deleteButton}>
                            <FiTrash2 size={18} />
                        </button>
                    </div>
                </div>

                {
                    // @ts-ignore
                    projectBuffer.strides.map((stride, index) => {
                        return <Stride strideIndex={index} data={projectBuffer} setData={setProjectBuffer} setModal={setModal} />
                    })
                }
            </div>
            <p className={styles.error} style={inlineStyles.error}>{error}</p>
        </>
    )
}