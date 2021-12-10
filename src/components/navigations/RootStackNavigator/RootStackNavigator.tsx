import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { RootStackParamList_ } from "@/root/src/components/navigations/Navigation";
import { SideDrawerNavigator } from "@/root/src/components/navigations/SideDrawerNavigator";
import { AuthStackNavigator } from "@/root/src/components/navigations/StackNavigator";
import { colors } from "@/root/src/constants";
import { AuthContext } from "@/root/src/context";

const defaultStackOptions = {
  headerBackTitleVisible: false,
  headerTintColor: colors.green,
  headerTitleStyle: {
    fontFamily: "mm",
  },
};

const RootStack = createStackNavigator<RootStackParamList_>();
export const RootStackNavigator = () => {
  const { authState } = React.useContext(AuthContext);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={defaultStackOptions}>
        {authState === "LOGGEDIN" ? (
          <RootStack.Screen
            name="Application"
            component={SideDrawerNavigator}
            options={() => ({
              headerShown: false,
            })}
          />
        ) : (
          <RootStack.Screen
            name="Authentication"
            component={AuthStackNavigator}
            options={() => ({
              headerShown: false,
            })}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
