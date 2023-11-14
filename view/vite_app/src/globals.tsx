import { useNavigate } from "react-router-dom";

export const bakedOrigin: string = window.location.origin
export const SUCCESS_PATH: string = '/'

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

export async function formSubmit(e: any) {
    e.preventDefault()

    let data: { [key: string]: string | Object | Array<Object> } = {}

    new FormData(e.target).forEach((v, k) => {
        data[k] = v
    })

    let response = await Promise.resolve(await fetch(e.target.action, {
        credentials: 'include',
        method: e.target.method,
        mode: 'same-origin',
        headers: {
            'X-CSRFToken': getCookieValue(getCookie('csrftoken')),
        },
        body: JSON.stringify(data),
    }).then(
        middle => middle.json()
    ))

    return response
}

export function Authenticate() {
    const redirect = useNavigate()
    
    async function grabAuth() {
        let result = await fetch(bakedOrigin + '/v1/auth/access')
        
        if (result.redirected && result.url.startsWith(bakedOrigin + '/entry'))
        {
            redirect('/entry/login?next=' + window.location.pathname)
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
        redirect('/entry/login?next=' + window.location.pathname)
    }
}