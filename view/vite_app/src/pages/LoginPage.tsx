import FloatingBackground from "../components/FloatingBackground"
import LoginForm from "../components/login/LoginForm"

export default function LoginPage() {
    return (
        <>
            <FloatingBackground particles={false} />
            <LoginForm />
        </>
    )
}