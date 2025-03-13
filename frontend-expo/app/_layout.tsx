import SplashScreenComponent from "@/components/SplashScreenComponent";
import { Stack } from "expo-router";
import { useState } from "react";

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <SplashScreenComponent onFinish={() => setIsLoading(false)} />;
  }

  return <Stack />;
}
