import { Stack } from 'expo-router';

export default function AuthLayout() {
    return (
        <Stack screenOptions={{ headerShown: false  }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="sign-up" />
            <Stack.Screen name="recover-password" />
            <Stack.Screen name="verify-email" />
            <Stack.Screen name="verify-password" />
        </Stack>
    )
}