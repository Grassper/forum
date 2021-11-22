import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Box } from "native-base";
import React from "react";
import { Dimensions, StatusBar, StyleSheet } from "react-native";

import { SearchBar } from "@/root/src/components/shared/SearchBar";
import { colors } from "@/root/src/constants";

import { CommunitySearch } from "./CommunitySearch";
import { PostSearch } from "./PostSearch";
import { ProfileSearch } from "./ProfileSearch";

interface Props_ {}

type TabParamList = {
  explorePost: undefined;
  exploreCommunity: undefined;
  exploreProfile: undefined;
};

const Tab = createMaterialTopTabNavigator<TabParamList>();

const windowWidth = Dimensions.get("window").width;

export const Explore: React.FC<Props_> = () => {
  return (
    <Box style={styles.container} safeAreaTop>
      <StatusBar backgroundColor={colors.black} />
      <Box width="100%" alignItems="center" bg={colors.white}>
        <Box py="15px" width="90%">
          <SearchBar />
        </Box>
      </Box>
      <Tab.Navigator
        initialRouteName="explorePost"
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
        <Tab.Screen
          name="explorePost"
          component={PostSearch}
          options={() => ({
            title: "Post",
          })}
        />
        <Tab.Screen
          name="exploreCommunity"
          component={CommunitySearch}
          options={() => ({
            title: "Community",
          })}
        />
        <Tab.Screen
          name="exploreProfile"
          component={ProfileSearch}
          options={() => ({
            title: "Profiles",
          })}
        />
      </Tab.Navigator>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
