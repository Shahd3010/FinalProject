import React from "react";
//import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { FlatList } from "react-native";
import { Searchbar } from "react-native-paper";
import { WorkinfoCard } from "../components/work-info-card.components";
import styled from "styled-components/native";
import { SafeArea } from "../../../components/utility/safe-area.component";

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;
const WorkerList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;
export const WorkScreen = () => (
  <SafeArea>
    <SearchContainer>
      <Searchbar />
    </SearchContainer>
    <WorkerList
      data={[{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }]}
      renderItem={() => <WorkinfoCard />}
    />
  </SafeArea>
);
