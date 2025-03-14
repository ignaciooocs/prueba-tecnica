import useOpenDrawer from "@/hooks/useOpenDrawer";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function Home () {
    useOpenDrawer()

    return (
        <View>
            <Text variant="titleLarge" theme={{ colors: { primary: "red" } }}>Pagina Home</Text>
        </View>
    )
}