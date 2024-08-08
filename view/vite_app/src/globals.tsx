import { useNavigate } from "react-router-dom";
import { Project } from "./pages/projects/Page";
import { StepProps } from "./components/projects/project/Step";
import { StrideProps } from "./components/projects/project/Stride";

export const bakedOrigin: string = window.location.origin
export const SUCCESS_PATH: string = '/teams'

// Each item's index is its numeric permission level
export const PERMISSIONS: { tag: string, alias: string, details: string, glowBase: string, color: string }[] = [
    {
        "tag": "MEMBER",
        "alias": "Member",
        "details": "This is the default role and has the lowest permission level. It has no special permissions.",
        "glowBase": '#e2e8c1',
        "color": "#a8c40e"
    },
    {
        "tag": "SENIOR",
        "alias": "Senior Member",
        "details": "Senior Members can view the performance metrics of other team members.",
        "glowBase": '#bde2f2',
        "color": "#0b5b7d"
    },
    {
        "tag": "LEAD",
        "alias": "Lead",
        "details": "Leads can create new projects and manage members on their respective projects. This role has all permissions of lower roles.",
        "glowBase": '#b1f2db',
        "color": "#129466"
    },
    {
        "tag": "MOD",
        "alias": "Moderator",
        "details": "Moderators can add, remove, and invite members to the team. This role has all permissions of lower roles.",
        "glowBase": '#ceb1f2',
        "color": "#5611ab"
    },
    {
        "tag": "CAPTAIN",
        "alias": "Captain",
        "details": "Captains have nearly every permission as the owner of the team (including role assignment), save only disbanding the team and transferring ownership (exclusive to Team Owner). A Captain's Teams dashboard will present the teams that they're Captain of for them to freely edit. This role has all permissions of lower roles.",
        "glowBase": '#f5cee6',
        "color": "#ad1573"
    },
    {
        "tag": "OWNER",
        "alias": "Team Owner",
        "details": "The owner of the team; there may only be one Team Owner. Team Owner can disband the team or transfer ownership of the team by assigning another member as Team Owner. This role holds the highest permission level. This role has all permissions of lower roles.",
        "glowBase": '#f7d4c3',
        "color": "#bf4c17"
    }
]

export function generateGlow(base: string, color: string): string {
    return `0px 0px 12px ${base}, 0px 0px 2px ${color}, 0px 0px 3px ${color}, 0px 0px 4px ${color}, 0px 0px 10px ${color}, 0px 0px 20px ${color}, 0px 0px 40px ${color}, 0px 0px 50px ${color}, 0px 0px 70px ${color}, 0px 0px 100px ${color}`
}

export function clamp(min: number, ideal: number, max: number)
{
    if (ideal < min)
        return min

    if (ideal > max)
        return max

        return ideal
}

export function stringAfterLastChar(str: string, char: string) {
    const lastIndex = str.lastIndexOf(char);
    if (lastIndex === -1) {
      return str;
    }
    return str.slice(lastIndex + 1);
  }

export function getCookie(name: string) {
    let cookieValue = '';
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = cookie.substring(name.length + 1);
                break;
            }
        }
    }
    return cookieValue;
}

export function getCookieValue(cookie: string) {
    return decodeURIComponent(cookie)
}

export async function fetchToApi(localPath: string, method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', metaData: Array<[string, string | Blob]>) {
    let data: {[key: string]: string | Blob} = {}

    metaData.forEach((v) => {
        data[v[0]] = v[1]
    })

    let response

    if (method === 'GET') {
        response = await Promise.resolve(await fetch(bakedOrigin + localPath, {
            credentials: 'include',
            method: method,
            mode: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookieValue(getCookie('csrftoken')),
            }
        }).then(
            middle => middle.json()
        ))
    }
    else {
        response = await Promise.resolve(await fetch(bakedOrigin + localPath, {
            credentials: 'include',
            method: method,
            mode: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookieValue(getCookie('csrftoken')),
            },
            body: JSON.stringify(data)
        }).then(
            middle => middle.json()
        ))
    }

    if (response.redirect !== undefined) {
        window.location.replace(window.location.origin + response.redirect)
        /*const redirect = useNavigate()
        redirect(response.redirect)*/
    }

    return response
}

