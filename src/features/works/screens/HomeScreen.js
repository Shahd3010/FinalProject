import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from "styled-components/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { theme } from "../../../../src/infrastructure/theme";

const Stack = createStackNavigator();
import Chat from "./Chat";
import { SettingsScreen } from "./setting.screen";
import Login from "./Login";
function ChatStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  return (
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

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "red",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Services" component={WorkScreen} />
      <Tab.Screen name="Chat" component={ChatStack} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const Tab = createBottomTabNavigator();
import { WorkScreen } from "./works.screen";

export default function HomeScreen() {
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
        <View style={styles.container}>
          <RootNavigator />
          <ExpoStatusBar style="auto" />
        </View>
      </ThemeProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
