import { FontAwesome, Foundation, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import {
  MessageStackNavigator,
  StackNavigator,
} from "@/root/src/components/navigations/StackNavigator";
import { Explore } from "@/root/src/components/screens/Explore";

const Tab = createBottomTabNavigator();

/**
 * Todo change icons color when it is focused
 */

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="StackNavigator"
        component={StackNavigator}
        options={{
          title: "",
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIconStyle: { alignItems: "center" },
          tabBarIcon: () => {
            return <Foundation name="home" size={24} color="black" />;
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
          tabBarIcon: () => {
            return <Ionicons name="compass" size={24} color="black" />;
          },
        }}
      />
      <Tab.Screen
        name="MessageStackNavigator"
        component={MessageStackNavigator}
        options={{
          title: "",
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIconStyle: { alignItems: "center" },
          tabBarIcon: () => {
            return <FontAwesome name="send" size={21} color="black" />;
          },
        }}
      />
    </Tab.Navigator>
  );
};
