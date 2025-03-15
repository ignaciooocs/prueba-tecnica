import { KeyboardTypeOptions, View } from "react-native";
import { HelperText, Text, TextInput } from "react-native-paper";

export default function InputField ({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType = "default",
    secureTextEntry = false,
    errorMessage,
    rightIcon,
}: {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    keyboardType?: KeyboardTypeOptions;
    secureTextEntry?: boolean;
    errorMessage?: string | null;
    rightIcon?: React.ReactNode;
})  {
    return (
        <View>
            <Text className="text-gray-700 font-bold mb-1">{label}</Text>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                textColor="black"
                activeUnderlineColor="#3b82f6"
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                className="border border-gray-300 text-black rounded-md bg-white h-10"
                right={rightIcon}
            />
            {<HelperText type="error">{errorMessage}</HelperText>}
        </View>
    );
};
