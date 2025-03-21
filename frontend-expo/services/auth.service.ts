import { getApiUrl } from "@/utils/get-api-url";
const BASE_URL = getApiUrl();

export async function signIn ({email, password }: { email: string, password: string }): Promise<any> {
    try {
        const response = await fetch(BASE_URL + 'auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function signUp ({email, password }: { email: string, password: string }): Promise<any> {
    try {
        const response = await fetch(BASE_URL + 'auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function verifyEmail({ code, email }: { code: string, email: string | string[] }) {
    try {
        const response = await fetch(BASE_URL + 'auth/verify-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, code })
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function recoverPassword({ email }: { email: string }) {
    try {
        const response = await fetch(BASE_URL + 'auth/recover-password/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function verifyPassword({ email, code }: { email: string, code: string }) {
    try {
        const response = await fetch(BASE_URL + 'auth/verify-recover-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, code })
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function updatePassword({ email, password, confirmPassword }: { email: string, password: string, confirmPassword: string }) {
    try {
        const response = await fetch(BASE_URL + 'auth/update-password/', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, confirmPassword })
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function retryEmail({ email, subject }: { email: string, subject: string }) {
    try {
        const response = await fetch(BASE_URL + 'auth/retry-code-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, subject })
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}