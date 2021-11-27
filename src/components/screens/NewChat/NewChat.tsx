import { DrawerNavigationProp } from "@react-navigation/drawer";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box } from "native-base";
import React from "react";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";

import {
  DrawerParamList_,
  StackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { UserCard } from "@/root/src/components/shared/Cards/UserCard";
import { SearchBar } from "@/root/src/components/shared/SearchBar";
import { UserData } from "@/root/src/data";

type NavigationProp_ = CompositeNavigationProp<
  StackNavigationProp<StackParamList_, "NewChat">,
  DrawerNavigationProp<DrawerParamList_>
>;

interface Props_ {
  Navigation: NavigationProp_;
}

interface UserCard_ {
  id: string;
  username: string;
  avatarUrl: string;
}

const UserCardRenderer: ListRenderItem<UserCard_> = ({ item }) => {
  return (
    <UserCard
      id={item.id}
      username={item.username}
      avatarUrl={item.avatarUrl}
    />
  );
};

export const NewChat: React.FC<Props_> = () => {
  return (
    <Box style={styles.container} bg="white" alignItems="center">
      <Box alignItems="center" width="90%" py="15px">
        <SearchBar />
        <Box my="4" width="100%">
          <FlatList
            data={UserData}
            renderItem={UserCardRenderer}
            keyExtractor={(item) => item.id}
          />
        </Box>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
