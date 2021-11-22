import "react-native-gesture-handler";

import Amplify, { API, Auth, graphqlOperation } from "aws-amplify";
// @ts-ignore
import { withAuthenticator } from "aws-amplify-react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { NativeBaseProvider } from "native-base";
import React, { useEffect, useState } from "react";
import { enableScreens } from "react-native-screens";

import { NativeBaseTheme as Theme } from "@/root/src/config";

// @ts-ignore
import config from "./aws-exports";
import { SideDrawerNavigator } from "./components/navigations/SideDrawerNavigator";

Amplify.configure({ ...config, Analytics: { disabled: true } });

enableScreens();

const fetchFonts = (): Promise<void> => {
  return Font.loadAsync({
    ml: require("@/root/assets/fonts/Montserrat-Light.ttf"),
    mr: require("@/root/assets/fonts/Montserrat-Regular.ttf"),
    mm: require("@/root/assets/fonts/Montserrat-Medium.ttf"),
    ms: require("@/root/assets/fonts/Montserrat-SemiBold.ttf"),
    mb: require("@/root/assets/fonts/Montserrat-Bold.ttf"),
    rl: require("@/root/assets/fonts/RobotoSlab-Light.ttf"),
    rr: require("@/root/assets/fonts/RobotoSlab-Regular.ttf"),
    rm: require("@/root/assets/fonts/RobotoSlab-Medium.ttf"),
    rs: require("@/root/assets/fonts/RobotoSlab-SemiBold.ttf"),
    rb: require("@/root/assets/fonts/RobotoSlab-Bold.ttf"),
  });
};

const App: React.FC = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const checkCurrentUserInDb = async () => {
      try {
        // get authenticated user from cognito
        const currentUser = await Auth.currentAuthenticatedUser({
          bypassCache: true,
        });

        if (currentUser) {
          // check user exist in db
          const userData = await API.graphql(
            graphqlOperation(getUser, { id: currentUser.attributes.sub })
          );

          if (userData.data.getUser) {
            console.log("user already registered in database");
            return;
          }

          // if user is not registered. register user to db
          const newUser = {
            id: currentUser.attributes.sub,
            username: currentUser.username,
            email: currentUser.attributes.email,
            coins: 1000,
          };

          await API.graphql(
            graphqlOperation(createUser, {
              input: newUser,
            })
          );
        }
      } catch (err) {
        console.log("error while registering user in app.tsx", err);
      }
    };
    checkCurrentUserInDb();
  }, []);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <NativeBaseProvider theme={Theme}>
      <SideDrawerNavigator />
    </NativeBaseProvider>
  );
};

export default withAuthenticator(App);

const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
    }
  }
`;

const createUser = /* GraphQL */ `
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`;
