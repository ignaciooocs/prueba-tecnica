import { View } from "react-native";
import { Link } from "expo-router";
import { Text } from "react-native-paper";
import FormUpdatePassword from "@/components/FormUpdatePassword";

export default function UpdatePassword() {
    

    return (
        <View className="h-full bg-white items-center p-4">
            <View className="h-full w-full pt-4 gap-y-6 px-4">
                <Text variant="headlineSmall" className="text-gray-700 font-bold text-center mb-4">
                    Crea una nueva contraseña
                </Text>

                <FormUpdatePassword />

                <View className="flex-col h-2/5">
                    <Text className="text-gray-700 font-bold text-center mt-6"><Link href="/" className="text-blue-500 font-bold">Volver al inicio</Link></Text>
                </View>

            </View>
        </View>
    )
}
