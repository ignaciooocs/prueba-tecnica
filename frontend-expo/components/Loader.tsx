import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function Loader() {
    return (
        <View className="flex-row justify-center items-center">
            <ActivityIndicator size="small" color="#3b82f6" />
        </View>
    )
}