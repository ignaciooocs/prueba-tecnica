import { signUp } from "@/services/auth.service";
import { handlePreviousError, IInput } from "@/utils/constans";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import { HelperText } from "react-native-paper";
import Button from "./Button";
import InputField from "./InputField";
import InputPasswordIcon from "./InputPasswordIcon";

export default function FormSignUp() {
    
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(true);
    const [errorResponse, setErrorResponse] = useState<string | null>(null);
    const [userInput, setUserInput] = useState<IInput>({ email: "", password: "", confirmPassword: "" });
    const [loading, setLoading] = useState(false);

    // Validaciones
    const isEmailValid = userInput.email.includes("@") && userInput.email.includes(".");
    const isPasswordValid = userInput.password.length >= 6;
    const isConfirmPasswordValid = userInput.confirmPassword === userInput.password;

    const handleInputChange = (name: keyof IInput, text: string) => {
        setErrorResponse(null);
        setUserInput((prevState) => ({ ...prevState, [name]: text }));
    };
    
    async function handleSignIn() {
        setLoading(true);
        const verifyError: boolean = handlePreviousError({ userInput, setErrorResponse, isEmailValid, isPasswordValid });
        if (verifyError) {
            setLoading(false);
            return;
        }
        try {
            const response = await signUp({email: userInput.email, password: userInput.password});
            console.log(response);

            if (!response.ok) {
                setErrorResponse(response.message);
                setLoading(false);
                return;
            }

            Alert.alert("Exito", response.message, [{ text: "OK", onPress: () => router.navigate("/") }]);
            setLoading(false);
        } catch (error) {
            console.log(error);
            alert("Error al iniciar sesión");
            setLoading(false);
        }
    }

    return (
        <View>
            <InputField
                label="Correo Electrónico"
                value={userInput.email}
                onChangeText={(text) => handleInputChange("email", text)}
                placeholder="Ingresa tu correo"
                keyboardType="email-address"
                errorMessage={!isEmailValid && userInput.email.length > 0 ? "Ingrese un email válido." : ""}
            />
    
            <InputField
                label="Contraseña"
                value={userInput.password}
                onChangeText={(text) => handleInputChange("password", text)}
                placeholder="Ingresa tu contraseña"
                secureTextEntry={showPassword}
                rightIcon={InputPasswordIcon({ showPassword, setShowPassword })}
                errorMessage={!isPasswordValid && userInput.password.length > 0 ? "La contraseña debe tener al menos 6 caracteres." : ""}
            />

            <InputField
                label="Confirmar Contraseña"
                value={userInput.confirmPassword}
                onChangeText={(text) => handleInputChange("confirmPassword", text)}
                placeholder="Confirma tu contraseña"
                secureTextEntry={showPassword}
                rightIcon={InputPasswordIcon({ showPassword, setShowPassword })}
                errorMessage={!isConfirmPasswordValid && userInput.confirmPassword.length > 0 ? "Las contraseñas no coinciden." : ""}
            />

            {<HelperText type="error">{errorResponse}</HelperText>}
    
    
            {loading && (
                <View className="flex-row justify-center items-center">
                    <ActivityIndicator size="small" color="#3b82f6" />
                </View>
            )}
            <Button
                text="Iniciar Sesión"
                classname="bg-blue-500 rounded-md py-3 px-6 items-center"
                color="white"
                onPress={handleSignIn}
                disabled={loading}
            />

        </View>
    );
    
}