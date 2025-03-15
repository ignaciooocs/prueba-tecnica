import Button from "@/components/Button";
import { verifyEmail } from "@/services/auth.service";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import { HelperText, Text, TextInput } from "react-native-paper";

export default function VerifyEmail() {
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>()
  const router = useRouter();

  const handleVerification = async (): Promise<void> => {
    setLoading(true);

    if (!code) {
        setError("El codigo es requerido");
        setLoading(false);
        return;
    }

    try {
        const response = await verifyEmail(code.toString());
        console.log(response);

        if (!response.ok) {
            setError(response.message);
            setLoading(false);
            return;
        }

        Alert.alert(
            "Exito", 
            response.message, 
            [{ text: "iniciar sesión", onPress: () => router.navigate("/") }]
        );

        setLoading(false);
    } catch (error) {
        console.log(error);
        alert("Error al verificar el correo");
        setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-between">
            <View className="h-2/5 justify-center items-center">
                <Text variant="headlineLarge" className="text-blue-500 font-bold">
                    Demo
                </Text>
            </View>
            <View className="h-3/5 items-center bg-white rounded-t-[50px] p-4">
                <View className="h-full w-full pt-4 gap-y-4">
                    <Text variant="headlineSmall" className="text-gray-600 font-bold text-center">
                        Verifica tu Cuenta
                    </Text>

                    <View className="justify-center items-center my-8">

                        <TextInput
                            placeholder="Ingresa el código"
                            value={code}
                            onChangeText={(value) => {
                                setError(null);
                                setCode(value)}
                            }
                            textColor="black"
                            activeUnderlineColor="#3b82f6"
                            keyboardType="numeric"
                            className="bg-white rounded-md mt-4 h-12 w-2/3 border border-gray-300 text-black"
                        />

                        <HelperText type="error" visible={error !== null}>{error}</HelperText>
                        
                        {loading && (
                            <View className="flex-row justify-center items-center">
                                <ActivityIndicator size="small" color="#3b82f6" />
                            </View>
                        )}

                        <Button 
                            text="Verificar"
                            color="white"
                            classname="bg-blue-500 rounded-md px-6 py-4 mt-2"
                            onPress={handleVerification}
                            >
                        </Button>
                    </View>

                    <View className="bg-red-400 p-3 rounded-md flex-row items-center justify-center">
                        <Ionicons name="warning-outline" size={20} color="white"/>
                        <Text className="text-bg-red-200 font-bold text-base ml-4">Recuerda revisar tu bandeja de spam</Text>
                    </View>

                    <View className="flex-col h-2/5">
                        <Text className="text-gray-700 font-bold text-center mt-6">¿Ya está verificado? <Link href="/" className="text-blue-500 font-bold">Volver al inicio</Link></Text>
                    </View>
                </View>
            </View>
        </View>
    
  );
}
