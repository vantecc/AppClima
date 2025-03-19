import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/HomeScreen";
import ForecastScreen from "./src/screens/ForecastScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Hoje") {
              iconName = "sunny";
            } else if (route.name === "Previsão") {
              iconName = "cloud";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#FFD700",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Hoje" component={HomeScreen} />
        <Tab.Screen name="Previsão" component={ForecastScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
