import { StackNavigationProp } from "@react-navigation/stack";
import { Box, Flex, Text } from "native-base";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { RootStackParamList } from "@/root/src/components/navigations/StackNavigator";
import { Data as DummyData } from "@/root/src/components/screens/SubForum";
import { PostCard } from "@/root/src/components/shared/Cards/PostCard";

import { CommentCard } from "./CommentCard";

type NavigationProp_ = StackNavigationProp<RootStackParamList, "Post">;

interface Props_ {
  navigation: NavigationProp_;
}

export const Post: React.FC<Props_> = () => {
  return (
    <ScrollView style={styles.container}>
      <PostCard
        id={DummyData[1].id}
        subForum={DummyData[1].subForum}
        type={DummyData[1].type}
        username={DummyData[1].username}
        contentText={DummyData[1].contentText}
        avatarUrl={DummyData[1].avatarUrl}
        timeStamp={DummyData[1].timeStamp}
        mediaUrl={DummyData[1].mediaUrl}
        poll={DummyData[1].poll}
        postPage
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
      <CommentCard />
      <CommentCard />
      <CommentCard />
      <CommentCard />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
