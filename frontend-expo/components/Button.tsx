import { Text, TouchableOpacity, View } from "react-native";

interface ButtonProps {
    text: string;
    classname: string;
    color: string;
    children?: React.ReactNode;
    onPress?: () => void
}

export default function Button(
    { text, classname, color, children, onPress }: ButtonProps
) {
    return (
        <View className="items-center">
            <TouchableOpacity
                onPress={onPress}
                className={classname}
            >
                {children}
                <Text style={{ color: color }} className={`font-bold`}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}