export function validateResponse(arg1: Response) {
    const redirect = useNavigate()

    if (arg1.redirected && arg1.url.startsWith(bakedOrigin + '/entry'))
    {
        redirect('/entry/login/next=' + encodeURIComponent(window.location.pathname))
    }
}

export function generateArray(length: number): number[] {
    const arr = []

    for (let i = 0; i < length; i++) {
        arr.push(0)
    }

    return arr
}

export function inclusiveRandomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function dateToFormat(format: string, date: Date): string
{
    let str = format.toLowerCase().slice()
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    let mm = (str.includes('mmm') ? 'mmm' : 'mm')
    let dd = (str.includes('ddd') ? 'ddd' : 'dd')
    let yy = (str.includes('yyyy') ? 'yyyy' : 'yy')

    str = str.replace(mm, (mm === 'mm' ? (date.getMonth() + 1).toString().padStart(2, '0') : monthNames[date.getMonth()]))
    str = str.replace(dd, (dd === 'dd' ? (date.getDate()).toString().padStart(2, '0') : dayNames[date.getDay()]))
    str = str.replace(yy, (yy === 'yyyy' ? (date.getFullYear()).toString() : date.getFullYear().toString().slice(-2)))

    return str
}

export function parseDateString(dateString: string) {
    const dateOnlyRegex = /^([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1])))$/  

    if (dateOnlyRegex.test(dateString)) {
        const utcDate = new Date(dateString)
        const localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000)
        return localDate  
    }

    return new Date(dateString)
}

// The below function DOES NOT WORK FOR OBJECTS WITH FUNCTIONS IN THEM,
// it is strictly for use with data-only objects, so do not add functions
// to the Project interface
export function shallowCompareProjects(p1: Project, p2: Project): boolean {
    return JSON.stringify(p1) === JSON.stringify(p2)
}

// The below function DOES NOT WORK FOR OBJECTS WITH FUNCTIONS IN THEM,
// it is strictly for use with data-only objects, so do not add functions
// to the Project interface
export function hardCopyProject(p1: Project): Project {
    let projectCopy: Project = {    // Order of members should match original object!!!
        id: p1.id + '',
        title: p1.title + '',
        strides: []
    }

    for (let i = 0; i < p1.strides.length; i++) {
        let strideOriginal: StrideProps = p1.strides[i]

        let strideCopy: StrideProps = {     // Order of members should match original object!!!
            id: strideOriginal.id + '',
            title: strideOriginal.title + '',
            steps: []
        }

        for (let j = 0; j < strideOriginal.steps.length; j++) { 
            let stepOriginal: StepProps = strideOriginal.steps[j]

            let stepCopy: StepProps = {     // Order of members should match original object!!!
                id: stepOriginal.id + '',
                title: stepOriginal.title + '',
                points: stepOriginal.points + 0,
                deadline: new Date(stepOriginal.deadline.getTime()),
                description: stepOriginal.description + '',
                status: stepOriginal.status + ''
            }

            strideCopy.steps.push(stepCopy)
        }

        projectCopy.strides.push(strideCopy)
    }

    return projectCopy
}

