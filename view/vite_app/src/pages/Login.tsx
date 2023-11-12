import { useState } from "react"
import { bakedOrigin, getCookie } from "../globals"

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    async function submit(e: any) {
        e.preventDefault()

        let response = await fetch(bakedOrigin + '/v1/auth/login', {
            credentials: 'include',
            method: 'POST',
            mode: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'),
            },
            body: JSON.stringify({
                User: username,
                Pass: password,
                timestamp: new Date().toString(),
            }),
        }).then(
            middle => middle.json()
        )

        console.log(response.message)
    }

    return (
        <div>
            <p>This is the Login Page</p>
            <label>Username:</label>
            <input value={username} onChange={(e) => {setUsername(e.target.value)}}></input>
            
            <label>Password:</label>
            <input value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
            <button onClick={submit} type="submit" />
        </div>
    )
}