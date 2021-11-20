import { Box, Flex, Text } from "native-base";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

import { CommentCard } from "@/root/src/components/shared/Cards/CommentCard";

import { commentListHeader } from ".";

interface Props_ {}

export const Comment: React.FC<Props_> = () => {
  const Data = [
    { key: 1, replyExists: true },
    { key: 2, replyExists: false },
    { key: 3, replyExists: true },
  ];
  return (
    <Box style={styles.container}>
      <FlatList
        data={Data}
        renderItem={() => <CommentCard />}
        ListHeaderComponent={commentListHeader}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
