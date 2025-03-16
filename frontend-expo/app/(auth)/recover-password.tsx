import Button from "@/components/Button";
import Loader from "@/components/Loader";
import { recoverPassword } from "@/services/auth.service";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
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
        router.navigate({pathname: "/(auth)/verify-password", params: { email: email }})

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

                <View className="justify-center items-center">
                    <Text className="text-gray-700 font-bold mb-1 w-4/5">Correo electrónico</Text>
                    <TextInput
                        placeholder="Ingresa tu correo"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={(value) => {
                            setError(null);
                            setEmail(value)}
                        }
                        textColor="black"
                        activeUnderlineColor="#3b82f6"
                        keyboardType="email-address"
                        className="bg-white rounded-md h-10 w-4/5 border border-gray-300 text-black"
                    />

                    <HelperText type="error" visible={error !== null}>{error}</HelperText>
                    
                    {loading && <Loader />}

                    <Button 
                        text="Enviar código"
                        color="white"
                        classname="bg-blue-500 rounded-md px-6 py-4 mt-1"
                        onPress={handleVerification}
                        >
                    </Button>
                </View>
            </View>
        </View>
  );
}
