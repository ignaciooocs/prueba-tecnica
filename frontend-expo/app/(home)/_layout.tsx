import { Ionicons, Octicons,  } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function HomeLayout() {
    return (
        <Tabs screenOptions={{ 
            tabBarStyle: { height: 80, display: "flex", justifyContent: "center", paddingTop: 15, paddingHorizontal: 10 },
         }}>
            <Tabs.Screen name="(index)" options={{
                tabBarLabel: "inicio",
                headerShown: false,
                tabBarIcon: ({ color, size }) => <Octicons name="home" size={size} color={color} />,
            }} />
            <Tabs.Screen name="pedidos" options={{
                tabBarIcon: ({ color, size }) => <Ionicons name="document-text-outline" size={size} color={color} />,
            }} />
            <Tabs.Screen name="ubicaciones" options={{
                tabBarIcon: ({ color, size }) => <Ionicons name="location-outline" size={size} color={color} />,
            }} />
        </Tabs>
    )
}