import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image, FlatList } from "react-native";
import { getWeather, getForecast } from "../services/weatherService";
import { LinearGradient } from "expo-linear-gradient";
import { TextInput, Button } from "react-native-paper";

export default function HomeScreen() {
  const [city, setCity] = useState("Teresina");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchData(cityName) {
   setLoading(true);
   try {
     const weatherData = await getWeather(cityName);
     const forecastData = await getForecast(cityName);
 
     if (!weatherData || weatherData.cod !== 200) {
       throw new Error("Cidade não encontrada");
     }
 
     if (!forecastData || forecastData.cod !== "200") {
       throw new Error("Previsão não disponível");
     }
 
     setWeather(weatherData);
     setForecast(forecastData);
   } catch (error) {
     console.error("Erro ao buscar os dados:", error);
     setWeather("erro");
     setForecast("erro");
   }
   setLoading(false);
 }
 
 

  useEffect(() => {
    fetchData(city);
  }, []);

  if (loading || !forecast || !forecast.list) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  const iconCode = weather?.weather[0]?.icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  if (loading) {
   return (
     <View style={styles.container}>
       <ActivityIndicator size="large" color="#FFD700" />
     </View>
   );
 }
 
 if (weather === "erro") {
   return (
     <View style={styles.container}>
       <Text style={styles.errorText}>Cidade não encontrada</Text>
     </View>
   );
 }

 return (
  <LinearGradient colors={["#4c669f", "#3b5998", "#192f6a"]} style={styles.container}>
    <View style={styles.searchContainer}>
      <TextInput label="Buscar cidade" value={city} onChangeText={setCity} mode="outlined" style={styles.input} />
      <Button mode="contained" onPress={() => fetchData(city)} style={styles.button}>
        Buscar
      </Button>
    </View>

    <Text style={styles.city}>{weather?.name || "Cidade não encontrada"}</Text>
    <Image source={{ uri: iconUrl }} style={styles.weatherIcon} />
    <Text style={styles.temp}>{weather.main.temp}°C</Text>
    <Text style={styles.description}>{weather.weather[0].description}</Text>

    <View style={styles.forecastContainer}>
      <Text style={styles.forecastTitle}>Próximos Dias</Text>
      <FlatList
        data={forecast.list.filter((item, index) => index % 8 === 0)}
        keyExtractor={(item) => item.dt.toString()}
        horizontal
        renderItem={({ item }) => {
          const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
          return (
            <View style={styles.forecastItem}>
              <Text style={styles.forecastDate}>
                {new Date(item.dt * 1000).toLocaleDateString("pt-BR", {
                  weekday: "short",
                  day: "2-digit",
                })}
              </Text>
              <Image source={{ uri: iconUrl }} style={styles.forecastIcon} />
              <Text style={styles.forecastTemp}>{item.main.temp}°C</Text>
            </View>
          );
        }}
      />
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: "flex-start",
   alignItems: "center",
   paddingHorizontal: 20,
   paddingTop: 50,
 },
 searchContainer: {
   width: "100%",
   alignItems: "center",
   marginBottom: 20,
 },
 input: {
   width: "100%",
   backgroundColor: "white",
 },
 button: {
   marginTop: 10,
 },
 city: {
   fontSize: 28,
   fontWeight: "bold",
   color: "white",
   marginBottom: 10,
 },
 temp: {
   fontSize: 48,
   fontWeight: "bold",
   color: "white",
 },
 description: {
   fontSize: 20,
   fontStyle: "italic",
   color: "white",
   marginBottom: 20,
 },
 weatherIcon: {
   width: 100,
   height: 100,
 },
 forecastContainer: {
   marginTop: 20,
   alignItems: "center",
 },
 forecastTitle: {
   fontSize: 18,
   fontWeight: "bold",
   color: "white",
   marginBottom: 10,
 },
 forecastItem: {
   backgroundColor: "rgba(255, 255, 255, 0.2)",
   padding: 10,
   marginHorizontal: 8,
   borderRadius: 10,
   alignItems: "center",
 },
 forecastDate: {
   fontSize: 16,
   fontWeight: "bold",
   color: "white",
 },
 forecastIcon: {
   width: 50,
   height: 50,
 },
 forecastTemp: {
   fontSize: 16,
   fontWeight: "bold",
   color: "white",
 },
 errorText: {
   fontSize: 20,
   color: "red",
   fontWeight: "bold",
   marginTop: 20,
 },
});