import { useNavigate } from "react-router-dom";

export const bakedOrigin: string = window.location.origin
export const SUCCESS_PATH: string = '/'

// Each item's index is its numeric permission level
export const PERMISSIONS: { tag: string, alias: string, details: string, glowBase: string, color: string }[] = [
    {
        "tag": "MEMBER",
        "alias": "Member",
        "details": "This is the default role and has the lowest permission level. It has no special permissions.",
        "glowBase": '#878787',
        "color": "#878787"
    },
    {
        "tag": "MECHANIC",
        "alias": "Mechanic",
        "details": "Mechanics can view the performance metrics of other crew members.",
        "glowBase": '#bde2f2',
        "color": "#0b5b7d"
    },
    {
        "tag": "ENGINEER",
        "alias": "Engineer",
        "details": "Engineers can create new projects and manage members on their respective projects. This role has all permissions of lower roles.",
        "glowBase": '#b1f2db',
        "color": "#129466"
    },
    {
        "tag": "DRIVER",
        "alias": "Driver",
        "details": "Drivers can add, remove, and invite members to the crew. This role has all permissions of lower roles.",
        "glowBase": '#ceb1f2',
        "color": "#5611ab"
    },
    {
        "tag": "CAR_CHIEF",
        "alias": "Car Chief",
        "details": "Car chiefs have nearly every permission as the owner of the crew (including role assignment), save only disbanding the crew and transferring ownership (exclusive to Crew Chief). A Crew Chief's Crews dashboard will present the crew that they're Crew Chief of for them to freely edit. This role has all permissions of lower roles.",
        "glowBase": '#f5cee6',
        "color": "#ad1573"
    },
    {
        "tag": "CREW_CHIEF",
        "alias": "Crew Chief",
        "details": "The owner of the crew; there may only be one Crew Chief. Crew Chief can disband the crew or transfer ownership of the crew by assigning another member as Crew Chief. This role holds the highest permission level. This role has all permissions of lower roles.",
        "glowBase": '#f7d4c3',
        "color": "#bf4c17"
    }
]

export function generateGlow(base: string, color: string): string {
    return `0px 0px 12px ${base},
           0px 0px 2px ${color}, 0px 0px 3px ${color}, 0px 0px 4px ${color},
           0px 0px 10px ${color}, 0px 0px 20px ${color}, 0px 0px 40px ${color},
           0px 0px 50px ${color}, 0px 0px 70px ${color}, 0px 0px 100px ${color}`
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

/*function isCookieExpired(cookie: string) {
    const cookiePairs = cookie.split(';');
    for (let i = 0; i < cookiePairs.length; i++) {
      const pair = cookiePairs[i].trim().split('=');
      if (pair[0].toLowerCase() === 'expires') {
        const expirationDate = new Date(pair[1]);
        return expirationDate > new Date();
      }
    }
  
    return false;
  }*/

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

export function Authenticate() {
    const redirect = useNavigate()
    
    async function grabAuth() {
        let result = await fetch(bakedOrigin + '/v1/auth/access/')
        
        if (result.redirected && result.url.startsWith(bakedOrigin + '/entry'))
        {
            redirect('/entry/login/next=' + encodeURIComponent(window.location.pathname))
        }
    }
    
    grabAuth()

    return (
        <></>
    )
}

export function validateResponse(arg1: Response) {
    const redirect = useNavigate()

    if (arg1.redirected && arg1.url.startsWith(bakedOrigin + '/entry'))
    {
        redirect('/entry/login/next=' + encodeURIComponent(window.location.pathname))
    }
}