import { ScrollView } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

import { CommunityTile } from "@/root/src/components/shared/Tile";

import { TabNavigatorExploreContext } from "./context";

interface Props_ {}

export const CommunitySearch: React.FC<Props_> = () => {
  const searchValue = React.useContext(TabNavigatorExploreContext);

  return (
    <ScrollView style={styles.container}>
      <CommunityTile onPress={() => {}} hideDivider />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, position: "relative" },
});
