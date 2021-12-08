import { FontAwesome, Foundation, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import { BottomTabParamList_ } from "@/root/src/components/navigations/Navigation";
import { ChatList } from "@/root/src/components/screens/ChatList";
import { Explore } from "@/root/src/components/screens/Explore";
import { Home } from "@/root/src/components/screens/Home";
import { colors } from "@/root/src/constants";
const Tab = createBottomTabNavigator<BottomTabParamList_>();

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
          headerTitleAlign: "center",
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
          title: "Messages",
          tabBarShowLabel: false,
          tabBarIconStyle: { alignItems: "center" },
          headerStyle: {
            backgroundColor: colors.green,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontFamily: "mm",
          },
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
