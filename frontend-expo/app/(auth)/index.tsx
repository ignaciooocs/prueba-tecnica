import Button from "@/components/Button";
import { signIn } from "@/services/auth.service";
import { useAuthStore } from "@/stores/use-auth-store";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { View } from "react-native";
import { Text, TextInput } from "react-native-paper";

export default function SignIn() {
    const [showPassword, setShowPassword] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState({ email: '', password: '' });

    const { setToken } = useAuthStore();

    async function handleSignIn() {
        try {
            const response = await signIn(user)
            console.log(response)

            if (!response.ok) {
                setError(response.message)
                return
            }

            await SecureStore.setItemAsync('userToken', response.token)
            setToken(response.token)

        } catch (error) {
            console.log(error)
            alert('Error al iniciar sesión')
        }
    }
    return (
        <View className="flex-1 justify-between">
            <View className="h-2/6 justify-center items-center">
                <Text variant="headlineLarge"  className="text-blue-500 font-bold">Demo</Text>
            </View>
            <View className="h-4/6 items-center bg-white rounded-t-[50px] p-4">
                <View className="h-full w-full pt-4 gap-y-6 px-4">
                    <Text variant="headlineSmall" className="text-gray-700 font-bold text-center mb-4">Iniciar Sesión</Text>
                        
                    <View className="">
                        <Text className="text-gray-700 font-bold mb-1">Correo Electrónico</Text>
                        <TextInput
                            value={user.email}
                            onChangeText={(text) => setUser({ ...user, email: text })}
                            textColor="black"
                            activeUnderlineColor="#3b82f6"
                            outlineColor="blue"
                            keyboardType="email-address"
                            placeholder="Ingresa tu correo"
                            className="border border-gray-300 text-black rounded-md bg-white h-10"
                        />
                    </View>
                    
                    <View>
                        <Text className="text-gray-700 font-bold mb-1">Contraseña</Text>
                        <TextInput
                            value={user.password}
                            onChangeText={(text) => setUser({ ...user, password: text })}
                            textColor="black"
                            activeUnderlineColor="#3b82f6"
                            secureTextEntry={showPassword}
                            placeholder="Ingresa contraseña"
                            right={<TextInput.Icon size={20} icon={showPassword ? "eye-off" : "eye"} color={showPassword ? "gray" : "black"} onPress={() => setShowPassword(!showPassword)} />}
                            className="border border-gray-300 text-black rounded-md bg-white h-10"
                        />
                    </View>

                    <Button 
                        text="Iniciar Sesión" 
                        classname="bg-blue-500 rounded-md py-3 px-6 items-center mt-4" 
                        color="white" 
                        onPress={handleSignIn}
                    />

                    <View className="flex-col h-2/5">
                        <Button 
                            text="Iniciar Sesión con Google" 
                            classname="bg-gray-200 gap-x-2 justify-center rounded-md py-3 px-6 items-center flex-row" 
                            color="black"
                        >
                            <Ionicons name="open-outline" size={20} color="black" />
                        </Button>
                        <Text className="text-gray-700 font-bold text-center mt-6">¿Aún no tienes una cuenta? <Link href="/(auth)/sign-up" className="text-blue-500 font-bold">Registrate aquí</Link></Text>
                    </View>

                </View>
            </View>
        </View>
    )
}
