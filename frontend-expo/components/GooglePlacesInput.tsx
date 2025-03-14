import React from 'react';
import { View, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Ionicons } from '@expo/vector-icons';

const GooglePlacesInput = ({ setRegion, region }: { region: any; setRegion: (region: any) => void; }) => {
    const GOOGLE_API = process.env.EXPO_PUBLIC_GOOGLE_API
    return (
        <View className="absolute top-5 w-full justify-center items-center z-50">
        <View className="w-11/12 bg-white px-4 py-4 rounded-lg">
            <Text className="text-left text-[15px] font-medium mb-1">Entregar pedido a:</Text>
            
            {/* Contenedor del Input con el ícono */}
            <View className="flex-row items-center justify-center border border-gray-300 rounded-lg px-2">
            {/* Ícono de ubicación */}
            <Ionicons name="location-outline" size={16} color="gray" style={{ position: 'absolute', left: 5, top: 13, zIndex: 50 }} />
            
            {/* Google Places Autocomplete */}
            <GooglePlacesAutocomplete
                placeholder="Ingresa una dirección"
                onPress={(data, details = null) => {
                if (details) {
                    setRegion({ ...region, latitude: details.geometry.location.lat, longitude: details.geometry.location.lng });}
                }
                }
                query={{
                  key: GOOGLE_API,
                language: 'es',
                }}
                fetchDetails={true}
                styles={{
                container: {
                    flex: 1,
                },
                textInput: {
                    flex: 1,
                    fontSize: 13,
                    fontWeight: '500',
                    height: 35,
                    borderWidth: 0, // Ocultamos el borde del input
                    marginTop: 4,
                    marginLeft: 6
                }
                }}
            />
            </View>
        </View>
        </View>
    );
};

export default GooglePlacesInput;
