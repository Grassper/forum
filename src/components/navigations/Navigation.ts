import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
/**
 * bottom tab navigator => stack navigator => tab navigator
 */

export type BottomTabParamList_ = {
  Home: undefined;
  Explore: undefined;
  ChatList: undefined;
};

export type StackParamList_ = {
  BottomTabNav: NavigatorScreenParams<BottomTabParamList_>;
  // * User
  Profile: { userId: string };
  EditProfile: undefined;
  Follow: { title: "Followers" | "Following" | "Blocked Accounts" };
  Bookmark: undefined;

  // * SubForum
  SubForum: { subForumId: string };
  SubForumMod: undefined;
  EditAndCreateSubForum: {
    title: "Edit Subforum" | "Create Subforum";
    action: "Add" | "Edit";
    subForumId?: string; // pass only for add action which means create subforum
  };

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
};

export type DrawerParamList_ = {
  StackNav: NavigatorScreenParams<StackParamList_>;
};

export type NavigationProp_ = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList_>,
  CompositeNavigationProp<
    StackNavigationProp<StackParamList_>,
    DrawerNavigationProp<DrawerParamList_>
  >
>;
