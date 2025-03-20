import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image } from "react-native";
import { getForecast } from "../services/weatherService";
import { LinearGradient } from "expo-linear-gradient";

export default function ForecastScreen() {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchForecast() {
      const data = await getForecast();
      console.log("Previsão recebida:", data);
      setForecast(data);
      setLoading(false);
    }
    fetchForecast();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={["#4c669f", "#3b5998", "#192f6a"]}
      style={styles.container}
    >
      <Text style={styles.title}>Previsão para os próximos dias</Text>
      <FlatList
        data={forecast.list.filter((item, index) => index % 8 === 0)}
        keyExtractor={(item) => item.dt.toString()}
        horizontal
        renderItem={({ item }) => {
          const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
          return (
            <View style={styles.card}>
              <Text style={styles.date}>
                {new Date(item.dt * 1000).toLocaleDateString("pt-BR", {
                  weekday: "short",
                  day: "2-digit",
                })}
              </Text>
              <Image source={{ uri: iconUrl }} style={styles.icon} />
              <Text style={styles.temp}>{item.main.temp}°C</Text>
              <Text style={styles.description}>{item.weather[0].description}</Text>
            </View>
          );
        }}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 10,
    marginHorizontal: 8,
    borderRadius: 10,
    alignItems: "center",
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  icon: {
    width: 50,
    height: 50,
  },
  temp: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  description: {
    fontSize: 14,
    color: "white",
  },
});
