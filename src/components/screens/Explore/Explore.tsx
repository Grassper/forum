import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box, HStack } from "native-base";
import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";

import {
  RootStackParamList_,
  StackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { BackButton } from "@/root/src/components/shared/Button";
import { SearchBar } from "@/root/src/components/shared/SearchBar";
import { colors } from "@/root/src/constants";
import { useDebounce } from "@/root/src/hooks";

import { CommunitySearch } from "./CommunitySearch";
import { TabNavigatorExploreContext } from "./context";
import { PostSearch } from "./PostSearch";
import { ProfileSearch } from "./ProfileSearch";

type NavigationProp_ = CompositeNavigationProp<
  BottomTabNavigationProp<StackParamList_, "Explore">,
  CompositeNavigationProp<
    StackNavigationProp<StackParamList_, "BottomTabNav">,
    StackNavigationProp<RootStackParamList_, "Application">
  >
>;

interface Props_ {
  navigation: NavigationProp_;
}

type TabParamList = {
  explorePost: undefined;
  exploreCommunity: undefined;
  exploreProfile: undefined;
};

const Tab = createMaterialTopTabNavigator<TabParamList>();

const windowWidth = Dimensions.get("window").width;
/**
 * todo 1: search to global change
 * todo 2: implement context provider support
 * todo 3: graphql queries and types
 * todo 4: fetch api call handlers
 * todo 5: error handlers
 * todo 6:local state updated and flatlist
 * todo 7: pagination setup
 *
 *
 */
export const Explore: React.FC<Props_> = () => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchTerm = useDebounce(searchValue, 1000);
  return (
    <Box bg={colors.white} style={styles.container}>
      <Box style={styles.container}>
        <Box alignItems="center" bg={colors.white} width="100%">
          <HStack alignItems="center" py="15px" width="95%">
            <BackButton color="eGreen.400" />
            <SearchBar setValue={setSearchValue} value={searchValue} />
          </HStack>
        </Box>
        <TabNavigatorExploreContext.Provider value={debouncedSearchTerm}>
          <Tab.Navigator
            initialRouteName="explorePost"
            screenOptions={{
              tabBarLabelStyle: {
                fontSize: 15,
                fontFamily: "lr",
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
              component={PostSearch}
              name="explorePost"
              options={() => ({
                title: "Post",
              })}
            />
            <Tab.Screen
              component={CommunitySearch}
              name="exploreCommunity"
              options={() => ({
                title: "Community",
              })}
            />
            <Tab.Screen
              component={ProfileSearch}
              name="exploreProfile"
              options={() => ({
                title: "Profiles",
              })}
            />
          </Tab.Navigator>
        </TabNavigatorExploreContext.Provider>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
