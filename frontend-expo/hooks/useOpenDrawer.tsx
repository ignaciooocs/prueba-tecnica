import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { useEffect } from "react";

export default function useOpenDrawer() {
    const navigation = useNavigation()
      const toggleMenu = () => navigation.dispatch(DrawerActions.toggleDrawer())

    useEffect(() => {
    navigation.setOptions({
        headerRight: () => (
        <Ionicons name="menu" size={24} color="white" onPress={toggleMenu} style={{ marginRight: 10 }} />
        ),
    });
    }, [])
}