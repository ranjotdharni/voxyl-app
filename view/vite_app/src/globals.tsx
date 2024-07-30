import { useNavigate } from "react-router-dom";

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

export async function fetchToApi(localPath: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', metaData: Array<[string, string | Blob]>) {
    /*const data = new FormData()

    metaData.forEach((obj) => {
        data.append(obj[0], obj[1])
    })

    data.append('csrfmiddlewaretoken', getCookieValue(getCookie('csrftoken')))*/

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
        const redirect = useNavigate()
        redirect(response.redirect)
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