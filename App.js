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
import Signup from "./src/features/works/screens/Signup";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import { theme } from "./src/infrastructure/theme";
import { MaterialIcons } from "@expo/vector-icons";
//import auth from "./config/firebase";

const Stack = createStackNavigator();
/*
const AuthenticatedUserContext = createContext({});
const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
*/

function ChatStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Chat" component={Login} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  return (
    <NavigationContainer>
      <ChatStack />
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();
const Settings = () => (
  <SafeArea>
    <Text />
  </SafeArea>
);

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;
                if (route.name === "Services") {
                  iconName = "work";
                } else if (route.name === "Settings") {
                  iconName = "settings";
                } else if (route.name === "Chat") {
                  iconName = "chat";
                }

                return (
                  <MaterialIcons name={iconName} size={size} color={color} />
                );
              },
            })}
            tabBarOptions={{
              activeTintColor: "red",
              inactiveTintColor: "gray",
            }}
          >
            <Tab.Screen name="Services" component={WorkScreen} />
            <Tab.Screen name="Chat" component={Login} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
