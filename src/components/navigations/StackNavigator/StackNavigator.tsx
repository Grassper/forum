import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { SideDrawerNavigator } from "@/root/src/components/navigations/SideDrawerNavigator";
import { AddAndEditComment } from "@/root/src/components/screens/AddAndEditComment";
import { AndAndEditReplies } from "@/root/src/components/screens/AndAndEditReplies";
import { Comment } from "@/root/src/components/screens/Comment";
import { EditAndCreateSubForum } from "@/root/src/components/screens/EditAndCreateSubForum";
import { EditProfile } from "@/root/src/components/screens/EditProfile";
import { Follow } from "@/root/src/components/screens/Follow";
import { Post } from "@/root/src/components/screens/Post";
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
  EditAndCreateSubForum: { title: "Edit Subforum" | "Create Subforum" };
  SubForumMod: undefined;
  Post: undefined;
  AddAndEditComment: undefined;
  Comment: undefined;
  AndAndEditReplies: undefined;
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
        initialRouteName="SideDrawerNavigator"
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
          name="EditAndCreateSubForum"
          component={EditAndCreateSubForum}
          options={({ route }) => ({
            title: route.params.title,
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
        <Stack.Screen
          name="Post"
          component={Post}
          options={() => ({
            title: "",
          })}
        />
        <Stack.Screen
          name="AddAndEditComment"
          component={AddAndEditComment}
          options={() => ({
            title: "Add Comment",
            headerStyle: {
              backgroundColor: colors.green,
            },
            headerTintColor: colors.white,
          })}
        />
        <Stack.Screen
          name="Comment"
          component={Comment}
          options={() => ({
            title: "",
            headerStyle: {
              backgroundColor: colors.green,
            },
            headerTintColor: colors.white,
          })}
        />
        <Stack.Screen
          name="AndAndEditReplies"
          component={AndAndEditReplies}
          options={() => ({
            title: "",
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
