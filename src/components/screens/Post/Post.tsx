import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, View } from "react-native";

import { RootStackParamList } from "@/root/src/components/navigations/StackNavigator";
import { Data as DummyData } from "@/root/src/components/screens/SubForum";
import { PostCard } from "@/root/src/components/shared/Cards/PostCard";

type NavigationProp_ = StackNavigationProp<RootStackParamList, "Post">;

interface Props_ {
  navigation: NavigationProp_;
}

export const Post: React.FC<Props_> = () => {
  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
