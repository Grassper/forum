import { DrawerNavigationProp } from "@react-navigation/drawer";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box, Button, Text } from "native-base";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

import {
  DrawerParamList_,
  StackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { SearchBar } from "@/root/src/components/shared/SearchBar";
import { CommunityTile } from "@/root/src/components/shared/Tile";
import { dummyData } from "@/root/src/data/dummyData";

type NavigationProp_ = CompositeNavigationProp<
  StackNavigationProp<StackParamList_, "ChooseSubForum">,
  DrawerNavigationProp<DrawerParamList_>
>;

type RouteProp_ = RouteProp<StackParamList_, "ChooseSubForum">;

interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}

export const ChooseSubForum: React.FC<Props_> = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          size="md"
          _text={{ fontWeight: "600", color: "white" }}
          variant="unstyled"
          onPress={() => {}}
        >
          Next
        </Button>
      ),
    });
  }, [navigation]);

  return (
    <Box style={styles.container} bg="white">
      <Box width="100%" alignItems="center">
        <Box pt="15px" width="90%">
          <Text mb="4" fontSize="md">
            Post to
          </Text>
          <SearchBar />
        </Box>
      </Box>
      <FlatList
        data={dummyData}
        renderItem={() => (
          <CommunityTile
            hideDivider
            hideMembers
            hideFavorites
            onPress={() =>
              navigation.push("AddAndEditPost", { ...route.params })
            }
          />
        )}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
