import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Box } from "native-base";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";

import { SearchBar } from "@/root/src/components/shared/SearchBar";
import { colors } from "@/root/src/constants";

import { CommunitySearch } from "./CommunitySearch";
import { PostSearch } from "./PostSearch";
import { ProfileSearch } from "./ProfileSearch";

interface Props_ {}

type TabParamList = {
  Post: undefined;
  Community: undefined;
  Profile: undefined;
};

const Tab = createMaterialTopTabNavigator<TabParamList>();

const windowWidth = Dimensions.get("window").width;

export const Explore: React.FC<Props_> = () => {
  return (
    <Box style={styles.container} safeAreaTop>
      <Box width="100%" alignItems="center" bg="white">
        <Box py="15px" width="90%">
          <SearchBar />
        </Box>
      </Box>
      <Tab.Navigator
        initialRouteName="Post"
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 15,
            fontFamily: "mr",
            textTransform: "none",
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
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
