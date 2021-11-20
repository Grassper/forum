import { Box, Flex, Text } from "native-base";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

import { CommentCard } from "@/root/src/components/shared/Cards/CommentCard";

interface Props_ {}

const commentListHeader: React.FC = () => {
  return (
    <Box>
      <CommentCard />
      <Box alignItems="center" bg="white" mt="2" pt="4">
        <Flex width="90%" flexDirection="row" alignItems="flex-end">
          <Text fontWeight="500" color="eGreen.400">
            Replies
          </Text>
          <Text fontWeight="500" color="eGreen.400" fontSize="xs" ml="1">
            24
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

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
