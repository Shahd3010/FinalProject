import React, { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import { List, Avatar } from "react-native-paper";
import styled from "styled-components/native";
import Spacer from "react-native-spacer";
const AvatarContainer = styled.View`
  align-items: center;
`;

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(false);

  const handleNotificationsToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleLocationToggle = () => {
    setLocationEnabled(!locationEnabled);
  };

  const handleEditProfile = () => {
    // Navigate to the edit profile screen
  };

  const handleChangePassword = () => {
    // Navigate to the change password screen
  };

  const handleDeleteAccount = () => {
    // Prompt the user to confirm account deletion and then delete the account
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Profile</Text>
        <AvatarContainer>
          <Avatar.Icon size={50} icon="human" backgroundColor="#f57c00" />
          <Spacer position="left" size="small"></Spacer>
        </AvatarContainer>
        <TouchableOpacity style={styles.option} onPress={handleEditProfile}>
          <Text style={styles.optionLabel}>Edit Name and Password</Text>
          <Ionicons name="chevron-forward" size={24} color="#BDBDBD" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={handleDeleteAccount}>
          <Text style={[styles.optionLabel, { color: "red" }]}>
            Delete Account
          </Text>
          <Ionicons name="chevron-forward" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.option}>
          <Text style={styles.optionLabel}>Enable Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleNotificationsToggle}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={notificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
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
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={locationEnabled ? "#f5dd4b" : "#f4f3f4"}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 40,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  optionLabel: {
    fontSize: 16,
  },
  button: {
    backgroundColor: "#f57c00",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SettingsScreen;
