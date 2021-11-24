import { StackNavigationProp } from "@react-navigation/stack";
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

import { RootStackParamList } from "@/root/src/components/navigations/StackNavigator";
import { colors } from "@/root/src/constants";
import { UserContext } from "@/root/src/context";

type NavigationProp_ = StackNavigationProp<RootStackParamList, "EditProfile">;

interface Props_ {
  navigation: NavigationProp_;
}

export const EditProfile: React.FC<Props_> = ({ navigation }) => {
  const [userName, setUserName] = React.useState("");
  const [about, setAbout] = React.useState("");

  const [isUserNameValid, setUserNameValid] = React.useState(false);
  const [isAboutValid, setAboutValid] = React.useState(false);

  const [userNameErrorMsg, setUserNameErrorMsg] = React.useState("");
  const [aboutErrorMsg, setAboutErrorMsg] = React.useState("");

  const currentUser = React.useContext(UserContext); // this context provided current login user

  const handleSubmit = React.useCallback(() => {
    if (isUserNameValid && isAboutValid) {
      /**
       * post api call here
       */
      navigation.navigate("Profile", { userId: currentUser.id }); // pass id of current user
    }
  }, [currentUser.id, isAboutValid, isUserNameValid, navigation]);

  React.useEffect(() => {
    const validateUserName = () => {
      if (
        isLength(userName, { min: 6, max: 20 }) &&
        matches(userName, "^[A-Za-z][A-Za-z0-9 _|.]{6,20}$")
      ) {
        setUserNameValid(true);
        setUserNameErrorMsg("");
      } else {
        setUserNameValid(false);
        setUserNameErrorMsg("It should be alphanumeric, characters 6-20");
      }
    };
    validateUserName();
  }, [userName]);

  React.useEffect(() => {
    const validateAbout = () => {
      if (
        isLength(about, { min: 0, max: 140 }) &&
        matches(about, "^[A-Za-z][A-Za-z0-9 _|.]{0,140}$", "m")
      ) {
        setAboutValid(true);
        setAboutErrorMsg("");
      } else {
        setAboutValid(false);
        setAboutErrorMsg("it should be alphanumeric max: 140 chars");
      }
    };
    validateAbout();
  }, [about]);

  React.useEffect(() => {
    setUserName(currentUser.username);
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
        <FormControl isInvalid={!isUserNameValid}>
          <FormControl.Label mb="3">User Name</FormControl.Label>
          <Input
            bg="muted.100"
            p="4"
            value={userName}
            onChangeText={setUserName}
            borderRadius="md"
            placeholder="John joe."
            placeholderTextColor="muted.400"
            fontSize="sm"
            variant="unstyled"
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {userNameErrorMsg}
          </FormControl.ErrorMessage>
        </FormControl>
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
 * username and about validation
 */
