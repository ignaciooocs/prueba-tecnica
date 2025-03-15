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