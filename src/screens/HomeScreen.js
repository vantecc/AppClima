import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
 return (
  <View style={styles.container}>
   <Text style={styles.text}>Clima de Hoje</Text>
  </View>
 );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#1E90FF"
 },
 
 text: {
  fontSize: 24,
  color: "white",
 },
});

