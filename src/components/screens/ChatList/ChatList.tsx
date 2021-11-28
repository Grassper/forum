import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box } from "native-base";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

import {
  BottomTabParamList_,
  DrawerParamList_,
  StackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { FloatingActionButton } from "@/root/src/components/shared/FabButton";
import { dummyData } from "@/root/src/data/dummyData";

import { ChatCard } from "./ChatCard";

type NavigationProp_ = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList_, "ChatList">,
  CompositeNavigationProp<
    StackNavigationProp<StackParamList_>,
    DrawerNavigationProp<DrawerParamList_>
  >
>;

interface Props_ {
  navigation: NavigationProp_;
}

export const ChatList: React.FC<Props_> = ({ navigation }) => {
  const onpress = () => {
    navigation.push("NewChat");
  };
  return (
    <Box style={styles.container}>
      <FlatList data={dummyData} renderItem={() => <ChatCard />} />

      <FloatingActionButton onPress={onpress} screen="ChatList" />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, position: "relative" },
});
