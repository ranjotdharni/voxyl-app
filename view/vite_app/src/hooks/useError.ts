import { useState } from "react";

export default function useError(message?: string): [error: string, throwError: (message: string) => void] {
    const [error, setError] = useState<string>((message !== undefined ? message : '') as string)

    function throwError(message: string) {
        setError(message)

        setTimeout(() => {
            setError('')
        }, 8000)
    }

    return [error, throwError]
}