
import { Drawer } from 'expo-router/drawer'


export default function HomeDrawerLayout() {

    return (
        <Drawer 
            screenOptions={{ 
            headerTitleAlign: "center",
            headerTitleStyle: { color: "white" },
            headerStyle: { backgroundColor: "#3b82f6" },
            headerLeft: () => null,
            drawerPosition: "right",
         }}>
            <Drawer.Screen name="index" options={{ 
                title: "inicio"
             }} />
            <Drawer.Screen name="profile" options={{
                title: "perfil"
            }} />
        </Drawer>
    )
}