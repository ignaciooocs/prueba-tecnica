export interface IuserInput {
    email: string;
    password: string;
}

export interface IInput extends IuserInput {
    confirmPassword: string
}

interface Props {
    userInput: IuserInput | IInput;
    setErrorResponse: (error: string) => void;
    isEmailValid: boolean;
    isPasswordValid: boolean;
}

export function handlePreviousError(
    { userInput, setErrorResponse, isEmailValid, isPasswordValid }: Props
) {


    if (!userInput.email || !userInput.password ) {
        setErrorResponse("Todos los campos son obligatorios");
        return true
    }

    if (!isEmailValid) {
        return true
    }
    if (!isPasswordValid) {

        return true
    }

    if ("confirmPassword" in userInput && !userInput.confirmPassword) {
        setErrorResponse("Todos los campos son obligatorios");
        return true;
    }

     // Solo valida confirmPassword si está presente (para registro)
     if ("confirmPassword" in userInput && userInput.password !== userInput.confirmPassword) {
        return true;
    }

    return false
}