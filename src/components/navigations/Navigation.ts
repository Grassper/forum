import { NavigatorScreenParams } from "@react-navigation/native";

interface UserPostMetric {
  items: UserPostMetricItem[];
}

interface UserPostMetricItem {
  type: "LIKE" | "LOVE" | "SUPPORT" | "DISLIKE";
}

/**
 * Bottom tab navigatior
 * Home => tab navigator => home, subforum stack
 * Explore
 * Message
 * Survey
 */

// linkedin like

/**
 * Bottom tab navigator => Stack navigator
 */

export type BottomTabParamList_ = {
  Home: undefined;
  Explore: undefined;
  Survey: undefined;
  JoinedSubForum: undefined;
};

export type AuthStackParamList_ = {
  SignIn: undefined;
  SignUp: undefined;
  Verification: { username: string; email: string };
  ForgotPassword: { username: string; email: string };
  AccountRecovery: undefined;
};

export type StackParamList_ = {
  BottomTabNav: NavigatorScreenParams<BottomTabParamList_>;

  // * User
  Profile: { userId: string };
  EditProfile: undefined;
  Follow: {
    title: "Followers" | "Following";
    routeUserId: string;
  };

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
    userPostMetric?: UserPostMetric;
  };
  AddAndEditPost: {
    postType: "Image" | "Text" | "Video" | "Audio" | "Poll";
    action: "Add" | "Edit";
    hideUpload?: boolean;
    profileImageS3Key: string;
    name: string;
    communityId: string;
    title: string;
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
    commentAuthorId?: string;
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
    commentAuthorId?: string;
    postId?: string;
    contentText?: string;
    commentId?: string;
    timeStamp?: Date;
    action: "Add" | "Edit";
  };

  // * Message
  NewChat: undefined;
  ChatList: undefined;
  ChatRoom: { title: string; imageUri: string; roomId: string };

  // * SubForum
  SubForum: { subForumId: string; title: string };
  SubForumMod: undefined;
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

  Info: undefined;
};

export type RootStackParamList_ = {
  Authentication: NavigatorScreenParams<AuthStackParamList_>;
  Application: NavigatorScreenParams<StackParamList_>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList_ {}
  }
}
