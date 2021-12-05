import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box } from "native-base";
import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";

import {
  BottomTabParamList_,
  DrawerParamList_,
  StackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { SearchBar } from "@/root/src/components/shared/SearchBar";
import { colors } from "@/root/src/constants";
import { useDebounce } from "@/root/src/hooks";

import { CommunitySearch } from "./CommunitySearch";
import { TabNavigatorExploreContext } from "./context";
import { PostSearch } from "./PostSearch";
import { ProfileSearch } from "./ProfileSearch";

type NavigationProp_ = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList_, "Explore">,
  CompositeNavigationProp<
    StackNavigationProp<StackParamList_>,
    DrawerNavigationProp<DrawerParamList_>
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
    <Box style={styles.container} bg={colors.white}>
      <Box style={styles.container} safeAreaTop>
        <Box width="100%" alignItems="center" bg={colors.white}>
          <Box py="15px" width="90%">
            <SearchBar value={searchValue} setValue={setSearchValue} />
          </Box>
        </Box>
        <TabNavigatorExploreContext.Provider value={debouncedSearchTerm}>
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
