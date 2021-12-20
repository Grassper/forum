import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Auth } from "aws-amplify";
import { Button, Icon, Menu, Pressable } from "native-base";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import {
  RootStackParamList_,
  StackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { ReportUser } from "@/root/src/components/shared/Report";
import { colors } from "@/root/src/constants";
import { AuthContext, UserContext } from "@/root/src/context";

import { About } from "./About";
import { TabNavigatorUserContext } from "./Context";
import { Posts } from "./Post";
import { ProfileCard } from "./ProfileCard";

type NavigationProp_ = CompositeNavigationProp<
  StackNavigationProp<StackParamList_, "Profile">,
  StackNavigationProp<RootStackParamList_, "Application">
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
  const [reportModal, setReportModal] = React.useState(false);
  const {
    user: { id },
  } = React.useContext(UserContext); // this context provided current login user
  const { setAuthState } = React.useContext(AuthContext);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        routeUserId && routeUserId !== id ? ( // checking our user id with incoming user id
          <Button
            _text={{ fontWeight: "600", color: "eGreen.400" }}
            onPress={() => setReportModal(true)}
            size="md"
            variant="unstyled"
          >
            Report
          </Button>
        ) : (
          <Menu
            trigger={(triggerProps) => {
              return (
                <Pressable {...triggerProps}>
                  <Icon
                    as={<Ionicons name="ellipsis-vertical" />}
                    color="black"
                    mr="2"
                    size={5}
                  />
                </Pressable>
              );
            }}
            width="125px"
          >
            <Menu.Item onPress={() => navigation.navigate("EditProfile")}>
              Edit Profile
            </Menu.Item>
            <Menu.Item onPress={() => navigation.navigate("Info")}>
              Info
            </Menu.Item>
            <Menu.Item
              onPress={async () => {
                await Auth.signOut();
                setAuthState("LOGGEDOUT");
              }}
            >
              Sign out
            </Menu.Item>
          </Menu>
        ),
    });
  }, [id, navigation, routeUserId, setAuthState]);

  return (
    <View style={styles.container}>
      {routeUserId && (
        <ReportUser
          reportModal={reportModal}
          setReportModal={setReportModal}
          userId={routeUserId}
        />
      )}
      <ProfileCard routeUserId={routeUserId} />
      <TabNavigatorUserContext.Provider value={routeUserId}>
        <Tab.Navigator
          initialRouteName="profilePosts"
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
              width: windowWidth / 4,
              left: windowWidth / 8,
              height: 2,
            },
          }}
        >
          <Tab.Screen
            component={Posts}
            name="profilePosts"
            options={() => ({
              title: "Posts",
            })}
          />
          <Tab.Screen
            component={About}
            name="profileAbout"
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
