import { Box, Flex, Text } from "native-base";
import React from "react";
import { StyleSheet, View } from "react-native";

import { CommentCard } from "@/root/src/components/screens/Post/CommentCard";

interface Props_ {}

export const Comment: React.FC<Props_> = () => {
  return (
    <View style={styles.container}>
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
      <CommentCard />
      <CommentCard />
      <CommentCard />
      <CommentCard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
