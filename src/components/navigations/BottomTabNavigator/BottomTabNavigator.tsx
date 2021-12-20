import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import { BottomTabParamList_ } from "@/root/src/components/navigations/Navigation";
import { Explore } from "@/root/src/components/screens/Explore";
import { Home } from "@/root/src/components/screens/Home";
import { JoinedSubForum } from "@/root/src/components/screens/JoinedSubForum";
import { Survey } from "@/root/src/components/screens/Survey";

const Tab = createBottomTabNavigator<BottomTabParamList_>();
/**
 * Todo change icons color when it is focused
 */

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        component={Home}
        name="Home"
        options={{
          title: "",
          tabBarShowLabel: false,
          headerTitleAlign: "center",
          tabBarIconStyle: { alignItems: "center" },
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign
                color={focused ? "#17D7A0" : "#4b5563"}
                name="home"
                size={24}
              />
            );
          },
        }}
      />
      <Tab.Screen
        component={Explore}
        name="Explore"
        options={{
          title: "",
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIconStyle: { alignItems: "center" },
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign
                color={focused ? "#17D7A0" : "#4b5563"}
                name="find"
                size={24}
              />
            );
          },
        }}
      />
      <Tab.Screen
        component={Survey}
        name="Survey"
        options={{
          title: "Surveys",
          tabBarShowLabel: false,
          tabBarIconStyle: { alignItems: "center" },
          headerTitleStyle: {
            fontFamily: "lr",
            fontSize: 16,
          },
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign
                color={focused ? "#17D7A0" : "#4b5563"}
                name="solution1"
                size={22}
              />
            );
          },
        }}
      />
      <Tab.Screen
        component={JoinedSubForum}
        name="JoinedSubForum"
        options={{
          title: "Forums",
          tabBarShowLabel: false,
          tabBarIconStyle: { alignItems: "center" },
          headerTitleStyle: {
            fontFamily: "lr",
            fontSize: 16,
          },
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign
                color={focused ? "#17D7A0" : "#4b5563"}
                name="laptop"
                size={23}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
