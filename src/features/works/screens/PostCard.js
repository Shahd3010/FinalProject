import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Chat from "./Chat";

const PostCard = ({ post }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleChatPress = () => {
    navigation.navigate("Chat");
  };

  const handleImagePress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={handleImagePress}>
        {post.imageUrl ? (
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: post.imageUrl }} />
          </View>
        ) : (
          <View style={styles.placeholderImage} />
        )}
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.name}>{post.name}</Text>
        <Text style={styles.description}>{post.description}</Text>
        <TouchableOpacity
          style={styles.messageButton}
          onPress={handleChatPress}
        >
          <Ionicons name="chatbubble-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <Image style={styles.modalImage} source={{ uri: post.imageUrl }} />
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    borderRadius: 12,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: "80%",
    resizeMode: "cover",
  },
  placeholderImage: {
    width: "100%",
    height: 200,
    backgroundColor: "#ccc",
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  messageButton: {
    backgroundColor: "#f57c00",
    borderRadius: 20,
    padding: 9,
    alignSelf: "flex-end",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
  },
});

export default PostCard;
