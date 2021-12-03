import { Box } from "native-base";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

import { FollowCardRenderer } from "@/root/src/components/shared/CardRenderer";
import { colors } from "@/root/src/constants";
import { UserData } from "@/root/src/data/userData";

import { TabNavigatorExploreContext } from "./context";

export const ProfileSearch: React.FC = () => {
  const searchValue = React.useContext(TabNavigatorExploreContext);

  return (
    <Box style={styles.container} bg={colors.white} pt="4">
      <FlatList
        data={UserData}
        renderItem={FollowCardRenderer}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
