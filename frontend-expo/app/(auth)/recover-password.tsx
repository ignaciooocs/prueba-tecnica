import Button from "@/components/Button";
import { recoverPassword } from "@/services/auth.service";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import { HelperText, Text, TextInput } from "react-native-paper";

export default function RecoverPassword() {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>()
  const router = useRouter();

  const handleVerification = async (): Promise<void> => {
    setLoading(true);

    if (!email) {
        setError("Debes ingresar el correo electrónico");
        setLoading(false);
        return;
    }

    try {
        const response = await recoverPassword({ email });
        console.log(response);

        if (!response.ok) {
            setError(response.message);
            setLoading(false);
            return;
        }

        Alert.alert(
            "Codigo enviado", 
           response.message, 
            [{ text: "Verificar", onPress: () => router.push({pathname: "/(auth)/verify-password", params: { email: email }}) }]
        );

        setLoading(false);
    } catch (error) {
        console.log(error);
        alert("Error al verificar el correo");
        setLoading(false);
    }
  };

  return (
        <View className="h-full items-center bg-white p-4">
            <View className="h-full w-full pt-4 gap-y-4">
                <Text variant="headlineSmall" className="text-gray-600 font-bold text-center">
                    Recuperar contraseña
                </Text>

                <View className="justify-center items-center my-8">

                    <TextInput
                        placeholder="Ingresa tu correo"
                        value={email}
                        onChangeText={(value) => {
                            setError(null);
                            setEmail(value)}
                        }
                        textColor="black"
                        activeUnderlineColor="#3b82f6"
                        keyboardType="email-address"
                        className="bg-white rounded-md mt-4 h-12 w-2/3 border border-gray-300 text-black"
                    />

                    <HelperText type="error" visible={error !== null}>{error}</HelperText>
                    
                    {loading && (
                        <View className="flex-row justify-center items-center">
                            <ActivityIndicator size="small" color="#3b82f6" />
                        </View>
                    )}

                    <Button 
                        text="Enviar código"
                        color="white"
                        classname="bg-blue-500 rounded-md px-6 py-4 mt-2"
                        onPress={handleVerification}
                        >
                    </Button>
                </View>

                <View className="flex-col h-2/5">
                    <Text className="text-gray-700 font-bold text-center"><Link href="/" className="text-blue-500 font-bold">Volver al inicio</Link></Text>
                </View>
            </View>
        </View>
  );
}
