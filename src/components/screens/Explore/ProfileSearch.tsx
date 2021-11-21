import { Box } from "native-base";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

import {
  Data as UserDummyData,
  FollowCardRenderer,
} from "@/root/src/components/screens/Follow/Follow";

export const ProfileSearch: React.FC = () => {
  return (
    <Box style={styles.container} bg="white" pt="4">
      <FlatList
        data={UserDummyData}
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
