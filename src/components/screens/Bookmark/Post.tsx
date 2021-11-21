import { Box } from "native-base";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

import { PostCardRenderer } from "@/root/src/components/shared/CardRenderer";
import { dummyData } from "@/root/src/data/dummyData";

interface Props_ {}

export const Posts: React.FC<Props_> = () => {
  return (
    <Box style={styles.container} bg="white" alignItems="center">
      <Box width="100%">
        <FlatList
          data={dummyData}
          renderItem={PostCardRenderer}
          keyExtractor={(item) => item.id}
        />
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
