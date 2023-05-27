import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import WorkerProfileScreen from "./WorkerProfileScreen";
import ChatProfiles from "./ChatProfiles";
import SettingsScreen from "./SettingsScreen";
import Chat from "./Chat";
import Settings from "./Settings";

const Tab = createBottomTabNavigator();
const ProfileStack = createStackNavigator();
const ChatStack = createStackNavigator();
const SettingsStack = createStackNavigator();

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={WorkerProfileScreen}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
};

const ChatStackScreen = () => {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />
    </ChatStack.Navigator>
  );
};

const SettingsStackScreen = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
    </SettingsStack.Navigator>
  );
};

const HomeScreenWorker = ({ prop }) => {
  return (
    <Tab.Navigator
      initialRouteName=" Profile"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Profile") {
            iconName = "person-circle-outline";
          } else if (route.name === "Chat") {
            iconName = "chatbox-ellipses-outline";
          } else if (route.name === "Settings") {
            iconName = "settings-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#007AFF",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
      <Tab.Screen name="Chat" component={ChatStackScreen} />
      <Tab.Screen name="Settings" component={SettingsStackScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreenWorker;
