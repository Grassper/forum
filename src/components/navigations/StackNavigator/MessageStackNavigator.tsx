import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { ChatList } from "@/root/src/components/screens/ChatList";
import { ChatRoom } from "@/root/src/components/screens/ChatRoom";
import { NewChat } from "@/root/src/components/screens/NewChat";
import { colors } from "@/root/src/constants";

export type MessageRootStackParamList = {
  ChatList: undefined;
  ChatRoom: { title: string; imageUri: string };
  NewChat: undefined;
};

const Stack = createStackNavigator<MessageRootStackParamList>();

const defaultStackOptions = {
  headerBackTitleVisible: false,
  headerTintColor: colors.green,
  headerTitleStyle: {
    fontFamily: "mm",
  },
};

export const MessageStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ChatList"
      screenOptions={defaultStackOptions}
    >
      <Stack.Screen
        name="ChatList"
        component={ChatList}
        options={{
          title: "Message",
          headerTintColor: colors.black,
        }}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={({ route }) => ({
          title: route.params.title,
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
    </Stack.Navigator>
  );
};
