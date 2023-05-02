import React, { useState } from "react";
import { FlatList, ImageBackground } from "react-native";
import { Searchbar } from "react-native-paper";
import { WorkinfoCard } from "../components/work-info-card.components";
import styled from "styled-components/native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Ionicons } from "@expo/vector-icons";

const SearchContainer = styled(ImageBackground)`
  padding: ${(props) => props.theme.space[1]};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  resizemode: cover;
`;

const FilterDropdown = styled.View`
  position: relative;
  margin-right: ${(props) => props.theme.space[2]};
  background-color: "rosybrown";
`;

const DropdownButton = styled.TouchableOpacity`
  background-color: "#8b4513";
  border: 1px solid black;
  padding: ${(props) => props.theme.space[1]} ${(props) => props.theme.space[2]};
  border-radius: 4px;
  color: "#8b4513";
`;

const DropdownText = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.body};
  color: "#8b4513";
`;

const DropdownList = styled.View`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1;
  background-color: "#8b4513";
  fontWeight: "bold",
  color: "#8b4513",
  border: 1px solid black;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  min-width: 100%;
 
`;

const DropdownOption = styled.TouchableOpacity`
  padding: ${(props) => props.theme.space[1]} ${(props) =>
  props.theme.space[2]};
  fontWeight: "bold",
  color: "#8b4513",
`;

const DropdownOptionText = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.body};
  fontWeight: "bold",
  color: "#8b4513",
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
  background-color: "#8b4513";
`;

const FilterModalContainer = styled.View`
  padding: 20px;
  border-radius: 8px;
  background-color: "#8b4513";
  width: 80%;
`;

const FilterText = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.heading};
  margin-bottom: ${(props) => props.theme.space[2]};
  background-color: "#8b4513";
`;

const FilterOption = styled.TouchableOpacity`
  margin-bottom: ${(props) => props.theme.space[2]};
  backgroundcolor: "#f57c00";
`;

const FilterOptionText = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.body};
  background-color: "#8b4513";
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
        renderItem={({ item }) => <WorkinfoCard workinfo={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeArea>
  );
};

const data = [
  {
    id: 1,
    title: "Worker 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    rating: 4.5,
    reviews: 12,
    price: "$30 per hour",
    image: require("../../../../assets/BACKGROUND_WORKER.webp"),
  },
  {
    id: 2,
    title: "Worker 2",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    rating: 3.9,
    reviews: 8,
    price: "$25 per hour",
    image: require("../../../../assets/BACKGROUND_WORKER.webp"),
  },
  {
    id: 3,
    title: "Worker 3",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    rating: 4.8,
    reviews: 20,
    price: "$35 per hour",
    image: require("../../../../assets/BACKGROUND_WORKER.webp"),
  },
];
