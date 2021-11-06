import { Box, HStack, Pressable, Text } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

interface Props_ {}

export const SubForumMod: React.FC<Props_> = () => {
  return (
    <Box bg="white" style={styles.container}>
      <HStack
        justifyContent="center"
        borderBottomWidth={0.25}
        borderBottomColor="border.400"
      >
        <Box width="90%">
          <Pressable onPress={() => {}}>
            <Text fontSize="sm" py="3" fontWeight="medium">
              Members
            </Text>
          </Pressable>
        </Box>
      </HStack>
      <HStack
        justifyContent="center"
        borderBottomWidth={0.25}
        borderBottomColor="border.400"
      >
        <Box width="90%">
          <Pressable onPress={() => {}}>
            <Text fontSize="sm" py="3" fontWeight="medium">
              Topics
            </Text>
          </Pressable>
        </Box>
      </HStack>
      <HStack
        justifyContent="center"
        borderBottomWidth={0.25}
        borderBottomColor="border.400"
      >
        <Box width="90%">
          <Pressable onPress={() => {}}>
            <Text fontSize="sm" py="3" fontWeight="medium">
              Screen Post / Comments
            </Text>
          </Pressable>
        </Box>
      </HStack>
      <HStack
        justifyContent="center"
        borderBottomWidth={0.25}
        borderBottomColor="border.400"
      >
        <Box width="90%">
          <Pressable onPress={() => {}}>
            <Text fontSize="sm" py="3" fontWeight="medium">
              Blocked Post / Comments
            </Text>
          </Pressable>
        </Box>
      </HStack>
      <HStack
        justifyContent="center"
        borderBottomWidth={0.25}
        borderBottomColor="border.400"
      >
        <Box width="90%">
          <Pressable onPress={() => {}}>
            <Text fontSize="sm" py="3" fontWeight="medium">
              Blocked Members
            </Text>
          </Pressable>
        </Box>
      </HStack>
      <HStack justifyContent="center">
        <Box width="90%">
          <Pressable onPress={() => {}}>
            <Text fontSize="sm" py="3" fontWeight="medium" color="danger.600">
              Delete Community
            </Text>
          </Pressable>
        </Box>
      </HStack>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
