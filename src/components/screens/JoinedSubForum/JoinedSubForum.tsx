import { AntDesign } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import {
  CompositeNavigationProp,
  DrawerActions,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box, Icon, ScrollView } from "native-base";
import React from "react";

import {
  DrawerParamList_,
  SubForumStackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { SearchBar } from "@/root/src/components/shared/SearchBar";
import { CommunityTile } from "@/root/src/components/shared/Tile";

type NavigationProp_ = CompositeNavigationProp<
  StackNavigationProp<SubForumStackParamList_, "SubForum">,
  DrawerNavigationProp<DrawerParamList_>
>;

interface Props_ {
  navigation: NavigationProp_;
}

export const JoinedSubForum: React.FC<Props_> = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Icon
          as={<AntDesign name="menuunfold" />}
          size={5}
          ml="4"
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          color="white"
        />
      ),
      headerRight: () => (
        <Icon
          as={<AntDesign name="pluscircleo" />}
          size={"20px"}
          mr="4"
          onPress={() =>
            navigation.push("EditAndCreateSubForum", {
              title: "Create Subforum",
              action: "Add",
            })
          }
          color="white"
        />
      ),
    });
  }, [navigation]);
  return (
    <Box bg="white" flex="1" alignItems="center">
      <Box width="90%" pt="20px">
        <SearchBar />
      </Box>
      <Box width="100%">
        <ScrollView>
          <CommunityTile onPress={() => {}} hideDivider />
          <CommunityTile onPress={() => {}} hideDivider />
          <CommunityTile onPress={() => {}} hideDivider />
          <CommunityTile onPress={() => {}} hideDivider />
          <CommunityTile onPress={() => {}} hideDivider />
          <CommunityTile onPress={() => {}} hideDivider />
          <CommunityTile onPress={() => {}} hideDivider />
          <CommunityTile onPress={() => {}} hideDivider />
          <CommunityTile onPress={() => {}} hideDivider />
          <CommunityTile onPress={() => {}} hideDivider />
          <CommunityTile onPress={() => {}} hideDivider />
          <CommunityTile onPress={() => {}} hideDivider />
          <CommunityTile onPress={() => {}} hideDivider />
          <CommunityTile onPress={() => {}} hideDivider />
          <CommunityTile onPress={() => {}} hideDivider />
          <CommunityTile onPress={() => {}} hideDivider />
          <CommunityTile onPress={() => {}} hideDivider />
          <CommunityTile onPress={() => {}} hideDivider />
          <CommunityTile onPress={() => {}} hideDivider />
        </ScrollView>
      </Box>
    </Box>
  );
};
