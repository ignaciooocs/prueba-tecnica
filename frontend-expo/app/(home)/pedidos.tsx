import { View } from "react-native";
import { Text } from "react-native-paper";

export default function Pedidos() {
    return (
        <View>
            <Text variant="titleLarge" theme={{ colors: { primary: "red" } }}>
                Pagina Pedidos
            </Text>
        </View>
    );
}