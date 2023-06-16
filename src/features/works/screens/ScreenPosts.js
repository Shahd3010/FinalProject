import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Modal,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import PostCard from "./PostCard";
import Icon from "react-native-vector-icons/MaterialIcons";

const ScreenPosts = () => {
  const [posts, setPosts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [place, setPlace] = useState(null);

  useEffect(() => {
    const firestore = getFirestore();
    const postsCollection = collection(firestore, "posts");

    const unsubscribe = onSnapshot(postsCollection, (snapshot) => {
      const fetchedPosts = snapshot.docs.map((doc) => doc.data());
      setPosts(fetchedPosts);
    });

    return () => unsubscribe();
  }, []);

  const handleFilterPress = () => {
    setShowFilters(!showFilters);
  };
  const handlePlaceChange = (selectedPlace) => {
    console.log("Selected Place:", selectedPlace);

    setPlace(selectedPlace);
  };
  const handlePlaceFilter = (place) => {
    setSelectedPlace(place);
    applyFilters(selectedType);
  };

  const handleTypeFilter = (type) => {
    setSelectedType(type);
    applyFilters(type);
  };

  const applyFilters = (type) => {
    let filtered = posts;
    console.log(posts.type);
    setFilteredPosts((prev) => prev.filter((post) => post.type === type));
    console.log(type);
    console.log(posts.type);
  };

  const clearFilters = () => {
    setSelectedPlace("");
    setSelectedRating("");
    setSelectedType("");
    setFilteredPosts([]);
  };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          console.log(data, details);
          setSelectedPlace(data.description);
        }}
        query={{
          key: "AIzaSyAWiyyQ5aNjGu6RzqE9ni2K5f2G9Ac270Y",
          language: "iw",
        }}
        styles={{
          textInput: styles.searchTextInput,
          container: styles.searchContainer,
          listView: styles.listView,
        }}
      />
      <TouchableOpacity onPress={handleFilterPress}>
        <Icon name="filter-list" size={24} style={styles.filterIcon} />
      </TouchableOpacity>

      {showFilters && (
        <View style={styles.filtersContainer}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedRating === " 1" && styles.activeFilter,
            ]}
            onPress={() => handleTypeFilter("עיצוב פנים")}
          >
            <Text style={styles.filterButtonText}> עיצוב פנים</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedRating === "בנייב" && styles.activeFilter,
            ]}
            onPress={() => handleTypeFilter(" בנייה")}
          >
            <Text style={styles.filterButtonText}> בנייה</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedType === "חשמל" && styles.activeFilter,
            ]}
            onPress={() => handleTypeFilter("חשמל")}
          >
            <Text style={styles.filterButtonText}>חשמל</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedType === "גינון" && styles.activeFilter,
            ]}
            onPress={() => handleTypeFilter("גינון")}
          >
            <Text style={styles.filterButtonText}>גינון</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
            <Text style={styles.clearButtonText}>Clear Filters</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView>
        {filteredPosts.length > 0
          ? filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
          : posts.map((post) => <PostCard key={post.id} post={post} />)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    padding: 12,
    backgroundColor: "#fff",
  },
  filterIcon: {
    fontSize: 50, // Adjust the size of the icon
    color: "#999",
    marginRight: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  searchTextInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    height: 40,
    paddingHorizontal: 12,
  },
  listView: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 4,
    marginTop: 4,
  },
  filtersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#f57c00",
    borderRadius: 4,
  },
  activeFilter: {
    backgroundColor: "#ccc",
  },
  filterButtonText: {
    fontSize: 12,
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 4,
  },
  clearButtonText: {
    fontSize: 12,
    color: "#999",
  },
});

export default ScreenPosts;
