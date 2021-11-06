import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { SideDrawerNavigator } from "@/root/src/components/navigations/SideDrawerNavigator";
import { EditProfile } from "@/root/src/components/screens/EditProfile";
import { EditSubForum } from "@/root/src/components/screens/EditSubForum";
import { Follow } from "@/root/src/components/screens/Follow";
import { Profile } from "@/root/src/components/screens/Profile";
import { Saved } from "@/root/src/components/screens/Saved";
import { SubForum } from "@/root/src/components/screens/SubForum";
import { SubForumMod } from "@/root/src/components/screens/SubForumMod";
import { colors } from "@/root/src/constants";

export type RootStackParamList = {
  Profile: { userId?: string };
  Follow: { title: "Followers" | "Following" | "Blocked Accounts" };
  SideDrawerNavigator: undefined;
  Saved: undefined;
  EditProfile: undefined;
  SubForum: undefined;
  EditSubForum: undefined;
  SubForumMod: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const defaultStackOptions = {
  headerBackTitleVisible: false,
  headerTintColor: colors.green,
  headerTitleStyle: {
    fontFamily: "mm",
  },
};

export const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SubForum"
        screenOptions={defaultStackOptions}
      >
        <Stack.Screen
          name="SideDrawerNavigator"
          component={SideDrawerNavigator}
          options={{
            title: "",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: "",
          }}
        />
        <Stack.Screen
          name="Follow"
          component={Follow}
          options={({ route }) => ({
            title: route.params.title,
            headerStyle: {
              backgroundColor: colors.green,
            },
            headerTintColor: colors.white,
          })}
        />
        <Stack.Screen
          name="Saved"
          component={Saved}
          options={() => ({
            title: "Saved",
            headerStyle: {
              backgroundColor: colors.green,
            },
            headerTintColor: colors.white,
          })}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={() => ({
            title: "Edit Profile",
            headerStyle: {
              backgroundColor: colors.green,
            },
            headerTintColor: colors.white,
          })}
        />
        <Stack.Screen
          name="SubForum"
          component={SubForum}
          options={() => ({
            title: "",
          })}
        />
        <Stack.Screen
          name="EditSubForum"
          component={EditSubForum}
          options={() => ({
            title: "Edit SubForum",
            headerStyle: {
              backgroundColor: colors.green,
            },
            headerTintColor: colors.white,
          })}
        />
        <Stack.Screen
          name="SubForumMod"
          component={SubForumMod}
          options={() => ({
            title: "Manage",
            headerStyle: {
              backgroundColor: colors.green,
            },
            headerTintColor: colors.white,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
