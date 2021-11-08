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
    type: "Text",
    timeStamp: "Nov 30",
    subForum: "MechKeys",
    username: "Sujitha Mathur",
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    contentText:
      "Felicity grew up in a middle class neighbourhood. She was raised by her mother, her father having left when she was young.",
    type: "Text",
    timeStamp: "Nov 30",
    subForum: "MechKeys",
    username: "Anci Barroco",
    avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg",
  },
  {
    id: "68694a0f-3da1-431f-bd56-142371e29d72",
    contentText:
      "Felicity grew up in a middle class neighbourhood. She was raised by her mother, her father having left when she was young.",
    type: "Image",
    timeStamp: "Nov 30",
    subForum: "MechKeys",
    username: "Aniket Kumar",
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU",
  },
  {
    id: "28694a0f-3da1-471f-bd96-142456e29d72",
    contentText:
      "Felicity grew up in a middle class neighbourhood. She was raised by her mother, her father having left when she was young.",
    type: "Text",
    timeStamp: "Nov 30",
    subForum: "MechKeys",
    username: "Kiara",
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
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
      <SubForumCard />
      <Box mt="2">
        <FlatList
          data={Data}
          renderItem={PostCardRenderer}
          keyExtractor={(item) => item.id}
        />
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
