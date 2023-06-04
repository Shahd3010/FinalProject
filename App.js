import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import firebaseConfig from "./firebaseConfig.js";

//import Chat from "./src/features/works/screens/Chat";
//import { SettingsScreen } from "./src/features/works/screens/setting.screen";
import Login from "./src/features/works/screens/Login";
import HomeScreen from "./src/features/works/screens/HomeScreen";
import Signup from "./src/features/works/screens/Signup";
import SignUpType from "./src/features/works/screens/SignUpType";
import HomeScreenWorker from "./src/features/works/screens/HomeScreenWorker";
import SettingsScreen from "./src/features/works/screens/SettingsScreen";
import PostCard from "./src/features/works/screens/PostCard";
import PostsScreen from "./src/features/works/screens/PostsScreen";
/*

import { theme } from "./src/infrastructure/theme";
import { MaterialIcons } from "@expo/vector-icons";
import WorkerProfile from "./src/features/works/screens/WorkerProfile";*/
import SignUpWorker from "./src/features/works/screens/SignUpWorker";
import Settings from "./src/features/works/screens/Settings";
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SignUpWorker"
          component={SignUpWorker}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={Signup} />
        <Stack.Screen
          name="HomeScreenWorker"
          component={HomeScreenWorker}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="SignUpType" component={SignUpType} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
