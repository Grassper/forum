import { StackNavigationProp } from "@react-navigation/stack";
import { Box, Button } from "native-base";
import React from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";

import { RootStackParamList } from "@/root/src/components/navigations/StackNavigator";

import { PostCard, Props_ as PostCardProps_ } from "./PostCard";
import { SubForumCard } from "./SubForumCard";

type NavigationProp_ = StackNavigationProp<RootStackParamList, "SubForum">;

interface Props_ {
  navigation: NavigationProp_;
}

const Data: PostCardProps_[] = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    contentText:
      "Felicity grew up in a middle class neighbourhood. She was raised by her mother, her father having left when she was young.",
    type: "Text",
    timeStamp: "Nov 30",
    subForum: "MechKeys",
    username: "Aafreen Khan",
    avatarUrl:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    contentText:
      "Felicity grew up in a middle class neighbourhood. She was raised by her mother, her father having left when she was young.",
    type: "Image",
    timeStamp: "Nov 30",
    subForum: "MechKeys",
    username: "Sujitha Mathur",
    mediaUrl:
      "https://images.unsplash.com/photo-1636302304088-e1bd81885a71?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=764&q=80",
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    contentText:
      "Felicity grew up in a middle class neighbourhood. She was raised by her mother, her father having left when she was young.",
    type: "Video",
    timeStamp: "Nov 30",
    subForum: "MechKeys",
    username: "Anci Barroco",
    mediaUrl:
      "https://ia800501.us.archive.org/11/items/popeye_i_dont_scare/popeye_i_dont_scare_512kb.mp4",
    avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e39d72",
    contentText:
      "Felicity grew up in a middle class neighbourhood. She was raised by her mother, her father having left when she was young.",
    type: "Poll",
    timeStamp: "Nov 30",
    subForum: "MechKeys",
    username: "Anci Barroco",
    avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg",
    poll: {
      title: "What is role of day to day software engineering?",
      totalVotes: "2832",
      timeStamp: "Nov 30",
      votedPollId: "1",
      pollArr: [
        {
          id: "1",
          content: "Front end",
          votes: "879",
        },
        {
          id: "2",
          content: "Back end",
          votes: "542",
        },
        {
          id: "3",
          content: "Infrastructure",
          votes: "623",
        },
      ],
    },
  },
];

const PostCardRenderer: ListRenderItem<PostCardProps_> = ({ item }) => {
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
      <Box>
        <FlatList
          data={Data}
          renderItem={PostCardRenderer}
          ListHeaderComponent={() => <SubForumCard />}
          keyExtractor={(item) => item.id}
        />
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
