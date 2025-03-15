import { TextInput } from "react-native-paper";

export default function InputPasswordIcon({ showPassword, setShowPassword }: any) {
    return (
        <TextInput.Icon
            size={20}
            icon={showPassword ? "eye-off" : "eye"}
            color={showPassword ? "gray" : "black"}
            onPress={() => setShowPassword(!showPassword)}
        />
    )
}