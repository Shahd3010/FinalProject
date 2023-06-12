import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import PostCard from "./PostCard";

const ScreenPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const firestore = getFirestore();
    const postsCollection = collection(firestore, "posts");

    const unsubscribe = onSnapshot(postsCollection, (snapshot) => {
      const fetchedPosts = snapshot.docs.map((doc) => doc.data());
      setPosts(fetchedPosts);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 12,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ScreenPosts;
