import "react-native-gesture-handler";

import Amplify, { Auth } from "aws-amplify";
// @ts-ignore
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { enableScreens } from "react-native-screens";

import { RootStackNavigator } from "@/root/src/components/navigations/RootStackNavigator";
import { NativeBaseTheme as Theme } from "@/root/src/config";
import {
  AuthContext,
  AuthContextProvider,
  UserContext,
  UserContextProvider,
} from "@/root/src/context";
import { RegisterUserInDb } from "@/root/src/utils/helpers";

// @ts-ignore
import config from "./aws-exports";

Amplify.configure({ ...config, Analytics: { disabled: true } });

enableScreens(true);

const fetchFonts = (): Promise<void> => {
  return Font.loadAsync({
    ll: require("@/root/assets/fonts/LexendDeca-Light.ttf"),
    lr: require("@/root/assets/fonts/LexendDeca-Regular.ttf"),
    lm: require("@/root/assets/fonts/LexendDeca-Medium.ttf"),
    ls: require("@/root/assets/fonts/LexendDeca-SemiBold.ttf"),
    lb: require("@/root/assets/fonts/LexendDeca-Bold.ttf"),
  });
};

const App: React.FC = () => {
  const [fontLoaded, setFontLoaded] = React.useState(false);

  const { updateUser } = React.useContext(UserContext);
  const { authState, setAuthState } = React.useContext(AuthContext);

  React.useEffect(() => {
    const checkUserIsAuthenticated = async () => {
      try {
        // get authenticated user from cognito
        const currentUser = await Auth.currentAuthenticatedUser({
          bypassCache: true,
        });

        if (currentUser) {
          await RegisterUserInDb(currentUser, updateUser, setAuthState);
        }
      } catch (err) {
        console.log(err);
        setAuthState("LOGGEDOUT");
      }
    };
    checkUserIsAuthenticated();
  }, [setAuthState, updateUser]);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }

  if (authState === "INITIALIZING") {
    return <AppLoading />;
  }

  return (
    <NativeBaseProvider theme={Theme}>
      <RootStackNavigator />
    </NativeBaseProvider>
  );
};

const ContextWrapper: React.FC = () => {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </AuthContextProvider>
  );
};

export default ContextWrapper;
