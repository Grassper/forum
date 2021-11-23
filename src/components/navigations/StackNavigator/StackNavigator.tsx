import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { BottomTabNavigator } from "@/root/src/components/navigations/BottomTabNavigator";
import { AddAndEditComment } from "@/root/src/components/screens/AddAndEditComment";
import { AddAndEditPost } from "@/root/src/components/screens/AddAndEditPost";
import { AddAndEditReplies } from "@/root/src/components/screens/AddAndEditReplies";
import { Bookmark } from "@/root/src/components/screens/Bookmark";
import { ChatRoom } from "@/root/src/components/screens/ChatRoom";
import { ChooseSubForum } from "@/root/src/components/screens/ChooseSubForum";
import { Comment } from "@/root/src/components/screens/Comment";
import { EditAndCreateSubForum } from "@/root/src/components/screens/EditAndCreateSubForum";
import { EditProfile } from "@/root/src/components/screens/EditProfile";
import { Follow } from "@/root/src/components/screens/Follow";
import { NewChat } from "@/root/src/components/screens/NewChat";
import { Post } from "@/root/src/components/screens/Post";
import { Profile } from "@/root/src/components/screens/Profile";
import { SubForum } from "@/root/src/components/screens/SubForum";
import { SubForumMod } from "@/root/src/components/screens/SubForumMod";
import { colors } from "@/root/src/constants";

export type RootStackParamList = {
  BottomTabNavigator: undefined;
  // * User
  Profile: { userId?: string };
  EditProfile: undefined;
  Follow: { title: "Followers" | "Following" | "Blocked Accounts" };
  Bookmark: undefined;

  // * SubForum
  SubForum: undefined;
  SubForumMod: undefined;
  EditAndCreateSubForum:
    | { title: "Edit Subforum" | "Create Subforum" }
    | undefined;

  // * Post
  Post: undefined;
  AddAndEditPost: {
    postType: "Image" | "Text" | "Video" | "Audio" | "Poll";
    action: "Add" | "Edit";
    hideUpload?: boolean;
  };
  ChooseSubForum: {
    postType: "Image" | "Text" | "Video" | "Audio" | "Poll";
    action: "Add" | "Edit";
    hideUpload?: boolean;
  };

  // * Comment
  Comment: undefined;
  AddAndEditComment: { action: "Add" | "Edit" };
  AddAndEditReplies: { action: "Add" | "Edit" };

  // * Message
  NewChat: undefined;
  ChatRoom: { title: string; imageUri: string };

  // *sideDrawer
  StackNavigator: undefined;
  // Profile: { userId: undefined } | undefined;
  Blocked_Accounts: { title: "Blocked Accounts" } | undefined;
  Bookmarks: undefined;
  // EditAndCreateSubForum: { title: "Create Subforum" } | undefined;
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
    <Stack.Navigator
      screenOptions={defaultStackOptions}
      initialRouteName="BottomTabNavigator"
    >
      <Stack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
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
        name="Bookmark"
        component={Bookmark}
        options={() => ({
          title: "Bookmark",
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
