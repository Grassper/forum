import React, { useState, useEffect } from "react";
import Amplify, { Auth, API, graphqlOperation } from "aws-amplify";
// @ts-ignore
import config from "./aws-exports";
// @ts-ignore
import { withAuthenticator } from "aws-amplify-react-native";
import { StyleSheet, View, Text } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import { getUser } from "./graphql/queries";
import { createUser } from "./graphql/mutations";

Amplify.configure(config);

const fetchFonts = () => {
  return Font.loadAsync({
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-italic": require("../assets/fonts/Montserrat-Italic.ttf"),
    "Montserrat-regular": require("../assets/fonts/Montserrat-Regular.ttf"),
  });
};

const App = () => {
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
    <View style={styles.container}>
      <Text>Hi from react native</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#000000",
  },
});

export default withAuthenticator(App);
