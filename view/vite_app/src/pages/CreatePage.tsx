import FloatingBackground from "../components/FloatingBackground"
import CreateForm from "../components/create/CreateForm"

export default function CreatePage() {

    return (
        <>
            <FloatingBackground particles={false} />
            <CreateForm />
        </>
    )
}