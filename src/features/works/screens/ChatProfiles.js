import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Chat from "./Chat";

const ProfileListItem = ({ name, message, avatarUri, onPress }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Chat");
  };
  return (
    <TouchableOpacity style={styles.profileItem} onPress={handlePress}>
      <Image source={{ uri: avatarUri }} style={styles.profileAvatar} />
      <View style={styles.profileDetails}>
        <Text style={styles.profileName}>{name}</Text>
        <Text style={styles.profileMessage} numberOfLines={1}>
          {message}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const ChatProfiles = () => {
  const navigation = useNavigation();
  const profiles = [
    {
      id: 1,
      name: "Majed",
      message: "Hey.. what are the prices?",
      avatarUri:
        "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=1024x1024&w=is&k=20&c=-mUWsTSENkugJ3qs5covpaj-bhYpxXY-v9RDpzsw504=",
    },
  ];

  return (
    <View style={styles.container}>
      {profiles.map((profile) => (
        <ProfileListItem
          key={profile.id}
          name={profile.name}
          message={profile.message}
          avatarUri={profile.avatarUri}
          navigation={navigation}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  profileAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 4,
  },
  profileMessage: {
    fontSize: 16,
    color: "#666",
  },
});

export default ChatProfiles;
