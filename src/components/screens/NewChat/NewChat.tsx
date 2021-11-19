import { StackNavigationProp } from "@react-navigation/stack";
import { Box } from "native-base";
import React from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";

import { RootStackParamList } from "@/root/src/components/navigations/StackNavigator";
import { UserCard } from "@/root/src/components/shared/Cards/UserCard";
import { SearchBar } from "@/root/src/components/shared/SearchBar";
import { colors } from "@/root/src/constants";

type NavigationProp_ = StackNavigationProp<RootStackParamList, "NewChat">;

interface Props_ {
  Navigation: NavigationProp_;
}

interface UserCard_ {
  id: string;
  username: string;
  avatarUrl: string;
}

const Data = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    username: "Aafreen Khan",
    avatarUrl:
      "https://avatars.dicebear.com/api/micah/ramkia.svg?mouth=smile&baseColor=apricot",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    username: "Sujitha Mathur",
    avatarUrl:
      "https://avatars.dicebear.com/api/micah/aramkia.svg?mouth=smile&baseColor=apricot",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    username: "Anci Barroco",
    avatarUrl:
      "https://avatars.dicebear.com/api/micah/radamkia.svg?mouth=smile&baseColor=apricot",
  },
  {
    id: "68694a0f-3da1-431f-bd56-142371e29d72",
    username: "Aniket Kumar",
    avatarUrl:
      "https://avatars.dicebear.com/api/micah/shia.svg?mouth=smile&baseColor=apricot",
  },
  {
    id: "28694a0f-3da1-471f-bd96-142456e29d72",
    username: "Kiara",
    avatarUrl:
      "https://avatars.dicebear.com/api/micah/malkiya.svg?mouth=smile&baseColor=apricot",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28wba",
    username: "Aafreen Khan",
    avatarUrl:
      "https://avatars.dicebear.com/api/micah/mayuka.svg?mouth=smile&baseColor=apricot",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91awa97f63",
    username: "Sujitha Mathur",
    avatarUrl:
      "https://avatars.dicebear.com/api/micah/athura.svg?mouth=smile&baseColor=apricot",
  },
];

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
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <SearchBar />
        <Box my="4">
          <FlatList
            data={Data}
            renderItem={UserCardRenderer}
            keyExtractor={(item) => item.id}
          />
        </Box>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    paddingVertical: 15,
    width: "90%",
  },
  wrapper: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
    width: "100%",
  },
});
