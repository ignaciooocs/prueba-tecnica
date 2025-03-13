import React, { useEffect } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as SplashScreen from "expo-splash-screen";

const SplashScreenComponent = ({ onFinish }: { onFinish: () => void }) => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
      onFinish();
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/demo-icon.png")} style={styles.image} />
      <LinearGradient
        colors={["rgba(34, 170, 221, 0)", "rgba(34, 170, 221, 1)"]}
        style={styles.overlay}
      />
      <Text style={styles.text}>Demo</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    position: "absolute",
  },
});

export default SplashScreenComponent;
