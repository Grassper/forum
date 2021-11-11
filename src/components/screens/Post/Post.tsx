import { StackNavigationProp } from "@react-navigation/stack";
import { Box, Flex, Text } from "native-base";
import React from "react";
import { FlatList, ScrollView, StyleSheet } from "react-native";

import { RootStackParamList } from "@/root/src/components/navigations/StackNavigator";
import { Data as DummyData } from "@/root/src/components/screens/SubForum";
import { PostCard } from "@/root/src/components/shared/Cards/PostCard";

import { CommentCard } from "./CommentCard";

type NavigationProp_ = StackNavigationProp<RootStackParamList, "Post">;

interface Props_ {
  navigation: NavigationProp_;
}
interface listProps {}

const listHeader: React.FC<listProps> = () => {
  return (
    <Box>
      <PostCard
        id={DummyData[2].id}
        subForum={DummyData[2].subForum}
        type={DummyData[2].type}
        username={DummyData[2].username}
        contentText={DummyData[2].contentText}
        avatarUrl={DummyData[2].avatarUrl}
        timeStamp={DummyData[2].timeStamp}
        mediaUrl={DummyData[2].mediaUrl}
        poll={DummyData[2].poll}
        postPage
        hidePostNavigation
      />

      <Box alignItems="center" bg="white" mt="2" pt="4">
        <Flex width="90%" flexDirection="row" alignItems="flex-end">
          <Text fontWeight="500" color="eGreen.400">
            Comments
          </Text>
          <Text fontWeight="500" color="eGreen.400" fontSize="xs" ml="1">
            253k
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export const Post: React.FC<Props_> = () => {
  const Data = [
    { key: 1, replyExists: true },
    { key: 2, replyExists: false },
    { key: 3, replyExists: true },
  ];
  return (
    <Box style={styles.container}>
      <FlatList
        data={Data}
        renderItem={(item) => (
          <CommentCard replyExists={item.item.replyExists} />
        )}
        ListHeaderComponent={listHeader}
        keyExtractor={(item) => item.key}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
