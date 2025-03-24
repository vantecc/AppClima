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
              iconName = "calendar";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#FFD700",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "#192f6a",
          },
          headerStyle: {
            backgroundColor: "#192f6a",
          },
          headerTintColor: "#FFF",
        })}
      >
        <Tab.Screen 
          name="Hoje" 
          component={HomeScreen} 
          options={{ 
            title: "Clima Atual" 
          }} 
        />
        <Tab.Screen 
          name="Previsão" 
          component={ForecastScreen} 
          options={{ 
            title: "Previsão 5 Dias" 
          }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}