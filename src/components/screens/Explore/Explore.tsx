import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Box } from "native-base";
import React from "react";
import { Dimensions, FlatList, StyleSheet } from "react-native";

import {
  Data as UserDummyData,
  FollowCardRenderer,
} from "@/root/src/components/screens/Follow/Follow";
import {
  Data as DummyData,
  PostCardRenderer,
} from "@/root/src/components/screens/SubForum";
import { SearchBar } from "@/root/src/components/shared/SearchBar";
import { colors } from "@/root/src/constants";

import { CommunitySearch } from "./CommunitySearch";

interface Props_ {}

const Tab = createMaterialTopTabNavigator();

const windowWidth = Dimensions.get("window").width;

export const Explore: React.FC<Props_> = () => {
  return (
    <>
      <Box width="100%" alignItems="center" bg="white">
        <Box py="15px" width="90%">
          <SearchBar />
        </Box>
      </Box>
      <Tab.Navigator
        initialRouteName="Posts"
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 15,
            fontFamily: "mr",
            textTransform: "capitalize",
          },
          tabBarStyle: { backgroundColor: colors.white, elevation: 0 },
          tabBarActiveTintColor: colors.black,
          tabBarInactiveTintColor: colors.gray,
          tabBarIndicatorStyle: {
            backgroundColor: colors.green,
            width: windowWidth / 6,
            left: windowWidth / 12,
            height: 2,
          },
        }}
      >
        <Tab.Screen name="Post" component={PostSearch} />
        <Tab.Screen name="Community" component={CommunitySearch} />
        <Tab.Screen name="Profile" component={ProfileSearch} />
      </Tab.Navigator>
    </>
  );
};

const PostSearch: React.FC = () => {
  return (
    <Box>
      <FlatList
        data={DummyData}
        renderItem={PostCardRenderer}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
};

const ProfileSearch: React.FC = () => {
  return (
    <Box style={styles.container} bg="white" pt="4">
      <FlatList
        data={UserDummyData}
        renderItem={FollowCardRenderer}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
