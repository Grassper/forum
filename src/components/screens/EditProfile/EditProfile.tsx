import { GraphQLResult } from "@aws-amplify/api-graphql";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { API } from "aws-amplify";
import {
  Box,
  Button,
  FormControl,
  Input,
  Spinner,
  Text,
  WarningOutlineIcon,
} from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { SvgUri } from "react-native-svg";
import isLength from "validator/es/lib/isLength";
import matches from "validator/es/lib/matches";

import {
  RootStackParamList_,
  StackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { AvatorPicker } from "@/root/src/components/shared/Avatar";
import { BackButton } from "@/root/src/components/shared/Button";
import { colors } from "@/root/src/constants";
import { UserContext } from "@/root/src/context";
import { useDebounce } from "@/root/src/hooks";

type NavigationProp_ = CompositeNavigationProp<
  StackNavigationProp<StackParamList_, "EditProfile">,
  StackNavigationProp<RootStackParamList_, "Application">
>;

type RouteProp_ = RouteProp<StackParamList_, "EditProfile">;

interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}

export const EditProfile: React.FC<Props_> = ({ navigation }) => {
  const [about, setAbout] = React.useState("");
  const [profileUrl, setProfileUrl] = React.useState("");
  const [isAboutValid, setAboutValid] = React.useState(false);
  const [aboutErrorMsg, setAboutErrorMsg] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const debouncedAbout = useDebounce(about, 1000);
  const currentUser = React.useContext(UserContext).user; // this context provided current login user
  const setUser = React.useContext(UserContext).updateUser;

  const handleSubmit = React.useCallback(async () => {
    if (isAboutValid && profileUrl) {
      setLoading(true);
      try {
        const updateUserInput = {
          id: currentUser.id,
          about,
          profileImageUrl: profileUrl,
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
      navigation.navigate({
        name: "Profile",
        params: { userId: currentUser.id },
        merge: true,
      });
      // pass id of current user
      setLoading(false);
    }
  }, [about, currentUser, isAboutValid, navigation, setUser, profileUrl]);

  React.useEffect(() => {
    const validateAbout = () => {
      if (
        isLength(about, { min: 0, max: 300 }) &&
        matches(about, "^[A-Za-z][A-Za-z0-9 _|.,!']{0,300}$", "m")
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
    setProfileUrl(currentUser.profileImageUrl);
  }, [currentUser]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton color="eGreen.400" />,
      headerRight: () => (
        <Button
          _text={{ fontWeight: "600", color: "eGreen.400" }}
          onPress={!loading ? handleSubmit : null}
          size="md"
          variant="unstyled"
        >
          {!loading ? "Save" : <Spinner color="eGreen.400" />}
        </Button>
      ),
      headerTitle: () => <Text>Edit Profile</Text>,
    });
  }, [handleSubmit, navigation, loading]);

  return (
    <Box style={styles.wrapper}>
      <Box style={styles.container}>
        <Box alignItems="center" justifyContent="center" my="4">
          <Box
            bg="amber.100"
            borderRadius="full"
            height="100px"
            overflow="hidden"
            width="100px"
          >
            <SvgUri height="100%" uri={profileUrl} width="100%" />
          </Box>
        </Box>
        <FormControl isInvalid={!isAboutValid} mt="4">
          <FormControl.Label mb="3">About</FormControl.Label>
          <Input
            bg="muted.100"
            borderRadius="md"
            fontSize="sm"
            height="175"
            mb="2"
            multiline
            numberOfLines={4}
            onChangeText={setAbout}
            p="4"
            placeholder="Express yourself"
            placeholderTextColor="muted.400"
            value={about}
            variant="unstyled"
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {aboutErrorMsg}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl>
          <FormControl.HelperText>
            Avatars are generated based on about hash.
          </FormControl.HelperText>
          <AvatorPicker about={debouncedAbout} setProfileUrl={setProfileUrl} />
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
