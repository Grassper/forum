import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { RootStackParamList_ } from "@/root/src/components/navigations/Navigation";
import { SideDrawerNavigator } from "@/root/src/components/navigations/SideDrawerNavigator";
import { colors } from "@/root/src/constants";

const defaultStackOptions = {
  headerBackTitleVisible: false,
  headerTintColor: colors.green,
  headerTitleStyle: {
    fontFamily: "mm",
  },
};

const RootStack = createStackNavigator<RootStackParamList_>();
export const RootStackNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={defaultStackOptions}>
        <RootStack.Screen
          name="Application"
          component={SideDrawerNavigator}
          options={() => ({
            headerShown: false,
          })}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
