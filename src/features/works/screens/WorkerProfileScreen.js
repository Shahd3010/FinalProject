import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "react-native-vector-icons";
const initialPosts = [
  {
    id: 1,
    imageUrl:
      "https://www.kuhnflooring.com/wp-content/uploads/2016/10/porcelain-700x463.jpg",
    rating: 4,
    text: "This my job!",
  },
  {
    id: 2,
    imageUrl:
      "https://www.usatileandmarble.net/wp-content/uploads/2021/01/Marble_or_Tile__Which_Works_Best_for_Bathrooms_.Featured_1.png",
    rating: 5,
    text: "Another awesome work!",
  },
];
const profilePhoto = require("../../../../assets/profile.png");

const WorkerProfileScreen = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPostImage, setNewPostImage] = useState(null);
  const [newPostDescription, setNewPostDescription] = useState("");

  const handleAddPost = () => {
    const newPost = {
      id: posts.length + 1,
      imageUrl: newPostImage,
      rating: 3,
      text: newPostDescription,
    };
    setPosts([...posts, newPost]);
    setModalVisible(false);
    setNewPostImage(null);
    setNewPostDescription("");
  };

  const handleChoosePhoto = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      setNewPostImage(pickerResult.uri);
    }
  };
  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={[styles.imageContainer]}>
          <Image
            style={[
              styles.image,
              { alignSelf: "flex-start", flexDirection: "row", padding: 2 },
            ]}
            source={profilePhoto}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>Shahd</Text>
          <Text style={styles.profession}>Alnaami</Text>
          <MaterialIcons name="place" size={64} color="#2F80ED" />
          <Text style={styles.location}>Hura-Beersheva</Text>
          <Text style={styles.description}>
            I am a tiling specialist with 5 years of experience
          </Text>
        </View>
      </View>
      <ScrollView style={styles.postsContainer}>
        {posts.map((post) => (
          <View style={styles.post} key={post.id}>
            <Image style={styles.postImage} source={{ uri: post.imageUrl }} />
            <View style={styles.postContent}>
              <View style={styles.postRating}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.postRatingText}>{post.rating}</Text>
              </View>
              <Text style={styles.postText}>{post.text}</Text>
              <TouchableOpacity onPress={() => handleDeletePost(post.id)}>
                <Ionicons name="trash" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add-circle" size={64} color="#f57c00" />
        <Text style={styles.addButtonText}>Add Post</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide">
        <ScrollView>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close-circle" size={32} color="#f57c00" />
            </TouchableOpacity>
            {newPostImage ? (
              <Image
                style={styles.newPostImage}
                source={{ uri: newPostImage }}
              />
            ) : (
              <TouchableOpacity
                style={styles.newPostImageButton}
                onPress={handleChoosePhoto}
              >
                <Ionicons name="add-circle" size={64} color="#f57c00" />
                <Text style={styles.newPostImageButtonText}>Add Image</Text>
              </TouchableOpacity>
            )}
            <View style={styles.newPostInputContainer}>
              <TextInput
                style={styles.newPostInput}
                placeholder="Enter your post description here..."
                value={newPostDescription}
                onChangeText={setNewPostDescription}
                multiline
              />
              <Button title="Post" onPress={handleAddPost} color="#f57c00" />
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: "hidden",
    marginRight: 16,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  profession: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  postsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  post: {
    marginBottom: 16,
  },
  postImage: {
    width: "99%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 10,
  },
  postContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  postRating: {
    flexDirection: "row",
    alignItems: "center",
  },
  postRatingText: {
    marginLeft: 4,
  },
  postText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    lineHeight: 24,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f57c00",
    marginLeft: 8,
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  newPostImage: {
    width: "100%",
    height: 200,
    marginBottom: 16,
  },
  newPostImageButton: {
    width: "100%",
    height: 200,
    backgroundColor: "#F2F2F2",
    borderRadius: 8,
    overflow: "hidden",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  newPostImageButtonText: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: "bold",
    color: "#f57c00",
  },
  newPostInputContainer: {
    flexDirection: "row",
  },
  newPostInput: {
    flex: 1,
    marginRight: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#AEB5BC",
    padding: 8,
    fontSize: 16,
    fontWeight: "400",
    color: "#f57c00",
  },
});

export default WorkerProfileScreen;