import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { SideDrawerNavigator } from "@/root/src/components/navigations/SideDrawerNavigator";
import { Follow } from "@/root/src/components/screens/Follow";
import { Profile } from "@/root/src/components/screens/Profile";
import { colors } from "@/root/src/constants";

export type RootStackParamList = {
  Profile: undefined;
  Follow: { title: "Followers" | "Following" };
  SideDrawerNavigator: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const defaultStackOptions = {
  headerBackTitleVisible: false,
  headerTintColor: colors.green,
  headerTitleStyle: {
    fontFamily: "mm",
  },
};

export const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Profile"
        screenOptions={defaultStackOptions}
      >
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
          options={({ route }) => ({
            title: route.params.title,
            headerStyle: {
              backgroundColor: colors.green,
            },
            headerTintColor: colors.white,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
