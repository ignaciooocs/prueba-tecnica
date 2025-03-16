const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL as string
console.log(BASE_URL)

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

export async function verifyEmail(code: string) {
    try {
        const response = await fetch(BASE_URL + 'auth/verify-email/' + code, {
            method: 'POST'
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

export async function updatePassword({ email, password }: { email: string, password: string }) {
    try {
        const response = await fetch(BASE_URL + 'auth/update-password/', {
            method: 'PATCH',
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