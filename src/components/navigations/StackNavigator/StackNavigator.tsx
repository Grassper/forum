import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { BottomTabNavigator } from "@/root/src/components/navigations/BottomTabNavigator";
import {
  AuthStackParamList_,
  StackParamList_,
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
import { ChatList } from "@/root/src/components/screens/ChatList";
import { ChatRoom } from "@/root/src/components/screens/ChatRoom";
import { ChooseSubForum } from "@/root/src/components/screens/ChooseSubForum";
import { CoinTipping } from "@/root/src/components/screens/CoinTipping";
import { Comment } from "@/root/src/components/screens/Comment";
import { EditAndCreateSubForum } from "@/root/src/components/screens/EditAndCreateSubForum";
import { EditProfile } from "@/root/src/components/screens/EditProfile";
import { Follow } from "@/root/src/components/screens/Follow";
import { Info } from "@/root/src/components/screens/Info";
import { NewChat } from "@/root/src/components/screens/NewChat";
import { Post } from "@/root/src/components/screens/Post";
import { Profile } from "@/root/src/components/screens/Profile";
import { SubForum } from "@/root/src/components/screens/SubForum";
import { SubForumMod } from "@/root/src/components/screens/SubForumMod";
import { colors } from "@/root/src/constants";
import { UserContext } from "@/root/src/context";

const Stack = createStackNavigator<StackParamList_>();
const AuthStack = createStackNavigator<AuthStackParamList_>();

const defaultStackOptions = {
  headerTintColor: colors.green,
  headerBackTitleVisible: false,
  headerTitleStyle: {
    fontFamily: "lr",
    fontSize: 16,
    color: colors.black,
  },
};

export const StackNavigator = () => {
  const {
    user: { id },
  } = React.useContext(UserContext);
  return (
    <Stack.Navigator
      initialRouteName="BottomTabNav"
      screenOptions={defaultStackOptions}
    >
      <Stack.Screen
        component={BottomTabNavigator}
        name="BottomTabNav"
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={SubForum}
        name="SubForum"
        options={({ route }) => ({
          title: `e/${route.params.title}`,
        })}
      />
      <Stack.Screen
        component={SubForumMod}
        name="SubForumMod"
        options={() => ({
          title: "Manage",
        })}
      />
      <Stack.Screen
        component={Info}
        name="Info"
        options={() => ({
          title: "Info",
        })}
      />
      <Stack.Screen
        component={EditAndCreateSubForum}
        initialParams={{ title: "Create Subforum", action: "Add" }}
        name="EditAndCreateSubForum"
        options={({ route }) => ({
          title: route.params.title,
        })}
      />
      <Stack.Screen
        component={Follow}
        name="Follow"
        options={({ route }) => ({
          title: route.params.title,
        })}
      />
      <Stack.Screen component={EditProfile} name="EditProfile" />
      <Stack.Screen
        component={AddAndEditComment}
        name="AddAndEditComment"
        options={() => ({
          title: "Add Comment",
          headerStyle: {
            backgroundColor: colors.green,
          },
          headerTitleStyle: {
            fontFamily: "lr",
            fontSize: 16,
            color: colors.white,
          },
          headerTintColor: colors.white,
        })}
      />
      <Stack.Screen
        component={Comment}
        name="Comment"
        options={() => ({
          title: "",
          headerStyle: {
            backgroundColor: colors.green,
          },
          headerTintColor: colors.white,
        })}
      />
      <Stack.Screen
        component={AddAndEditReplies}
        name="AddAndEditReplies"
        options={() => ({
          title: "",
          headerStyle: {
            backgroundColor: colors.green,
          },
          headerTintColor: colors.white,
        })}
      />
      <Stack.Screen
        component={AddAndEditPost}
        name="AddAndEditPost"
        options={({ route }) => ({
          title: route.params.title,
          headerTintColor: colors.green,
        })}
      />
      <Stack.Screen
        component={ChooseSubForum}
        name="ChooseSubForum"
        options={() => ({
          title: "Select Sub-Forum",
          headerTintColor: colors.green,
        })}
      />
      <Stack.Screen component={ChatRoom} name="ChatRoom" />
      <Stack.Screen
        component={Profile}
        initialParams={{ userId: id }}
        name="Profile"
        options={() => ({
          title: "",
        })}
      />
      <Stack.Screen
        component={CoinTipping}
        initialParams={{ userId: id }}
        name="Tipping"
        options={() => ({
          title: "",
        })}
      />
      <Stack.Screen
        component={NewChat}
        name="NewChat"
        options={{
          title: "Search Your Friends",
        }}
      />
      <Stack.Screen
        component={ChatList}
        name="ChatList"
        options={{
          title: "Discussions",
        }}
      />
      <Stack.Screen
        component={Post}
        name="Post"
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
        component={SignIn}
        name="SignIn"
        options={() => ({
          title: "",
          headerShown: false,
        })}
      />
      <AuthStack.Screen
        component={SignUp}
        name="SignUp"
        options={() => ({
          title: "",
          headerShown: false,
        })}
      />
      <AuthStack.Screen
        component={Verification}
        name="Verification"
        options={() => ({
          title: "",
          headerShown: false,
        })}
      />
      <AuthStack.Screen
        component={ForgotPassword}
        name="ForgotPassword"
        options={() => ({
          title: "",
          headerShown: false,
        })}
      />
      <AuthStack.Screen
        component={AccountRecovery}
        name="AccountRecovery"
        options={() => ({
          title: "",
          headerShown: false,
        })}
      />
    </AuthStack.Navigator>
  );
};
