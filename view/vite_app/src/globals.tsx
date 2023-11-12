export const bakedOrigin: string = 'http://localhost:8000'

export function getCookie(name: string): string {
    let cookieValue: string = '';
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

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
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify(data),
    }).then(
        middle => middle.json()
    ))

    return response
}