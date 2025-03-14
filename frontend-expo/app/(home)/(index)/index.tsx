import Button from "@/components/Button";
import GooglePlacesInput from "@/components/GooglePlacesInput";
import useOpenDrawer from "@/hooks/useOpenDrawer";
import { useDealerStore } from "@/stores/use-dealer-store";
import { images } from "@/utils/images";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function Home () {
    useOpenDrawer()

    const router = useRouter();
    const { dealers } = useDealerStore();

    const [region, setRegion] = useState({
        latitude: -33.0245,
        longitude: -71.5518,
        latitudeDelta: 0.03,  // Ajusta para más zoom
        longitudeDelta: 0.03,  // Ajusta para más zoom
    });
    
    return (
        <View>
            <MapView 
                style={{ width: "100%", height: "100%" }} 
                region={region} // En lugar de initialRegion
                onRegionChangeComplete={setRegion} // Permite actualizar el estado               
                
            >
                {
                    dealers.map(dealer => (
                        <Marker
                            key={dealer.id}
                            coordinate={{
                                latitude: dealer.latitude,
                                longitude: dealer.longitude,
                            }}
                            title={dealer.name}
                            icon={images[dealer.icon]}
                        />
                    ))
                }
            </MapView>
            <GooglePlacesInput setRegion={setRegion} region={region} />
            <View className="">
            <Button 
                text="Repartidores cercanos" 
                classname="bg-blue-500 px-4 py-2 rounded-lg absolute bottom-5 flex-row items-center gap-x-2" 
                color="white" 
                onPress={() => router.navigate('/modal')} 
            >
                <Ionicons name="arrow-up-circle" size={20} color="white" />
            </Button>
            </View>
        </View>
    )
}