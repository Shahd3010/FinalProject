import React from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  const handleNotificationsToggle = () => {
    setNotificationsEnabled((prevValue) => !prevValue);
  };

  const handleDarkModeToggle = () => {
    setDarkModeEnabled((prevValue) => !prevValue);
  };

  const handleLogout = () => {
    // Handle logout logic here
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={handleNotificationsToggle}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dark Mode</Text>
        <Switch value={darkModeEnabled} onValueChange={handleDarkModeToggle} />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
        <Ionicons name="log-out-outline" size={24} color="#f57c00" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
  },
  logoutButtonText: {
    fontSize: 16,
    color: "#f57c00",
    marginRight: 8,
  },
});

export default SettingsScreen;
