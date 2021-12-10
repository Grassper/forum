import { Ionicons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, Icon, Menu, Pressable } from "native-base";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import {
  DrawerParamList_,
  ProfileStackParamList_,
  RootStackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { ReportUser } from "@/root/src/components/shared/Report";
import { colors } from "@/root/src/constants";
import { UserContext } from "@/root/src/context";

import { About } from "./About";
import { TabNavigatorUserContext } from "./Context";
import { Posts } from "./Post";
import { ProfileCard } from "./ProfileCard";

type NavigationProp_ = CompositeNavigationProp<
  StackNavigationProp<ProfileStackParamList_, "Profile">,
  CompositeNavigationProp<
    DrawerNavigationProp<DrawerParamList_, "ProfileStack">,
    StackNavigationProp<RootStackParamList_, "Application">
  >
>;

type RouteProp_ = RouteProp<ProfileStackParamList_, "Profile">;

interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}

const Tab = createMaterialTopTabNavigator();

const windowWidth = Dimensions.get("window").width;

export const Profile: React.FC<Props_> = ({ navigation, route }) => {
  const routeUserId = route.params.userId;
  const [reportModal, setReportModal] = React.useState(false);
  const {
    user: { id },
  } = React.useContext(UserContext); // this context provided current login user

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        routeUserId && routeUserId !== id ? ( // checking our user id with incoming user id
          <Menu
            trigger={(triggerProps) => {
              return (
                <Pressable {...triggerProps}>
                  <Icon
                    as={<Ionicons name="ellipsis-vertical" />}
                    size={5}
                    mr="2"
                    color="black"
                  />
                </Pressable>
              );
            }}
          >
            <Menu.Item onPress={() => setReportModal(true)}>Reports</Menu.Item>
          </Menu>
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
    });
  }, [id, navigation, routeUserId]);

  return (
    <View style={styles.container}>
      {routeUserId && (
        <ReportUser
          userId={routeUserId}
          reportModal={reportModal}
          setReportModal={setReportModal}
        />
      )}
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
              width: windowWidth / 4,
              left: windowWidth / 8,
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
