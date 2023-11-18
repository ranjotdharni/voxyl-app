import styles from '../../assets/css/create/createForm.module.css'
import CSRFToken from '../CSRFToken'
import { SUCCESS_PATH, fetchToApi, stringAfterLastChar } from '../../globals'
import CustomInput from '../CustomInput'
import { useState, MouseEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function CreateForm() {
    const navigation = useNavigate()
    const { next } = useParams()

    const [first, setFirst] = useState('')
    const [last, setLast] = useState('')
    const [email, setEmail] = useState('')
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [confirm, setConfirm] = useState('')
    const [error, setError] = useState('')

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
        <form className={styles.form} onSubmit={handleSubmit} action="/v1/auth/login" method="POST">
            <CSRFToken />

            <div className={styles.formHeaderWrapper}>
                <p className={styles.formHeader}>Create an Account</p>
            </div>
            
            <label className={styles.headLabel}>Enter Your Name</label>
            <div className={styles.wrapper + ' ' + styles.nameWrapper}>
                <div className={styles.firstNameWrapper}>
                    <CustomInput init={first} label='First' type='text' name='first' color='#093a3e' borderColor='#ebf2fa' callback={setFirst} />
                </div>

                <div className={styles.lastNameWrapper}>
                    <CustomInput init={last} label='Last' type='text' name='last' color='#093a3e' borderColor='#ebf2fa' callback={setLast} />
                </div>
            </div>

            <label className={styles.headLabel}>Enter Your Email</label>
            <div className={styles.wrapper}>
                <CustomInput init={email} label='Email' type='email' name='email' color='#093a3e' borderColor='#ebf2fa' callback={setEmail} />
            </div>

            <label className={styles.headLabel}>Make a Username</label>
            <div className={styles.wrapper}>
                <CustomInput init={user} label='Username' type='text' name='user' color='#093a3e' borderColor='#ebf2fa' callback={setUser} />
            </div>

            <label className={styles.headLabel}>Make a Password</label>
            <div className={styles.wrapper}>
                <CustomInput init={pass} label='Password' type='password' name='pass' color='#093a3e' borderColor='#ebf2fa' callback={setPass} />
            </div>

            <label className={styles.headLabel}>Confirm Your Password</label>
            <div className={styles.wrapper}>
                <CustomInput init={confirm} label='Confirm Password' type='password' name='confirm' color='#093a3e' borderColor='#ebf2fa' callback={setConfirm} />
            </div>

            <label className={styles.error}>{error}</label>

            <div className={styles.buttonWrapper}>
                <button onClick={handleSwitch} className={styles.switchButton} type='button'>Log In</button>
                <button className={styles.submitButton + (isFormFilled() && isPassGood() ? ' ' + styles.submitReady : '')} type="submit">Submit</button>
            </div>
        </form>
    )
}