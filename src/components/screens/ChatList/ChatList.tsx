import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

import {
  BottomTabParamList_,
  DrawerParamList_,
  StackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { FloatingActionButton } from "@/root/src/components/shared/FabButton";

/***
 * todo 1: fetch chatrooms joined by users and fetch latest messages in the room
 * todo 2: populate the content in the flatlist
 *
 */

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
      <FloatingActionButton onPress={onpress} screen="ChatList" />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, position: "relative" },
});
