import { getCookie, getCookieValue } from "../globals"


export default function CSRFToken() {
    const csrftoken = getCookieValue(getCookie('csrftoken'))

    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
    )
}