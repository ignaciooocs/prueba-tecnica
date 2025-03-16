import { updatePassword } from "@/services/auth.service";
import {IInput } from "@/utils/constans";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import { HelperText } from "react-native-paper";
import Button from "./Button";
import InputField from "./InputField";
import InputPasswordIcon from "./InputPasswordIcon";

export default function FormUpdatePassword() {
    
    const router = useRouter();
    const { email } = useLocalSearchParams();

    const [showPassword, setShowPassword] = useState(true);
    const [errorResponse, setErrorResponse] = useState<string | null>(null);
    const [userInput, setUserInput] = useState({ password: "", confirmPassword: "" });
    const [loading, setLoading] = useState(false);

    // Validaciones
    const isPasswordValid = userInput.password.length >= 6;
    const isConfirmPasswordValid = userInput.confirmPassword === userInput.password;

    const handleInputChange = (name: keyof IInput, text: string) => {
        setErrorResponse(null);
        setUserInput((prevState) => ({ ...prevState, [name]: text }));
    };
    
    async function handleSignIn() {
        setLoading(true);

        if (!userInput.password || !userInput.confirmPassword) {
            setErrorResponse("Todos los campos son obligatorios");
            setLoading(false);
            return;
        }

        if (!isPasswordValid || !isConfirmPasswordValid) {
            setLoading(false);
            return;
        }
        try {
            const response = await updatePassword({ email: email as string, password: userInput.password});
            console.log(response);

            if (!response.ok) {
                setErrorResponse(response.message);
                setLoading(false);
                return;
            }

            Alert.alert("Contraseña actualizada", response.message, [{ text: "Iniciar sesión", onPress: () => router.navigate("/") }]);
            setLoading(false);
        } catch (error) {
            console.log(error);
            alert("Error al iniciar sesión");
            setLoading(false);
        } finally {
            setLoading(false);
            setUserInput({ password: "", confirmPassword: "" });
        }
    }

    return (
        <View>  
            <InputField
                label="Nueva Contraseña"
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
                text="Actualizar"
                classname="bg-blue-500 rounded-md py-3 px-6 items-center"
                color="white"
                onPress={handleSignIn}
                disabled={loading}
            />

        </View>
    );
    
}