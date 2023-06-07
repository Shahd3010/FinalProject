import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
const ProfileShow = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://example.com/profile-image.jpg" }}
        style={styles.profilePhoto}
      />
      <Text style={styles.profileName}>John Doe</Text>
      <Text style={styles.profileDescription}>
        I'm a software developer passionate about building amazing apps.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  profilePhoto: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  profileDescription: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
    color: "gray",
  },
});

export default ProfileShow;
