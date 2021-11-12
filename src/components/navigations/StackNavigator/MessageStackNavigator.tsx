import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { ChatList } from "@/root/src/components/screens/ChatList";
import { ChatRoom } from "@/root/src/components/screens/ChatRoom";
import { colors } from "@/root/src/constants";

export type MessageRootStackParamList = {
  ChatList: undefined;
  ChatRoom: undefined;
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
          title: "",
        }}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={{
          title: "",
        }}
      />
    </Stack.Navigator>
  );
};
