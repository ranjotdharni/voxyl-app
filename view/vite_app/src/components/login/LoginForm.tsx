import styles from '../../assets/css/login/loginForm.module.css'
import CSRFToken from '../CSRFToken'
import { SUCCESS_PATH, fetchToApi, stringAfterLastChar } from '../../globals'
import CustomInput from '../CustomInput'
import { MouseEvent, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function LoginForm() {
    const navigation = useNavigate()
    const { next } = useParams()

    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState('')

    function handleSwitch(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        let nextUrl = '/entry' + (next !== undefined ? `/next=${encodeURIComponent(stringAfterLastChar(next, '='))}` : '')
        navigation(nextUrl)
    }

    function throwError(arg1: string) {
        setError(arg1)

        setTimeout(() => {
            setError('')
        }, 8000)
    }

    function isFormFilled(): boolean {
        return user !== '' && pass !== ''
    }

    async function handleSubmit(e: any) {
        e.preventDefault()

        if (!isFormFilled())
        {
            throwError('Please fill all fields.')
            return
        }

        const meta: Array<[string, string | Blob]> = [
            ['user', user],
            ['pass', pass],
        ]

        let response = await fetchToApi("/v1/auth/login/", "PUT", meta)
        //let response = await formSubmit(e)

        if (response.error === undefined)
        {
            (next !== undefined ? navigation(decodeURIComponent(stringAfterLastChar(next, '='))) : navigation(SUCCESS_PATH))
        }
        else
        {
            throwError(response.error)
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit} action="/v1/auth/login" method="put">
            <CSRFToken />

            <div className={styles.formHeaderWrapper}>
                <p className={styles.formHeader}>Log in to PitCrew</p>
            </div>

            <label className={styles.headLabel}>Username</label>
            <div className={styles.wrapper}>
                <CustomInput init={user} label='Username' type='text' name='user' color='#093a3e' borderColor='#ebf2fa' callback={setUser} />
            </div>

            <label className={styles.headLabel}>Password</label>
            <div className={styles.wrapper}>
                <CustomInput init={pass} label='Password' type='password' name='pass' color='#093a3e' borderColor='#ebf2fa' callback={setPass} />
            </div>

            <label className={styles.error}>{error}</label>

            <div className={styles.buttonWrapper}>
                <button onClick={handleSwitch} className={styles.switchButton} type='button'>Sign Up</button>
                <button className={styles.submitButton + (isFormFilled() ? ' ' + styles.submitReady : '')} type="submit">Log In</button>
            </div>
        </form>
    )
}