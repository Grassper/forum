import { StackNavigationProp } from "@react-navigation/stack";
import { Button } from "native-base";
import React from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";

import { RootStackParamList } from "@/root/src/components/navigations/StackNavigator";
import {
  PostCard,
  Props_ as PostCardProps_,
} from "@/root/src/components/shared/Cards/PostCard";
import { dummyData } from "@/root/src/data/dummyData";

import { SubForumCard } from "./SubForumCard";

type NavigationProp_ = StackNavigationProp<RootStackParamList, "SubForum">;

interface Props_ {
  navigation: NavigationProp_;
}

export const PostCardRenderer: ListRenderItem<PostCardProps_> = ({ item }) => {
  return (
    <PostCard
      id={item.id}
      subForum={item.subForum}
      type={item.type}
      username={item.username}
      contentText={item.contentText}
      avatarUrl={item.avatarUrl}
      timeStamp={item.timeStamp}
      mediaUrl={item.mediaUrl}
      poll={item.poll}
      audioUrl={item.audioUrl}
    />
  );
};

export const SubForum: React.FC<Props_> = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          size="md"
          _text={{ fontWeight: "600", color: "eGreen.400" }}
          variant="unstyled"
          onPress={() => {
            navigation.navigate("SubForumMod");
          }}
        >
          Manage
        </Button>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={dummyData}
        renderItem={PostCardRenderer}
        ListHeaderComponent={() => <SubForumCard />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
