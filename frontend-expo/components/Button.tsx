import { Text, TouchableOpacity, View } from "react-native";

interface ButtonProps {
    text: string;
    classname: string;
    color: string;
    children?: React.ReactNode;
    onPress?: () => void,
    disabled?: boolean
}

export default function Button(
    { text, classname, color, children, onPress, disabled }: ButtonProps
) {
    return (
        <View className="items-center">
            <TouchableOpacity
                onPress={onPress}
                className={classname}
                disabled={disabled}
            >
                {children}
                <Text style={{ color: color }} className={`font-bold`}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}