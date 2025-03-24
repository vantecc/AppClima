import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image, FlatList, Alert } from "react-native";
import { getWeather, getForecast } from "../services/weatherService";
import { LinearGradient } from "expo-linear-gradient";
import { TextInput, Button } from "react-native-paper";

export default function HomeScreen({ navigation }) {
  const [city, setCity] = useState("Teresina");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchData(cityName) {
    setLoading(true);
    try {
      const [weatherData, forecastData] = await Promise.all([
        getWeather(cityName),
        getForecast(cityName)
      ]);

      setWeather(weatherData);
      setForecast(forecastData);
      
      // Atualiza a cidade na tela de previsão
      navigation.setParams({ city: cityName });
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
      setWeather(null);
      setForecast(null);
      Alert.alert(
        "Erro",
        error.message || "Não foi possível encontrar informações para esta cidade",
        [{ text: "OK" }]
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData(city);
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  if (!weather || !forecast) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Nenhum dado climático disponível</Text>
      </View>
    );
  }

  const iconCode = weather?.weather[0]?.icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <LinearGradient colors={["#4c669f", "#3b5998", "#192f6a"]} style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput 
          label="Buscar cidade" 
          value={city} 
          onChangeText={setCity} 
          mode="outlined" 
          style={styles.input}
          theme={{ colors: { primary: '#FFD700' } }}
          onSubmitEditing={()=>fetchData(city)}
        />
        <Button 
          mode="contained" 
          onPress={() => fetchData(city)} 
          style={styles.button}
          color="#FFD700"
        >
          Buscar
        </Button>
      </View>

      <Text style={styles.city}>{weather?.name || "Cidade não encontrada"}</Text>
      <Image source={{ uri: iconUrl }} style={styles.weatherIcon} />
      <Text style={styles.temp}>{Math.round(weather?.main?.temp)}°C</Text>
      <Text style={styles.description}>
        {weather?.weather[0]?.description}
      </Text>

      <View style={styles.forecastContainer}>
        <Text style={styles.forecastTitle}>Próximos Dias</Text>
        <FlatList
          data={forecast.list.filter((item, index) => index % 8 === 0)}
          keyExtractor={(item) => item.dt.toString()}
          horizontal
          renderItem={({ item }) => {
            const forecastIconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
            return (
              <View style={styles.forecastItem}>
                <Text style={styles.forecastDate}>
                  {new Date(item.dt * 1000).toLocaleDateString("pt-BR", {
                    weekday: "short",
                    day: "2-digit",
                  })}
                </Text>
                <Image source={{ uri: forecastIconUrl }} style={styles.forecastIcon} />
                <Text style={styles.forecastTemp}>{Math.round(item.main.temp)}°C</Text>
              </View>
            );
          }}
        />
      </View>
    </LinearGradient>
  );
}

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
    width: "100%",
  },
  city: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  temp: {
    fontSize: 48,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  description: {
    fontSize: 20,
    fontStyle: "italic",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  weatherIcon: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  forecastContainer: {
    marginTop: 20,
    alignItems: "center",
    width: "100%",
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
    minWidth: 100,
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