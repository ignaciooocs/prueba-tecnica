import SplashScreenComponent from "@/components/SplashScreenComponent";
import { Stack } from "expo-router";
import { useState } from "react";
import { PaperProvider} from 'react-native-paper'

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <SplashScreenComponent onFinish={() => setIsLoading(false)} />;
  }

  return (
    <PaperProvider>
      <Stack />
    </PaperProvider>
  );
}
