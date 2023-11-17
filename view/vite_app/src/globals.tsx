import { useNavigate } from "react-router-dom";

export const bakedOrigin: string = window.location.origin
export const SUCCESS_PATH: string = '/'

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

    let response = await Promise.resolve(await fetch(bakedOrigin + localPath, {
        credentials: 'include',
        method: method,
        mode: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookieValue(getCookie('csrftoken')),
        },
        body: JSON.stringify(data),
    }).then(
        middle => middle.json()
    ))

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