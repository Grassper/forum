import { MaterialIcons } from "@expo/vector-icons";
import { Box, HStack, Icon, Pressable, Text, VStack } from "native-base";
import React from "react";
import { ListRenderItem, ScrollView, StyleSheet, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

import { PostTile } from "@/root/src/components/shared/Cards";
import { colors } from "@/root/src/constants";

interface Props_ {}
const RenderHiddenItem: ListRenderItem<Props_> = () => {
  return (
    <HStack flex="1" pl="2">
      <Pressable
        w="70"
        // cursor="pointer"
        ml="auto"
        bg="red.400"
        borderRadius="2"
        justifyContent="center"
        onPress={() => console.log("function for delete")}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <VStack alignItems="center" space={2}>
          <Icon as={<MaterialIcons name="delete" />} color="white" size="xs" />
          <Text color="white" fontSize="xs" fontWeight="medium">
            Delete
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );
};

export const Posts: React.FC<Props_> = () => {
  const Data = ["fds", "dsfd", "dsfsdf"];

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>
        <Box safeArea flex="1">
          <SwipeListView
            data={Data}
            renderItem={() => <PostTile />}
            renderHiddenItem={RenderHiddenItem}
            rightOpenValue={-70}
            previewRowKey={"0"}
            previewOpenValue={-40}
            previewOpenDelay={3000}
          />
        </Box>
        {/* <PostTile />
        <PostTile />
        <PostTile />
        <PostTile />
        <PostTile />
        <PostTile /> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    flexWrap: "wrap",
    marginBottom: 20,
    paddingVertical: 15,
    width: "100%",
  },
  wrapper: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
    width: "100%",
  },
});
