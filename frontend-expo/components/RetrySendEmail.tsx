import { retryEmail } from "@/services/auth.service";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

export default function RetrySendEmail({ email, subject }: { email: string, subject: string }) {

    async function sendEmail() {
        if (!email) {
            alert("Debes ingresar el correo");
            return;
        }
        try {
            const response = await retryEmail({ email: email, subject });
            console.log(response);

            if (!response.ok) {
                alert(response.message);
                return;
            }

            alert(response.message);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <View className="flex-row justify-center items-center gap-x-2 mb-2">
                <Text className="text-gray-700 font-bold text-center">¿No recibiste el codigo?</Text>
            <TouchableOpacity onPress={sendEmail}>
                <Text className="text-blue-500 font-bold">reenviar</Text>
            </TouchableOpacity>
        </View>
    );
}