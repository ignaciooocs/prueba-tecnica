export interface IuserInput {
    email: string;
    password: string;
}

export function handlePreviousError(
    { userInput, setErrorResponse, isEmailValid, isPasswordValid }: 
    { userInput: IuserInput, setErrorResponse: (error: string) => void, isEmailValid: boolean, isPasswordValid: boolean }
) {


    if (!userInput.email || !userInput.password) {
        setErrorResponse("Todos los campos son obligatorios");
        return true
    }
    if (!isEmailValid) {
        return true
    }
    if (!isPasswordValid) {

        return true
    }

    return false
}