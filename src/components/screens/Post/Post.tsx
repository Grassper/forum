import { DrawerNavigationProp } from "@react-navigation/drawer";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box, Flex, Text } from "native-base";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

import {
  DrawerParamList_,
  StackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { CommentCard } from "@/root/src/components/shared/Cards/CommentCard";
import { PostCard } from "@/root/src/components/shared/Cards/PostCard";
import { dummyData } from "@/root/src/data/dummyData";

type NavigationProp_ = CompositeNavigationProp<
  StackNavigationProp<StackParamList_, "Post">,
  DrawerNavigationProp<DrawerParamList_>
>;

interface Props_ {
  navigation: NavigationProp_;
}

const listHeader: React.FC = () => {
  return (
    <Box>
      <PostCard
        id={dummyData[2].id}
        subForum={dummyData[2].subForum}
        type={dummyData[2].type}
        username={dummyData[2].username}
        contentText={dummyData[2].contentText}
        avatarUrl={dummyData[2].avatarUrl}
        timeStamp={dummyData[2].timeStamp}
        mediaUrl={dummyData[2].mediaUrl}
        poll={dummyData[2].poll}
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
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
