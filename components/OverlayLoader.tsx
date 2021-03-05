import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const OverlayLoader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color={"white"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(5,119,189,0.8)",
  },
});

export default OverlayLoader;
