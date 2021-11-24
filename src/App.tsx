import "react-native-gesture-handler";

import { GraphQLResult } from "@aws-amplify/api-graphql";
import Amplify, { API, Auth } from "aws-amplify";
// @ts-ignore
import { withAuthenticator } from "aws-amplify-react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { enableScreens } from "react-native-screens";

import { NativeBaseTheme as Theme } from "@/root/src/config";
import { UserContext, UserContext_ } from "@/root/src/context";

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
  const [fontLoaded, setFontLoaded] = React.useState(false);
  const [user, setUser] = React.useState<UserContext_>({
    id: "",
    username: "",
    email: "",
    profileImageUrl: "",
    coins: 0,
  });

  React.useEffect(() => {
    const checkCurrentUserInDb = async () => {
      try {
        // get authenticated user from cognito
        const currentUser = await Auth.currentAuthenticatedUser({
          bypassCache: true,
        });

        if (currentUser) {
          // check user exist in db
          const userData = (await API.graphql({
            query: getUser,
            variables: { id: currentUser.attributes.sub },
            authMode: "AMAZON_COGNITO_USER_POOLS",
          })) as GraphQLResult<getUser_>;

          if (userData.data?.getUser) {
            // if user already exist set state and return
            const { profileImageUrl, coins } = userData.data.getUser;
            setUser({
              id: currentUser.attributes.sub,
              username: currentUser.username,
              email: currentUser.attributes.email,
              profileImageUrl,
              coins,
            });
            return;
          }

          // if user is not registered. register user to db
          const newUser = {
            id: currentUser.attributes.sub,
            username: currentUser.username,
            email: currentUser.attributes.email,
            profileImageUrl: `https://avatars.dicebear.com/api/micah/${currentUser.attributes.sub}.svg`, // for user profile replace space with dash
            coins: 1000,
            about: "",
          };

          const newUserMetrics = {
            id: currentUser.attributes.sub,
            postLikes: 0,
            postLoves: 0,
            postSupports: 0,
            postDislikes: 0,
            profileViews: 0,
            commentUpvotes: 0,
            commentDownvotes: 0,
            followers: 0,
            following: 0,
            totalPosts: 0,
            totalComments: 0,
            activeDays: 0,
            lastActiveDay: new Date().toISOString(),
          };

          await API.graphql({
            query: createUser,
            variables: { input: newUser },
            authMode: "AMAZON_COGNITO_USER_POOLS",
          });

          await API.graphql({
            query: createUserMetrics,
            variables: { input: newUserMetrics },
            authMode: "AMAZON_COGNITO_USER_POOLS",
          });
        }
      } catch (err) {
        console.error("error while registering user in app.tsx", err);
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
      <UserContext.Provider value={user}>
        <SideDrawerNavigator />
      </UserContext.Provider>
    </NativeBaseProvider>
  );
};

export default withAuthenticator(App);

/**
 * graphql queries and their types
 * types pattern {queryName}_
 * * note dash(_) at the end of type name
 * order 1.queryType 2.graphql query
 */

type getUser_ = {
  getUser?: { id: string; profileImageUrl: string; coins: number };
};

const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      profileImageUrl
      coins
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

const createUserMetrics = /* GraphQL */ `
  mutation createUserMetrics($input: CreateUserMetricsInput!) {
    createUserMetrics(input: $input) {
      id
    }
  }
`;
