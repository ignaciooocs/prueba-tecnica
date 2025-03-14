import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StatusBar } from "react-native";

export default function HomeLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{
                title: "Demo",
                headerStyle: { backgroundColor: "#3b82f6"},
                tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
            }} />
            <Tabs.Screen name="pedidos" />
            <Tabs.Screen name="ubicaciones" />
        </Tabs>
    )
}