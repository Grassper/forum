import { Foundation } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import { StackNavigator } from "@/root/src/components/navigations/StackNavigator";

const Tab = createBottomTabNavigator();

/**
 * Todo change icons color when it is focused
 */

export const BottomTabNavigator = () => {
  return (
    <NavigationContainer>
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
      </Tab.Navigator>
    </NavigationContainer>
  );
};
