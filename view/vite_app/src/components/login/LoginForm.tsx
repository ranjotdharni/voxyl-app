/** @jsxImportSource @emotion/react */

import styles from '../../assets/css/login/loginForm.module.css'
import CSRFToken from '../CSRFToken'
import { SUCCESS_PATH, fetchToApi, stringAfterLastChar } from '../../globals'
import { Context } from '../context/ThemeContext'
import CustomInput from '../CustomInput'
import { MouseEvent, useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { css } from '@emotion/react'

export default function LoginForm() {
    const theme = useContext(Context)
    const navigation = useNavigate()
    const { next } = useParams()

    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState('')

    const beforeStyles = css`
        :before {
            color: ${theme.primary.tertiary}
        }
    `

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
        <form className={styles.form} style={{backgroundColor: theme.background}} onSubmit={handleSubmit} action="/v1/auth/login" method="put">
            <CSRFToken />

            <div className={styles.formHeaderWrapper}>
                <p className={styles.formHeader} style={{color: theme.primary.header}}>Log in to PitCrew</p>
            </div>

            <label className={styles.headLabel} style={{color: theme.primary.subheader}}>Username</label>
            <div className={styles.wrapper}>
                <CustomInput init={user} label='Enter a Username' type='text' name='user' callback={setUser} />
            </div>

            <label className={styles.headLabel} style={{color: theme.primary.subheader}}>Password</label>
            <div className={styles.wrapper}>
                <CustomInput init={pass} label='Enter Password' type='password' name='pass' callback={setPass} />
            </div>

            <label className={styles.error}>{error}</label>

            <div css={beforeStyles} className={styles.buttonWrapper}>
                <button onClick={handleSwitch} className={styles.switchButton} style={{color: theme.background, borderColor: theme.primary.header, backgroundColor: theme.primary.header}} type='button'>Sign Up</button>
                <button className={styles.submitButton + (isFormFilled() ? ' ' + styles.submitReady : '')} style={(isFormFilled() ? {color: theme.background, borderColor: theme.primary.highlight, backgroundColor: theme.primary.highlight} : {color: theme.primary.subtext, borderColor: theme.primary.subtext, backgroundColor: theme.background})} type="submit">Log In</button>
            </div>
        </form>
    )
}