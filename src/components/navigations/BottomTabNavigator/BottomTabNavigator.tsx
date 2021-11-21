import {
  FontAwesome,
  Foundation,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import { ChatList } from "@/root/src/components/screens/ChatList";
import { Explore } from "@/root/src/components/screens/Explore";
import { Home } from "@/root/src/components/screens/Home";

const Tab = createBottomTabNavigator();

/**
 * Todo change icons color when it is focused
 */

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "",
          tabBarShowLabel: false,
          tabBarIconStyle: { alignItems: "center" },
          tabBarIcon: ({ focused }) => {
            return (
              <Foundation
                name="home"
                size={24}
                color={focused ? "#17D7A0" : "black"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          title: "",
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIconStyle: { alignItems: "center" },
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name="compass"
                size={24}
                color={focused ? "#17D7A0" : "black"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="ChatList"
        component={ChatList}
        options={{
          title: "",
          tabBarShowLabel: false,
          tabBarIconStyle: { alignItems: "center" },
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesome
                name="send"
                size={21}
                color={focused ? "#17D7A0" : "black"}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
