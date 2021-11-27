import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { BottomTabNavigator } from "@/root/src/components/navigations/BottomTabNavigator";
import {
  ProfileStackParamList_,
  StackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { AddAndEditComment } from "@/root/src/components/screens/AddAndEditComment";
import { AddAndEditPost } from "@/root/src/components/screens/AddAndEditPost";
import { AddAndEditReplies } from "@/root/src/components/screens/AddAndEditReplies";
import { ChatRoom } from "@/root/src/components/screens/ChatRoom";
import { ChooseSubForum } from "@/root/src/components/screens/ChooseSubForum";
import { Comment } from "@/root/src/components/screens/Comment";
import { EditProfile } from "@/root/src/components/screens/EditProfile";
import { Follow } from "@/root/src/components/screens/Follow";
import { NewChat } from "@/root/src/components/screens/NewChat";
import { Post } from "@/root/src/components/screens/Post";
import { Profile } from "@/root/src/components/screens/Profile";
import { SubForum } from "@/root/src/components/screens/SubForum";
import { SubForumMod } from "@/root/src/components/screens/SubForumMod";
import { colors } from "@/root/src/constants";
import { UserContext } from "@/root/src/context";

const Stack = createStackNavigator<StackParamList_>();
const ProfileStack = createStackNavigator<ProfileStackParamList_>();

const defaultStackOptions = {
  headerBackTitleVisible: false,
  headerTintColor: colors.green,
  headerTitleStyle: {
    fontFamily: "mm",
  },
};

export const ProfileStackNavigator = () => {
  const {
    user: { id },
  } = React.useContext(UserContext);
  return (
    <ProfileStack.Navigator
      screenOptions={defaultStackOptions}
      initialRouteName="Profile"
    >
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        initialParams={{ userId: id }} //passing current user id
        options={{
          title: "",
        }}
      />
      <ProfileStack.Screen
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
      <ProfileStack.Screen
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
    </ProfileStack.Navigator>
  );
};

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={defaultStackOptions}
      initialRouteName="BottomTabNav"
    >
      <Stack.Screen
        name="BottomTabNav"
        component={BottomTabNavigator}
        options={{
          title: "",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="SubForum"
        component={SubForum}
        options={() => ({
          title: "",
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
        name="AddAndEditReplies"
        component={AddAndEditReplies}
        options={() => ({
          title: "",
          headerStyle: {
            backgroundColor: colors.green,
          },
          headerTintColor: colors.white,
        })}
      />
      <Stack.Screen
        name="AddAndEditPost"
        component={AddAndEditPost}
        options={() => ({
          title: "",
          headerStyle: {
            backgroundColor: colors.green,
          },
          headerTintColor: colors.white,
        })}
      />
      <Stack.Screen
        name="ChooseSubForum"
        component={ChooseSubForum}
        options={() => ({
          title: "",
          headerStyle: {
            backgroundColor: colors.green,
          },
          headerTintColor: colors.white,
        })}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={() => ({
          title: "",
          headerStyle: {
            backgroundColor: colors.green,
          },
          headerTintColor: colors.white,
        })}
      />
      <Stack.Screen
        name="NewChat"
        component={NewChat}
        options={{
          title: "New Chat",
          headerStyle: {
            backgroundColor: colors.green,
          },
          headerTintColor: colors.white,
        }}
      />
      <Stack.Screen
        name="Post"
        component={Post}
        options={() => ({
          title: "",
        })}
      />
    </Stack.Navigator>
  );
};
