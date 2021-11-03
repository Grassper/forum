import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { SideDrawerNavigator } from "@/root/src/components/navigations/SideDrawerNavigator";
import { Follow } from "@/root/src/components/screens/Follow";
import { Profile } from "@/root/src/components/screens/Profile";

export type RootStackParamList = {
  Profile: undefined;
  Follow: undefined;
  SideDrawerNavigator: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen
          name="SideDrawerNavigator"
          component={SideDrawerNavigator}
          options={{
            title: "",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: "",
          }}
        />
        <Stack.Screen
          name="Follow"
          component={Follow}
          options={{
            title: "",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
