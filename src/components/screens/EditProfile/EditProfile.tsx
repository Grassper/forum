import { GraphQLResult } from "@aws-amplify/api-graphql";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { API } from "aws-amplify";
import {
  Box,
  Button,
  FormControl,
  Input,
  WarningOutlineIcon,
} from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { SvgUri } from "react-native-svg";
import isLength from "validator/es/lib/isLength";
import matches from "validator/es/lib/matches";

import {
  DrawerParamList_,
  StackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { colors } from "@/root/src/constants";
import { UserContext } from "@/root/src/context";

type NavigationProp_ = CompositeNavigationProp<
  StackNavigationProp<StackParamList_, "EditProfile">,
  DrawerNavigationProp<DrawerParamList_>
>;

type RouteProp_ = RouteProp<StackParamList_, "EditProfile">;

interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}

export const EditProfile: React.FC<Props_> = ({ navigation }) => {
  const [about, setAbout] = React.useState("");

  const [isAboutValid, setAboutValid] = React.useState(false);
  const [aboutErrorMsg, setAboutErrorMsg] = React.useState("");

  const currentUser = React.useContext(UserContext).user; // this context provided current login user
  const setUser = React.useContext(UserContext).updateUser;

  const handleSubmit = React.useCallback(async () => {
    if (isAboutValid) {
      try {
        const updateUserInput = {
          id: currentUser.id,
          about,
          _version: currentUser._version,
        };

        /**
         * Todo if input is same as current dont make a post call
         */

        /**
         * update user post call
         */
        const userData = (await API.graphql({
          query: updateUser,
          variables: { input: updateUserInput },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        })) as GraphQLResult<updateUser_>;

        /** update global user context */
        if (userData.data?.updateUser) {
          setUser({
            id: currentUser.id,
            username: currentUser.username,
            email: currentUser.email,
            about: userData.data.updateUser.about,
            profileImageUrl: userData.data.updateUser.profileImageUrl,
            coins: currentUser.coins,
            _version: userData.data.updateUser._version,
          });
        }
      } catch (err) {
        console.error("Error while updating the user profile", err);
      }
      navigation.navigate("Profile", { userId: currentUser.id }); // pass id of current user
    }
  }, [about, currentUser, isAboutValid, navigation, setUser]);

  React.useEffect(() => {
    const validateAbout = () => {
      if (
        isLength(about, { min: 0, max: 300 }) &&
        matches(about, "^[A-Za-z][A-Za-z0-9 _|.,!]{0,300}$", "m")
      ) {
        setAboutValid(true);
        setAboutErrorMsg("");
      } else {
        setAboutValid(false);
        setAboutErrorMsg("it should be alphanumeric max: 300 chars");
      }
    };
    validateAbout();
  }, [about]);

  React.useEffect(() => {
    setAbout(currentUser.about);
  }, [currentUser]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          size="md"
          _text={{ fontWeight: "600", color: "white" }}
          variant="unstyled"
          onPress={handleSubmit}
        >
          Save
        </Button>
      ),
    });
  }, [handleSubmit, navigation]);

  return (
    <Box style={styles.wrapper}>
      <Box style={styles.container}>
        <Box alignItems="center" justifyContent="center" my="4">
          <Box
            width="100px"
            height="100px"
            bg="amber.100"
            borderRadius="full"
            overflow="hidden"
          >
            <SvgUri
              uri={currentUser.profileImageUrl}
              width="100%"
              height="100%"
            />
          </Box>
        </Box>
        <FormControl mt="4" isInvalid={!isAboutValid}>
          <FormControl.Label mb="3">About</FormControl.Label>
          <Input
            bg="muted.100"
            p="4"
            mb="2"
            height="175"
            multiline
            numberOfLines={4}
            value={about}
            onChangeText={setAbout}
            borderRadius="md"
            placeholder="Express yourself"
            placeholderTextColor="muted.400"
            fontSize="sm"
            variant="unstyled"
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {aboutErrorMsg}
          </FormControl.ErrorMessage>
          <FormControl.HelperText>
            Introduce Yourself to community
          </FormControl.HelperText>
        </FormControl>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    marginBottom: 20,
    paddingVertical: 15,
    width: "90%",
  },
  wrapper: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
    width: "100%",
  },
});

/**
 * graphql queries and their types
 * types pattern {queryName}_
 * * note dash(_) at the end of type name
 * order 1.queryType 2.graphql query
 */

type updateUser_ = {
  updateUser?: {
    profileImageUrl: string;
    about: string;
    _version: number;
  };
};

const updateUser = /* GraphQL */ `
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      profileImageUrl
      about
      _version
    }
  }
`;
