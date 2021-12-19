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
        name="Home"
        component={Home}
        options={{
          title: "",
          tabBarShowLabel: false,
          headerTitleAlign: "center",
          tabBarIconStyle: { alignItems: "center" },
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign
                name="home"
                size={24}
                color={focused ? "#17D7A0" : "#4b5563"}
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
              <AntDesign
                name="find"
                size={24}
                color={focused ? "#17D7A0" : "#4b5563"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Survey"
        component={Survey}
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
                name="solution1"
                size={22}
                color={focused ? "#17D7A0" : "#4b5563"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="JoinedSubForum"
        component={JoinedSubForum}
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
                name="laptop"
                size={23}
                color={focused ? "#17D7A0" : "#4b5563"}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
