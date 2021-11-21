import { Box } from "native-base";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

import { FollowCardRenderer } from "@/root/src/components/shared/CardRenderer";
import { UserData } from "@/root/src/data/userData";

export const ProfileSearch: React.FC = () => {
  return (
    <Box style={styles.container} bg="white" pt="4">
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
