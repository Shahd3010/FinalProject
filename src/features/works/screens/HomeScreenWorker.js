import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import WorkerProfileScreen from "./WorkerProfileScreen";
import Chat from "./Chat";
import Settings from "./Settings";
import { useRoute } from "@react-navigation/native";
import {
  collection,
  getDocs,
  query,
  where,
  getFirestore,
} from "firebase/firestore";

const Tab = createBottomTabNavigator();
const ProfileStack = createStackNavigator();
const ChatStack = createStackNavigator();
const SettingsStack = createStackNavigator();

const ProfileStackScreen = ({ route }) => {
  const userId = route.params.userId;
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={WorkerProfileScreen}
        initialParams={{ userId }}
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

const HomeScreenWorker = () => {
  const route = useRoute();
  const userId = route.params?.userId;
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const firestore = getFirestore();
        const userRef = collection(firestore, "users");
        const querySnapshot = await getDocs(
          query(userRef, where("userId", "==", userId))
        );

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          const name = userData.name; // Assuming the user's name field is named "name"
          console.log("User Name:", name); // Check the fetched user name
          setUserName(name);
        }
      } catch (error) {
        console.log("Fetch user name error", error);
      }
    };

    if (userId) {
      fetchUserName();
    }
  }, [userId]);

  return (
    <Tab.Navigator
      initialRouteName="Profile"
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
