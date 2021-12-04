import { NavigatorScreenParams } from "@react-navigation/native";
/**
 * bottom tab navigator => stack navigator => tab navigator
 */

export type BottomTabParamList_ = {
  Home: undefined;
  Explore: undefined;
  ChatList: undefined;
};

export type ProfileStackParamList_ = {
  // * User
  Profile: { userId: string };
  EditProfile: undefined;
  Follow: { title: "Followers" | "Following" | "Blocked Accounts" };
};

export type SubForumStackParamList_ = {
  // * SubForum
  SubForum: { subForumId: string };
  SubForumMod: undefined;
  JoinedSubForum: undefined;
  EditAndCreateSubForum: {
    title: "Edit Subforum" | "Create Subforum";
    action: "Add" | "Edit";
    subForumId?: string; // pass only for add action which means create subforum
    name?: string;
    description?: string;
    profileImageS3Key?: string;
    bannerImageS3Key?: string;
    _version?: number;
  };
};

export type StackParamList_ = {
  BottomTabNav: NavigatorScreenParams<BottomTabParamList_>;

  // * Post
  Post: {
    id?: string;
    type?: "Image" | "Text" | "Video" | "Audio" | "Poll";
    authorId?: string;
    username?: string;
    avatarUrl?: string;
    subForum?: string;
    subForumId?: string;
    timeStamp?: Date;
    contentText?: string;
    mediaS3Key?: null | string;
  };
  AddAndEditPost: {
    postType: "Image" | "Text" | "Video" | "Audio" | "Poll";
    action: "Add" | "Edit";
    hideUpload?: boolean;
    profileImageS3Key: string;
    name: string;
    communityId: string;
  };
  ChooseSubForum: {
    postType: "Image" | "Text" | "Video" | "Audio" | "Poll";
    action: "Add" | "Edit";
    hideUpload?: boolean;
  };

  // * Comment
  Comment: {
    username?: string;
    avatarUrl?: string;
    subForum?: string;
    subForumId?: string;
    postId?: string;
    contentText?: string;
    commentId?: string;
    timeStamp?: Date;
    repliesCount?: number;
  };
  AddAndEditComment: {
    id?: string;
    type?: "Image" | "Text" | "Video" | "Audio" | "Poll";
    username?: string;
    avatarUrl?: string;
    authorId?: string;
    subForum?: string;
    subForumId?: string;
    timeStamp?: Date;
    contentText?: string;
    mediaS3Key?: null | string;
    action: "Add" | "Edit";
  };
  AddAndEditReplies: {
    username?: string;
    avatarUrl?: string;
    subForum?: string;
    subForumId?: string;
    postId?: string;
    contentText?: string;
    commentId?: string;
    timeStamp?: Date;
    action: "Add" | "Edit";
  };

  // * Message
  NewChat: undefined;
  ChatRoom: { title: string; imageUri: string; roomId: string };
};

export type DrawerParamList_ = {
  StackNav: NavigatorScreenParams<StackParamList_>;
  ProfileStack: NavigatorScreenParams<ProfileStackParamList_>;
  Bookmark: undefined;
  SubForumStack: NavigatorScreenParams<SubForumStackParamList_>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends DrawerParamList_ {}
  }
}
