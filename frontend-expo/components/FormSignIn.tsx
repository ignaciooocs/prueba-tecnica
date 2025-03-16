import { View, ActivityIndicator, Alert } from "react-native";
import {  HelperText } from "react-native-paper";
import Button from "./Button";
import { useState } from "react";
import { handlePreviousError, IuserInput } from "@/utils/handle-previus-error";
import { useAuthStore } from "@/stores/use-auth-store";
import { signIn } from "@/services/auth.service";
import * as SecureStore from "expo-secure-store";
import InputPasswordIcon from "./InputPasswordIcon";
import InputField from "./InputField";
import { useRouter } from "expo-router";
import Loader from "./Loader";

export default function FormSignIn() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(true);
    const [errorResponse, setErrorResponse] = useState<string | null>(null);
    const [userInput, setUserInput] = useState<IuserInput>({ email: "", password: "" });
    const { setToken, setEmail } = useAuthStore();
    const [loading, setLoading] = useState(false);

    // Validaciones
    const isEmailValid = userInput.email.includes("@") && userInput.email.includes(".");
    const isPasswordValid = userInput.password.length >= 6;

    const handleInputChange = (name: keyof IuserInput, text: string) => {
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
            const response = await signIn(userInput);
            console.log(response);

            if (!response.ok) {
                setErrorResponse(response.message);
                setLoading(false);
                if (response.message === "Debe verificar su correo") {
                    Alert.alert(
                        "Atención", 
                        response.message, 
                        [{ text: "Verificar", onPress: () => router.navigate({ pathname: "/(auth)/verify-email", params: { email: userInput.email }}) }]
                    );
                }
                return;
            }

            await SecureStore.setItemAsync("userToken", response.token);
            setToken(response.token);
            setEmail(response.email);
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
            {<HelperText type="error">{errorResponse}</HelperText>}
    
    
            {loading && <Loader />}
            
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