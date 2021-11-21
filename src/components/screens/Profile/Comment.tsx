import { Box } from "native-base";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import { CommentTile } from "@/root/src/components/shared/Tile";

interface Props_ {}

export const Comments: React.FC<Props_> = () => {
  return (
    <Box style={styles.wrapper} alignItems="center" bg="white">
      <ScrollView style={styles.container}>
        <CommentTile />
        <CommentTile />
        <CommentTile />
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    paddingVertical: 15,
    width: "90%",
  },
  wrapper: {
    flex: 1,
  },
});
