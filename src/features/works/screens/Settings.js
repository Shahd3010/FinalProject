import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

const Settings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(false);

  const handleNotificationsToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleLocationToggle = () => {
    setLocationEnabled(!locationEnabled);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.option}>
          <Text style={styles.optionLabel}>Enable Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleNotificationsToggle}
          />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location</Text>
        <View style={styles.option}>
          <Text style={styles.optionLabel}>Enable Location Services</Text>
          <Switch
            value={locationEnabled}
            onValueChange={handleLocationToggle}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
  },
  optionLabel: {
    fontSize: 16,
  },
});

export default Settings;
