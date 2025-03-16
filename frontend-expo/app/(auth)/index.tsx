import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import Button from "@/components/Button";
import FormSignIn from "@/components/FormSignIn";
import { Text } from "react-native-paper";

export default function SignIn() {
    

    return (
        <View className="flex-1 justify-between">
            <View className="h-2/6 justify-center items-center">
                <Text variant="headlineLarge" className="text-blue-500 font-bold">
                    Demo
                </Text>
            </View>

            <View className="h-4/6 items-center bg-white rounded-t-[50px] p-4">
                <View className="h-full w-full pt-4 gap-y-6 px-4">
                    <Text variant="headlineSmall" className="text-gray-700 font-bold text-center mb-4">
                        Iniciar Sesión
                    </Text>

                   <FormSignIn />

                    <View className="flex-col h-2/5">
                        <Button
                            text="Iniciar Sesión con Google"
                            classname="bg-gray-200 gap-x-2 justify-center rounded-md py-3 px-6 items-center flex-row"
                            color="black"
                        >
                            <Ionicons name="open-outline" size={20} color="black" />
                        </Button>
                        <Text className="text-gray-700 font-bold text-center mt-6">¿Aún no tienes una cuenta? <Link href="/(auth)/sign-up" className="text-blue-500 font-bold">Registrate aquí</Link></Text>
                        <Text className="text-center mt-6"><Link href="/(auth)/recover-password" className="text-blue-400">¿Olvidaste tu contraseña?</Link></Text>
                    </View>

                </View>
            </View>
        </View>
    )
}
