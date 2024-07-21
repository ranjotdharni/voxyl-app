/** @jsxImportSource @emotion/react */

import styles from '../../assets/css/login/loginForm.module.css'
import CSRFToken from '../CSRFToken'
import { SUCCESS_PATH, fetchToApi, stringAfterLastChar } from '../../globals'
import CustomInput from '../CustomInput'
import { MouseEvent, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { css } from '@emotion/react'
import { DEFAULT_MODE, DEFAULT_THEME, themes } from '../../theme'

export default function LoginForm() {
    // @ts-ignore Ignore unused setTheme
    const selectedTheme: number = DEFAULT_THEME
    const selectedMode: number = DEFAULT_MODE
    const navigation = useNavigate()
    const { next } = useParams()

    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState('')

    const beforeStyles = css`
        :before {
            color: ${themes[selectedMode][selectedTheme].primary.tertiary}
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
        <form className={styles.form} style={{background: themes[selectedMode][selectedTheme].boxGradient, border: themes[selectedMode][selectedTheme].glassBorder}} onSubmit={handleSubmit} action="/v1/auth/login" method="put">
            <CSRFToken />

            <div className={styles.formHeaderWrapper}>
                <p className={styles.formHeader} style={{color: themes[selectedMode][selectedTheme].primary.header}}>Log in to Air Teams</p>
            </div>

            <label className={styles.headLabel} style={{color: themes[selectedMode][selectedTheme].primary.subheader}}>Username</label>
            <div className={styles.wrapper}>
                <CustomInput init={user} label='Enter a Username' type='text' name='user' callback={setUser} />
            </div>

            <label className={styles.headLabel} style={{color: themes[selectedMode][selectedTheme].primary.subheader}}>Password</label>
            <div className={styles.wrapper}>
                <CustomInput init={pass} label='Enter Password' type='password' name='pass' callback={setPass} />
            </div>

            <label className={styles.error}>{error}</label>

            <div css={beforeStyles} className={styles.buttonWrapper}>
                <button onClick={handleSwitch} className={styles.switchButton} style={{color: themes[selectedMode][selectedTheme].backgroundOpaque, borderColor: themes[selectedMode][selectedTheme].primary.header, backgroundColor: themes[selectedMode][selectedTheme].primary.header}} type='button'>Sign Up</button>
                <button className={styles.submitButton + (isFormFilled() ? ' ' + styles.submitReady : '')} style={(isFormFilled() ? {color: themes[selectedMode][selectedTheme].backgroundOpaque, borderColor: themes[selectedMode][selectedTheme].primary.highlight, backgroundColor: themes[selectedMode][selectedTheme].primary.highlight} : {color: themes[selectedMode][selectedTheme].primary.subtext, borderColor: themes[selectedMode][selectedTheme].primary.subtext, backgroundColor: themes[selectedMode][selectedTheme].backgroundOpaque})} type="submit">Log In</button>
            </div>
        </form>
    )
}