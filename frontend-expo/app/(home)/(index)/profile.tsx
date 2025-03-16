import Button from "@/components/Button";
import useOpenDrawer from "@/hooks/useOpenDrawer";
import { useAuthStore } from "@/stores/use-auth-store";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function Profile() {
        const { logout, email } = useAuthStore()
    
    useOpenDrawer()
    return (
        <View className="p-4">
            {email &&<View className="flex-row justify-center items-center w-full p-4">
                <Text className="text-black font-bold text-base">Correo: </Text>
                <Text className="text-black text-base">{email}</Text>
            </View>}
            <Button onPress={logout} text="Cerrar sesión" classname="bg-red-500 px-8 py-4 rounded" color="white" />
        </View>
    )
}