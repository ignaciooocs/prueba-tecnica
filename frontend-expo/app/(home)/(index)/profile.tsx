import Button from "@/components/Button";
import useOpenDrawer from "@/hooks/useOpenDrawer";
import { useAuthStore } from "@/stores/use-auth-store";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function Profile() {
        const { logout} = useAuthStore()
    
    useOpenDrawer()
    return (
        <View>
            <Text variant="titleLarge" className="text-blue-500">
                Pagina Profile
            </Text>
            <Button onPress={logout} text="Logout" classname="bg-red-500 px-4 py-2 rounded" color="white" />
            
        </View>
    )
}