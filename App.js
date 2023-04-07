import React, { useState, createContext, useContext, useEffect } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { WorkScreen } from "./src/features/works/screens/works.screen";
import { ThemeProvider } from "styled-components/native";
import { Text, View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
//import { onAuthStateChanged } from "firebase/auth";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeArea } from "./src/components/utility/safe-area.component";
import Chat from "./src/features/works/screens/Chat";
import { SettingsScreen } from "./src/features/works/screens/setting.screen";
import Login from "./src/features/works/screens/Login";
import HomeScreen from "./src/features/works/screens/HomeScreen";
import Signup from "./src/features/works/screens/Signup";
import SignUpType from "./src/features/works/screens/SignUpType";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import { theme } from "./src/infrastructure/theme";
import { MaterialIcons } from "@expo/vector-icons";
import WorkerProfile from "./src/features/works/screens/WorkerProfile";
//import auth from "./config/firebase";

const Stack = createStackNavigator();
const LogInStack = createStackNavigator();
function RootNavigator() {
  return (
    <NavigationContainer>
      <ChatStack />
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();
function LogInStackScreen() {
  return (
    <LogInStack>
      <LogInStack.Screen
        name="HomeScreen"
        component={SignUpType}
      ></LogInStack.Screen>
    </LogInStack>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="SignUpType" component={SignUpType} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
