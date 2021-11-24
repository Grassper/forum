import { AntDesign, Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { DrawerActions, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box, Button, Icon, Pressable } from "native-base";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { SvgUri } from "react-native-svg";

import { RootStackParamList } from "@/root/src/components/navigations/StackNavigator";
import { colors } from "@/root/src/constants";

import { About } from "./About";
import { Comments } from "./Comment";
import { Posts } from "./Post";
import { ProfileCard } from "./ProfileCard";

type RouteProp_ = RouteProp<RootStackParamList, "Profile">;
type NavigationProp_ = StackNavigationProp<RootStackParamList, "Profile">;

interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}

type TabParamList = {
  profilePosts: undefined;
  profileComments: undefined;
  profileAbout: undefined;
};

const Tab = createMaterialTopTabNavigator<TabParamList>();

const windowWidth = Dimensions.get("window").width;

export const Profile: React.FC<Props_> = ({ navigation, route }) => {
  const userId = route.params?.userId;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        userId && userId !== "1" ? ( // checking our user id with incoming user id
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
        userId === undefined ? (
          <Pressable
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            ml="3"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              width="8"
              height="8"
              bg="amber.100"
              borderRadius="full"
              overflow="hidden"
            >
              <SvgUri
                uri="https://avatars.dicebear.com/api/micah/asdf.svg"
                width="100%"
                height="100%"
              />
            </Box>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => navigation.goBack()}
            ml="3"
            alignItems="center"
            justifyContent="center"
          >
            <AntDesign name="arrowleft" size={24} color="#17D7A0" />
          </Pressable>
        ),
    });
  }, [navigation, userId]);

  return (
    <View style={styles.container}>
      <ProfileCard userId={userId} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: colors.white, flex: 1 },
});
