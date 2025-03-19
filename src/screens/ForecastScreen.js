import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ForecastScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Previsão do Tempo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4682B4",
  },
  text: {
    fontSize: 24,
    color: "white",
  },
});


