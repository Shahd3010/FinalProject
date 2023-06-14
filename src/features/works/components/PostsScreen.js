import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { firebase } from "../firebaseConfig";

const PostsScreen = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from Firebase Firestore
    const fetchPosts = async () => {
      try {
        const postsSnapshot = await firebase
          .firestore()
          .collection("posts")
          .get();
        const fetchedPosts = postsSnapshot.docs.map((doc) => doc.data());
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <View>
      <Text>Posts:</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.postId}
        renderItem={({ item }) => (
          <View>
            <Text>Title: {item.title}</Text>
            <Text>Description: {item.description}</Text>
            {/* Render other post details */}
          </View>
        )}
      />
    </View>
  );
};

export default PostsScreen;
