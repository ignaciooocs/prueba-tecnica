import { useAuthStore } from "@/stores/use-auth-store";
import { Button, View } from "react-native";
import { Text } from "react-native-paper";

export default function Home () {
    const { logout} = useAuthStore()
    return (
        <View>
            <Text variant="titleLarge" theme={{ colors: { primary: "red" } }}>Pagina Home</Text>
            <Button onPress={logout} title="Logout" />
        </View>
    )
}