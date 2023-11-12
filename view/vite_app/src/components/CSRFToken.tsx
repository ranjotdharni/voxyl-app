import { getCookie } from "../globals"


export default function CSRFToken() {
    const csrftoken = getCookie('csrftoken')

    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
    )
}