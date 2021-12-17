import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { BottomTabNavigator } from "@/root/src/components/navigations/BottomTabNavigator";
import {
  AuthStackParamList_,
  StackParamList_,
  SubForumStackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { AddAndEditComment } from "@/root/src/components/screens/AddAndEditComment";
import { AddAndEditPost } from "@/root/src/components/screens/AddAndEditPost";
import { AddAndEditReplies } from "@/root/src/components/screens/AddAndEditReplies";
import {
  AccountRecovery,
  ForgotPassword,
  SignIn,
  SignUp,
  Verification,
} from "@/root/src/components/screens/Authentication";
import { ChatRoom } from "@/root/src/components/screens/ChatRoom";
import { ChooseSubForum } from "@/root/src/components/screens/ChooseSubForum";
import { Comment } from "@/root/src/components/screens/Comment";
import { EditAndCreateSubForum } from "@/root/src/components/screens/EditAndCreateSubForum";
import { EditProfile } from "@/root/src/components/screens/EditProfile";
import { Follow } from "@/root/src/components/screens/Follow";
import { JoinedSubForum } from "@/root/src/components/screens/JoinedSubForum";
import { NewChat } from "@/root/src/components/screens/NewChat";
import { Post } from "@/root/src/components/screens/Post";
import { Profile } from "@/root/src/components/screens/Profile";
import { SubForum } from "@/root/src/components/screens/SubForum";
import { SubForumMod } from "@/root/src/components/screens/SubForumMod";
import { colors } from "@/root/src/constants";
import { UserContext } from "@/root/src/context";

const Stack = createStackNavigator<StackParamList_>();
const SubForumStack = createStackNavigator<SubForumStackParamList_>();
const AuthStack = createStackNavigator<AuthStackParamList_>();

const defaultStackOptions = {
  headerBackTitleVisible: false,
  headerTintColor: colors.green,
  headerTitleStyle: {
    fontFamily: "lr",
    fontSize: 16,
    color: colors.black,
  },
};

export const SubForumStackNavigator = () => {
  return (
    <SubForumStack.Navigator
      screenOptions={defaultStackOptions}
      initialRouteName="JoinedSubForum"
    >
      <SubForumStack.Screen
        name="JoinedSubForum"
        component={JoinedSubForum}
        options={() => ({
          title: "Sub Forums",
        })}
      />
      <SubForumStack.Screen
        name="SubForum"
        component={SubForum}
        options={({ route }) => ({
          title: `e/${route.params.title}`,
        })}
      />
      <SubForumStack.Screen
        name="SubForumMod"
        component={SubForumMod}
        options={() => ({
          title: "Manage",
        })}
      />
      <SubForumStack.Screen
        name="EditAndCreateSubForum"
        component={EditAndCreateSubForum}
        initialParams={{ title: "Create Subforum", action: "Add" }}
        options={({ route }) => ({
          title: route.params.title,
          headerTintColor: colors.green,
        })}
      />
    </SubForumStack.Navigator>
  );
};

export const StackNavigator = () => {
  const {
    user: { id },
  } = React.useContext(UserContext);
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
        name="Profile"
        component={Profile}
        initialParams={{ userId: id }} //passing current user id
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="Follow"
        component={Follow}
        options={({ route }) => ({
          title: route.params.title,
        })}
      />
      <Stack.Screen name="EditProfile" component={EditProfile} />
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
        options={({ route }) => ({
          title: route.params.title,
          headerTintColor: colors.green,
        })}
      />
      <Stack.Screen
        name="ChooseSubForum"
        component={ChooseSubForum}
        options={() => ({
          title: "Select Sub-Forum",
          headerTintColor: colors.green,
        })}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={() => ({
          headerTintColor: colors.white,
        })}
      />
      <Stack.Screen
        name="NewChat"
        component={NewChat}
        options={{
          title: "Search Your Friends",
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

export const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="SignIn"
        component={SignIn}
        options={() => ({
          title: "",
          headerShown: false,
        })}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={() => ({
          title: "",
          headerShown: false,
        })}
      />
      <AuthStack.Screen
        name="Verification"
        component={Verification}
        options={() => ({
          title: "",
          headerShown: false,
        })}
      />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={() => ({
          title: "",
          headerShown: false,
        })}
      />
      <AuthStack.Screen
        name="AccountRecovery"
        component={AccountRecovery}
        options={() => ({
          title: "",
          headerShown: false,
        })}
      />
    </AuthStack.Navigator>
  );
};