export function projectDifferentiator(original: Project, buffer: Project): string {
    interface StepAdd {
        id: string
        title: string
        points: number
        deadline: string
        description: string
        status: string
    }

    interface StrideAdd {
        id: string,
        title: string,
        steps: StepAdd[]
    }

    interface StepUpdate {
        id?: string
        title?: string
        points?: number
        deadline?: string
        description?: string
        status?: string
    }

    let projectTitle: string = ''

    let strideDifference: { added: StrideAdd[], updated: {id: string, title: string | undefined, added: StepAdd[], updated: StepUpdate[], dropped: string[]}[], dropped: string[] } = {added: [], updated: [], dropped: []}

    if (original.title !== buffer.title) {
        projectTitle = buffer.title.trim()
    }

    let originalStridesIds: string[] = original.strides.map(s => s.id)
    let bufferStridesIds: string[] = buffer.strides.map(s => s.id)
    let add: string[] = []
    let drop: string[] = []

    for (let i = 0; i < bufferStridesIds.length; i++) {
        let adding: boolean = originalStridesIds.indexOf(bufferStridesIds[i]) === -1

        if (adding) {
            let s: StrideProps = {...buffer.strides[i]}
            let sa: StrideAdd = {
                id: s.id,
                title: s.title,
                steps: []
            }

            s.steps.forEach(item => {
                sa.steps.push({
                    id: item.id,
                    title: item.title,
                    points: item.points,
                    deadline: item.deadline.toUTCString(),
                    description: item.description,
                    status: item.status
                })
            })
            strideDifference.added.push(sa)
            add.push(buffer.strides[i].id)
        }

    }

    for (let i = 0; i < originalStridesIds.length; i++) {
        let dropping: boolean = bufferStridesIds.indexOf(originalStridesIds[i]) === -1

        if (dropping) {
            strideDifference.dropped.push(originalStridesIds[i])
            drop.push(original.strides[i].id)
        }
    }

    for (let i = 0; i < buffer.strides.length; i++) {
        if (add.indexOf(buffer.strides[i].id) === -1 && drop.indexOf(buffer.strides[i].id) === -1) {
            let origin: StrideProps = original.strides[i]
            let buff: StrideProps = buffer.strides[i]

            let update: {id: string, title: string | undefined, added: StepAdd[], updated: StepUpdate[], dropped: string[]} = {
                id: buff.id,
                title: (buff.title !== origin.title ? buff.title : undefined),
                added: [],
                updated: [],
                dropped: []
            }

            let originalStepsIds: string[] = origin.steps.map(s => s.id)
            let bufferStepsIds: string[] = buff.steps.map(s => s.id)
            let addStep: string[] = []
            let dropStep: string[] = []

            for (let j = 0; j < bufferStepsIds.length; j++) {
                let addingStep: boolean = originalStepsIds.indexOf(bufferStepsIds[j]) === -1
        
                if (addingStep) {
                    let s: StepProps = {...buff.steps[buff.steps.map(b => b.id).indexOf(bufferStepsIds[j])]}
                    update.added.push({
                        id: s.id,
                        title: s.title,
                        points: s.points,
                        deadline: s.deadline.toUTCString(),
                        description: s.description,
                        status: s.status
                    })
                    addStep.push(s.id)
                }
            }

            for (let j = 0; j < originalStepsIds.length; j++) {
                let droppingStep: boolean = bufferStepsIds.indexOf(originalStepsIds[j]) === -1
        
                if (droppingStep) {
                    update.dropped.push(origin.steps[origin.steps.map(o => o.id).indexOf(originalStepsIds[j])].id)
                    dropStep.push(origin.steps[origin.steps.map(o => o.id).indexOf(originalStepsIds[j])].id)
                }
            }

            for (let j = 0; j < buff.steps.length; j++) {
                if ((addStep.indexOf(buff.steps[j].id) === -1 && dropStep.indexOf(buff.steps[j].id) === -1)) {
                    let stepO: StepProps = origin.steps[origin.steps.map(s => s.id).indexOf(buff.steps[j].id)]
                    let stepB: StepProps = buff.steps[j]

                    let u: StepUpdate = {
                        title: (stepO.title !== stepB.title ? stepB.title : undefined),
                        points: (stepO.points !== stepB.points ? stepB.points : undefined),
                        deadline: (stepO.deadline.getTime() !== stepB.deadline.getTime() ? stepB.deadline.toUTCString() : undefined),
                        description: (stepO.description !== stepB.description ? stepB.description : undefined),
                        status: (stepO.status !== stepB.status ? stepB.status : undefined),
                    }

                    if (Object.keys(u).length !== 0) {
                        u.id = stepB.id
                        update.updated.push(u)
                    }
                }
            }

            if (update.title !== '' || update.added.length !== 0 || update.dropped.length !== 0 || update.updated.length !== 0) {
                strideDifference.updated.push(update)
            }
        }
    }

    return JSON.stringify({
        projectId: buffer.id,
        projectTitle: (projectTitle !== '' ? projectTitle : undefined),
        difference: strideDifference
    })
}

export function parseProjectData(p: any): Project {
    p.strides.forEach((stride: any) => {
        stride.steps.forEach((step: any) => {
            step.deadline = new Date(step.deadline)
        })
    })

    return p as Project
}