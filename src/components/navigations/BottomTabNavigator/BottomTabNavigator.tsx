import { Foundation } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import { Home } from "@/root/src/components/screens/Home";

const Tab = createBottomTabNavigator();

/**
 * Todo change icons color when it is focused
 */

export const BottomTabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Feed"
          component={Home}
          options={{
            title: "",
            tabBarShowLabel: false,
            tabBarIconStyle: { alignItems: "center" },
            tabBarIcon: () => {
              return <Foundation name="home" size={24} color="black" />;
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
