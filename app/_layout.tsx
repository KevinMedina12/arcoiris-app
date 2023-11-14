import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { createStackNavigator } from "@react-navigation/stack";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import Home from "./index";
import Employees from "./employees";

import "../styles/screen.css";
import Register from "./register";
import DashboardMenu from "./dashboard-menu";
import Clients from "./clients";
import Products from "./products";
import Sales from "./sales";
import StoragePage from "./storage";
import SalesEventsScreen from "./sales-events";

import { LanguageProvider } from "./context/LanguageProvider";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";
const Stack = createStackNavigator();
export const unstable_settings = {
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <LanguageProvider>
        <PaperProvider
          theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              cardStyle: {
                backgroundColor: "#0F172A",
              },
            }}
          >
            <Stack.Screen name="index" component={Home} />
            <Stack.Screen name="employees" component={Employees} />
            <Stack.Screen name="register" component={Register} />
            <Stack.Screen name="dashboard-menu" component={DashboardMenu} />
            <Stack.Screen name="clients" component={Clients} />
            <Stack.Screen name="products" component={Products} />
            <Stack.Screen name="sales" component={Sales} />
            <Stack.Screen name="storage" component={StoragePage} />
            <Stack.Screen name="sales-events" component={SalesEventsScreen} />
          </Stack.Navigator>
        </PaperProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
