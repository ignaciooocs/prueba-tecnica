import 'react-native-get-random-values';

import SplashScreenComponent from "@/components/SplashScreenComponent";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/use-auth-store";
import { PaperProvider } from "react-native-paper";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const { session, checkAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    async function initAuth() {
      await checkAuth();
      setIsLoading(false);
    }
    initAuth();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      router.replace(session ? "/(home)/(index)" : "/(auth)");
    }
  }, [session, isLoading]);

  if (isLoading) {
    return <SplashScreenComponent onFinish={() => setIsLoading(false)} />;
  }

  return (
    <GestureHandlerRootView>
      <PaperProvider>
        <StatusBar backgroundColor={!session ? undefined : "#3b82f6"} />
          <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(home)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{
              headerShown: false,
              animation: 'none',
              presentation: 'transparentModal'
            }} />
          </Stack>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
