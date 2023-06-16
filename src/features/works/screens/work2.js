import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  Button,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { MaterialIcons } from "react-native-vector-icons";
import { addDoc, doc, deleteDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { ref } from "firebase/storage";
import { isSignInWithEmailLink } from "firebase/auth";
const Worker2 = ({ route }) => {
  const { user } = route.params;
  const email = user.email;
  const userId = user.uid;
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPostImage, setNewPostImage] = useState(null);
  const [newPostDescription, setNewPostDescription] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const firestore = getFirestore();
        const usersCollection = collection(firestore, "users");
        const q = query(usersCollection, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const document = querySnapshot.docs[0];
          const userData = document.data();
          setUserData(userData);
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    const fetchUserPosts = async () => {
      try {
        const firestore = getFirestore();
        const postsCollection = collection(firestore, "posts");
        const q = query(postsCollection, where("publisherId", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const fetchedPosts = querySnapshot.docs.map((doc) => doc.data());
          setPosts(fetchedPosts);
        }
      } catch (error) {
        console.log("Error fetching user posts:", error);
      }
    };

    fetchUserData();
    fetchUserPosts();
  }, [email, userId]);
  const handleAddPost = async () => {
    // Create the new post object
    const newPost = {
      id: posts.length + 1,
      publisherId: email, // Check if user exists and has an ID
      imageUrl: newPostImage,
      rating: 0, // Set initial rating to 0
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
      {userData && (
        <>
          <View style={styles.header}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: userData.photo }}
                style={styles.profileImage}
              />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{userData.name}</Text>
              <View style={styles.placeContainer}>
                <MaterialIcons name="location-on" size={24} color="#2F80ED" />
                <Text style={styles.place}>{userData.place}</Text>
              </View>
            </View>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.infoContainer}>
              <MaterialIcons
                name="phone"
                size={24}
                color="#2F80ED"
                style={styles.phoneIcon}
              />
              <Text style={styles.info}>{userData.phone}</Text>
              <MaterialIcons
                name="description"
                size={24}
                color="#2F80ED"
                style={styles.descriptionIcon}
              />
              <Text style={styles.info}>{userData.description}</Text>
            </View>
          </View>
        </>
      )}
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
    backgroundColor: "#FFF",
  },
  postRatingText: {
    marginLeft: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
  },
  postImage: {
    width: "99%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 10,
  },
  post: {
    marginBottom: 16,
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
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: "hidden",
    backgroundColor: "#F4F4F4",
  },
  profileImage: {
    flex: 1,
    aspectRatio: 1,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  placeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  place: {
    fontSize: 18,
    color: "#666",
    marginLeft: 4,
  },
  detailsContainer: {
    alignItems: "center",
    padding: 20,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  phoneIcon: {
    marginRight: 8,
  },
  descriptionIcon: {
    marginRight: 8,
  },
  info: {
    fontSize: 18,
    color: "#333",
    marginLeft: 8,
  },
});

export default Worker2;
