import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image, Alert } from "react-native";
import { getForecast } from "../services/weatherService";
import { LinearGradient } from "expo-linear-gradient";

export default function ForecastScreen({ route }) {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const city = route.params?.city || "São Paulo";

  useEffect(() => {
    async function fetchForecast() {
      try {
        const data = await getForecast(city);
        setForecast(data);
        setError(null);
      } catch (error) {
        console.error("Erro ao buscar previsão:", error);
        setError(error.message);
        Alert.alert("Erro", error.message || "Não foi possível obter a previsão");
      } finally {
        setLoading(false);
      }
    }
    fetchForecast();
  }, [city]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!forecast || !forecast.list) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Nenhuma previsão disponível</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={["#4c669f", "#3b5998", "#192f6a"]} style={styles.container}>
      <Text style={styles.title}>Previsão para {city}</Text>
      <FlatList
        data={forecast.list.filter((item, index) => index % 8 === 0)}
        keyExtractor={(item) => item.dt.toString()}
        horizontal
        contentContainerStyle={styles.forecastList}
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
              <Text style={styles.temp}>{Math.round(item.main.temp)}°C</Text>
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
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  forecastList: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
    minWidth: 120,
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  icon: {
    width: 60,
    height: 60,
    marginVertical: 5,
  },
  temp: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
  },
});