import { AntDesign, Ionicons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, Icon, Pressable } from "native-base";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import {
  DrawerParamList_,
  StackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { HeaderProfileIcon } from "@/root/src/components/shared/HeaderProfileIcon";
import { colors } from "@/root/src/constants";
import { UserContext } from "@/root/src/context";

import { About } from "./About";
import { Comments } from "./Comment";
import { TabNavigatorUserContext } from "./Context";
import { Posts } from "./Post";
import { ProfileCard } from "./ProfileCard";

type NavigationProp_ = CompositeNavigationProp<
  StackNavigationProp<StackParamList_, "Profile">,
  DrawerNavigationProp<DrawerParamList_>
>;

type RouteProp_ = RouteProp<StackParamList_, "Profile">;

interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}

const Tab = createMaterialTopTabNavigator();

const windowWidth = Dimensions.get("window").width;

export const Profile: React.FC<Props_> = ({ navigation, route }) => {
  const routeUserId = route.params.userId;
  const {
    user: { id },
  } = React.useContext(UserContext); // this context provided current login user

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        routeUserId && routeUserId !== id ? ( // checking our user id with incoming user id
          <Icon
            as={<Ionicons name="ellipsis-vertical" />}
            size={5}
            mr="2"
            color="black"
          />
        ) : (
          <Button
            size="md"
            _text={{ fontWeight: "600", color: "eGreen.400" }}
            variant="unstyled"
            onPress={() => navigation.navigate("EditProfile")}
          >
            Edit
          </Button>
        ),
      headerLeft: () =>
        routeUserId && routeUserId !== id ? (
          <Pressable
            onPress={() => navigation.goBack()}
            ml="3"
            alignItems="center"
            justifyContent="center"
          >
            <AntDesign name="arrowleft" size={24} color="#17D7A0" />
          </Pressable>
        ) : (
          <HeaderProfileIcon />
        ),
    });
  }, [id, navigation, routeUserId]);

  return (
    <View style={styles.container}>
      <ProfileCard routeUserId={routeUserId} />
      <TabNavigatorUserContext.Provider value={routeUserId}>
        <Tab.Navigator
          initialRouteName="profilePosts"
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
            name="profilePosts"
            component={Posts}
            options={() => ({
              title: "Posts",
            })}
          />
          <Tab.Screen
            name="profileComments"
            component={Comments}
            options={() => ({
              title: "Comments",
            })}
          />
          <Tab.Screen
            name="profileAbout"
            component={About}
            options={() => ({
              title: "About",
            })}
          />
        </Tab.Navigator>
      </TabNavigatorUserContext.Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: colors.white, flex: 1 },
});
