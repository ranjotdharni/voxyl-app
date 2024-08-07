/** @jsxImportSource @emotion/react */

import styles from '../../assets/css/create/createForm.module.css'
import CSRFToken from '../CSRFToken'
import { SUCCESS_PATH, fetchToApi, stringAfterLastChar } from '../../globals'
import CustomInput from '../CustomInput'
import { useState, MouseEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { css } from '@emotion/react'
import { DEFAULT_MODE, DEFAULT_THEME, themes } from '../../theme'

export default function CreateForm() {
    // @ts-ignore Ignore unused setTheme
    const selectedTheme: number = DEFAULT_THEME
    const selectedMode: number = DEFAULT_MODE
    const navigation = useNavigate()
    const { next } = useParams()

    const [first, setFirst] = useState('')
    const [last, setLast] = useState('')
    const [email, setEmail] = useState('')
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [confirm, setConfirm] = useState('')
    const [error, setError] = useState('')

    const beforeStyles = css`
        :before {
            color: ${themes[selectedMode][selectedTheme].primary.tertiary}
        }
    `

    function handleSwitch(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        let nextUrl = '/entry/login' + (next !== undefined ? `/next=${encodeURIComponent(stringAfterLastChar(next, '='))}` : '')
        navigation(nextUrl)
    }

    function throwError(arg1: string) {
        setError(arg1)

        setTimeout(() => {
            setError('')
        }, 8000)
    }

    function isFormFilled(): boolean {
        return first !== '' && last !== '' && email !== '' && user !== '' && pass !== '' && confirm !== ''
    }

    function isPassGood(): boolean {
        return pass === confirm
    }

    async function handleSubmit(e: any) {
        e.preventDefault()

        if (!isFormFilled())
        {
            throwError('Please fill all fields.')
            return
        }

        if (!isPassGood())
        {
            throwError('Passwords must match.')
            return
        }

        const meta: Array<[string, string | Blob]> = [
            ['first', first],
            ['last', last],
            ['email', email],
            ['user', user],
            ['pass', pass],
            ['confirm', confirm]
        ]

        let response = await fetchToApi("/v1/auth/login/", "POST", meta)
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
        <form className={styles.form} style={{background: themes[selectedMode][selectedTheme].boxGradient, border: themes[selectedMode][selectedTheme].glassBorder}} onSubmit={handleSubmit} action="/v1/auth/login" method="POST">
            <CSRFToken />

            <div className={styles.formHeaderWrapper}>
                <p className={styles.formHeader} style={{ color: themes[selectedMode][selectedTheme].primary.header }}>Create an Account</p>
            </div>
            
            <label className={styles.headLabel} style={{color: themes[selectedMode][selectedTheme].primary.subheader}}>Enter Your Name</label>
            <div className={styles.wrapper + ' ' + styles.nameWrapper}>
                <div className={styles.firstNameWrapper}>
                    <CustomInput init={first} label='First' type='text' name='first' callback={setFirst} />
                </div>

                <div className={styles.lastNameWrapper}>
                    <CustomInput init={last} label='Last' type='text' name='last' callback={setLast} />
                </div>
            </div>

            <label className={styles.headLabel} style={{color: themes[selectedMode][selectedTheme].primary.subheader}}>Enter Your Email</label>
            <div className={styles.wrapper}>
                <CustomInput init={email} label='Email' type='email' name='email' callback={setEmail} />
            </div>

            <label className={styles.headLabel} style={{color: themes[selectedMode][selectedTheme].primary.subheader}}>Make a Username</label>
            <div className={styles.wrapper}>
                <CustomInput init={user} label='Username' type='text' name='user' callback={setUser} />
            </div>

            <label className={styles.headLabel} style={{color: themes[selectedMode][selectedTheme].primary.subheader}}>Make a Password</label>
            <div className={styles.wrapper}>
                <CustomInput init={pass} label='Password' type='password' name='pass' callback={setPass} />
            </div>

            <label className={styles.headLabel} style={{color: themes[selectedMode][selectedTheme].primary.subheader}}>Confirm Your Password</label>
            <div className={styles.wrapper}>
                <CustomInput init={confirm} label='Confirm Password' type='password' name='confirm' callback={setConfirm} />
            </div>

            <label className={styles.error}>{error}</label>

            <div css={beforeStyles} className={styles.buttonWrapper}>
                <button onClick={handleSwitch} className={styles.switchButton} style={{color: themes[selectedMode][selectedTheme].backgroundOpaque, borderColor: themes[selectedMode][selectedTheme].primary.header, backgroundColor: themes[selectedMode][selectedTheme].primary.header}} type='button'>Log In</button>
                <button className={styles.submitButton + (isFormFilled() && isPassGood() ? ' ' + styles.submitReady : '')} style={(isFormFilled() && isPassGood() ? {color: themes[selectedMode][selectedTheme].backgroundOpaque, borderColor: themes[selectedMode][selectedTheme].primary.highlight, backgroundColor: themes[selectedMode][selectedTheme].primary.highlight} : {color: themes[selectedMode][selectedTheme].primary.subtext, borderColor: themes[selectedMode][selectedTheme].primary.subtext, backgroundColor: themes[selectedMode][selectedTheme].backgroundOpaque})} type="submit">Submit</button>
            </div>
        </form>
    )
}