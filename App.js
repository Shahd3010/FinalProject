import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import { createStackNavigator } from "@react-navigation/stack";

//import Chat from "./src/features/works/screens/Chat";
//import { SettingsScreen } from "./src/features/works/screens/setting.screen";
import Login from "./src/features/works/screens/Login";
import HomeScreen from "./src/features/works/screens/HomeScreen";
import Signup from "./src/features/works/screens/Signup";
import SignUpType from "./src/features/works/screens/SignUpType";
import HomeScreenWorker from "./src/features/works/screens/HomeScreenWorker";
import SettingsScreen from "./src/features/works/screens/SettingsScreen";
/*

import { theme } from "./src/infrastructure/theme";
import { MaterialIcons } from "@expo/vector-icons";
import WorkerProfile from "./src/features/works/screens/WorkerProfile";*/
import SignUpWorker from "./src/features/works/screens/SignUpWorker";
import Settings from "./src/features/works/screens/Settings";
const Stack = createStackNavigator(); /*
function RootNavigator() {
  return (
    <NavigationContainer>
      <ChatStack />
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();*/
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="HomeScreenWorker" component={HomeScreenWorker} />

        <Stack.Screen name="SignUpType" component={SignUpType} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUpWorker" component={SignUpWorker} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
