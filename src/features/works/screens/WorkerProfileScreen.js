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
import firebase from "firebase/app";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "react-native-vector-icons";

import {
  getFirestore,
  collection,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { ref } from "firebase/storage";

const WorkerProfileScreen = ({ route }) => {
  //const { name, email, place, choices, phone, description, photo } = user;
  const userId = user.uid;
  const [posts, setPosts] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [newPostImage, setNewPostImage] = useState(null);
  const [newPostDescription, setNewPostDescription] = useState("");

  const handleAddPost = async () => {
    // Create the new post object
    const newPost = {
      id: posts.length + 1,
      publisherId: user && user.id, // Check if user exists and has an ID
      imageUrl: newPostImage,
      rating: 3,
      text: newPostDescription,
    };

    try {
      // Get the Firestore instance
      const firestore = getFirestore();
      // Get the "posts" collection reference
      const postsCollection = collection(firestore, "posts");
      // Add the new post to Firestore
      const docRef = await addDoc(postsCollection, newPost);

      // Update the new post object with the generated post ID
      newPost.id = docRef.id;

      // Update the posts state with the new post
      setPosts([...posts, newPost]);

      // Clear the form and close the modal
      setModalVisible(false);
      setNewPostImage(null);
      setNewPostDescription("");
    } catch (error) {
      console.log("Error adding post:", error);
    }
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
      // Instead of using "uri", access the selected asset from the "assets" array
      setNewPostImage(pickerResult.assets[0].uri);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const firestore = getFirestore();
      const postRef = doc(firestore, "posts", postId.toString());
      console.log("Deleting post:", postId);

      // Delete the post document from Firestore
      await deleteDoc(postRef);
      console.log("Post deleted from Firestore");
      // Update the posts state by removing the deleted post
      const updatedPosts = posts.filter((post) => post.id !== postId);
      setPosts(updatedPosts);
    } catch (error) {
      console.log("Error deleting post:", error);
    }
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
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>shahd</Text>
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
