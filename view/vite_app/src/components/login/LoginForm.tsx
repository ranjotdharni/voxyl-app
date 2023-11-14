import styles from '../../assets/css/login/loginForm.module.css'
import CSRFToken from '../CSRFToken'
import { SUCCESS_PATH, formSubmit } from '../../globals'
import CustomInput from '../CustomInput'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginForm() {
    const navigation = useNavigate()

    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState('')

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
        if (!isFormFilled())
        {
            e.preventDefault()
            throwError('Please fill all fields.')
            return
        }

        let response = await formSubmit(e)

        if (response.error === undefined)
        {
            navigation(SUCCESS_PATH)
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
                <CustomInput label='Username' type='text' name='user' color='#093a3e' borderColor='#ebf2fa' callback={setUser} />
            </div>

            <label className={styles.headLabel}>Password</label>
            <div className={styles.wrapper}>
                <CustomInput label='Password' type='password' name='pass' color='#093a3e' borderColor='#ebf2fa' callback={setPass} />
            </div>

            <label className={styles.error}>{error}</label>
            <button className={styles.submitButton + (isFormFilled() ? ' ' + styles.submitReady : '')} type="submit">Log In</button>
        </form>
    )
}