import React, { useState } from "react";
import { FlatList, ImageBackground } from "react-native";
import { Searchbar } from "react-native-paper";
import styled from "styled-components/native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Ionicons } from "@expo/vector-icons";
import PostCard from "./PostCard";

const backImage = require("../../../../assets/BACKGROUND_WORKER.webp");

const SearchContainer = styled(ImageBackground)`
  padding: ${(props) => props.theme.space[1]};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  resize-mode: cover;
`;

const FilterDropdown = styled.View`
  position: relative;
  margin-right: ${(props) => props.theme.space[2]};
  background-color: rosybrown;
`;

const DropdownButton = styled.TouchableOpacity`
  background-color: #8b4513;
  border: 1px solid black;
  padding: ${(props) => props.theme.space[1]} ${(props) => props.theme.space[2]};
  border-radius: 4px;
  color: #8b4513;
`;

const DropdownText = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.body};
  color: #8b4513;
`;

const DropdownList = styled.View`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1;
  background-color: #8b4513;
  font-weight: bold;
  color: #8b4513;
  border: 1px solid black;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  min-width: 100%;
`;

const DropdownOption = styled.TouchableOpacity`
  padding: ${(props) => props.theme.space[1]} ${(props) => props.theme.space[2]};
  font-weight: bold;
  color: #8b4513;
`;

const DropdownOptionText = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.body};
  font-weight: bold;
  color: #8b4513;
`;

const WorkerList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 40,
    backgroundColor: "seashell",
  },
})``;

const FilterModal = styled.Modal.attrs({
  animationType: "slide",
  transparent: true,
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #8b4513;
`;

const FilterModalContainer = styled.View`
  padding: 20px;
  border-radius: 8px;
  background-color: #8b4513;
  width: 80%;
`;

const FilterText = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.heading};
  margin-bottom: ${(props) => props.theme.space[2]};
  background-color: #8b4513;
`;

const FilterOption = styled.TouchableOpacity`
  margin-bottom: ${(props) => props.theme.space[2]};
  background-color: #f57c00;
`;

const FilterOptionText = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.body};
  background-color: #8b4513;
`;

export const WorkScreen = () => {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleFilterPress = () => {
    setFilterModalVisible(true);
  };

  const handleFilterOptionPress = (filter) => {
    setSelectedFilter(filter);
    setFilterModalVisible(false);
  };

  return (
    <SafeArea>
      <SearchContainer source={require("../../../../assets/workerimage.png")}>
        <Searchbar />
        <FilterDropdown>
          <DropdownButton onPress={handleFilterPress}>
            <DropdownText>{selectedFilter || "Filter"}</DropdownText>
            <Ionicons name="ios-arrow-down" size={20} />
          </DropdownButton>
          {filterModalVisible && (
            <FilterModal>
              <FilterModalContainer>
                <FilterText>Filter by:</FilterText>
                <FilterOption onPress={() => handleFilterOptionPress("place")}>
                  <FilterOptionText>Place</FilterOptionText>
                </FilterOption>
                <FilterOption onPress={() => handleFilterOptionPress("Type")}>
                  <FilterOptionText>Type</FilterOptionText>
                </FilterOption>
                <FilterOption onPress={() => handleFilterOptionPress("Rating")}>
                  <FilterOptionText>Rating</FilterOptionText>
                </FilterOption>
              </FilterModalContainer>
            </FilterModal>
          )}
        </FilterDropdown>
      </SearchContainer>
      <WorkerList
        data={data}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeArea>
  );
};

const data = [
  {
    id: 1,
    photo:
      "https://www.kuhnflooring.com/wp-content/uploads/2016/10/porcelain-700x463.jpg",
    description: "This is the description of the post.",
    rating: 4.5,
    comments: "Some commhhents on the post.",
    place: "New York City",
  },
  {
    id: 2,
    photo:
      "https://www.kuhnflooring.com/wp-content/uploads/2016/10/porcelain-700x463.jpg",
    description: "Another post description.",
    rating: 3.9,
    comments: "More comments on the post.",
    place: "Los Angeles",
  },
];
