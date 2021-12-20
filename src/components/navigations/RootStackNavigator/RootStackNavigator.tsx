import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { RootStackParamList_ } from "@/root/src/components/navigations/Navigation";
import {
  AuthStackNavigator,
  StackNavigator,
} from "@/root/src/components/navigations/StackNavigator";
import { colors } from "@/root/src/constants";
import { AuthContext } from "@/root/src/context";

const defaultStackOptions = {
  headerTintColor: colors.green,
  headerBackTitleVisible: false,
  headerShown: false,
  headerTitleStyle: {
    fontFamily: "lm",
  },
};

const RootStack = createStackNavigator<RootStackParamList_>();
export const RootStackNavigator = () => {
  const { authState } = React.useContext(AuthContext);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={defaultStackOptions}>
        {authState === "LOGGEDIN" ? (
          <RootStack.Screen component={StackNavigator} name="Application" />
        ) : (
          <RootStack.Screen
            component={AuthStackNavigator}
            name="Authentication"
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
