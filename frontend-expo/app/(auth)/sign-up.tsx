import Button from "@/components/Button";
import FormSignUp from "@/components/FormSignUp";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function SigUp() {
    return (
        <View className="flex-1 justify-between">
            <View className="h-1/5 justify-center items-center">
                <Text variant="headlineLarge" className="text-blue-500 font-bold">
                    Demo
                </Text>
            </View>
            <View className="h-4/5 items-center bg-white rounded-t-[50px] p-4">
                <View className="h-full w-full pt-4 gap-y-6 px-4">
                    <Text variant="headlineSmall" className="text-gray-700 font-bold text-center mb-4">
                        Registrarse
                    </Text>

                    <FormSignUp />

                    <View className="flex-col h-2/5">
                        <Button
                            text="Regístrate con Google"
                            classname="bg-gray-200 gap-x-2 justify-center rounded-md py-3 px-6 items-center flex-row"
                            color="black"
                        >
                            <Ionicons name="open-outline" size={20} color="black" />
                        </Button>
                        <Text className="text-gray-700 font-bold text-center mt-6">¿Ya tienes una cuenta? <Link href="/" className="text-blue-500 font-bold">Iniciar Sesión</Link></Text>
                        <Text className="text-gray-700 font-bold text-center mt-6">¿Necesitas verificar tu cuenta? <Link href="/(auth)/verify-email" className="text-blue-500 font-bold">Hazlo aquí</Link></Text>
                    </View>

                </View>
            </View>
        </View>
    )
}