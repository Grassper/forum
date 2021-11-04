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

import { RootStackParamList } from "@/root/src/components/navigations/StackNavigator";
import { colors } from "@/root/src/constants";

type NavigationProp_ = StackNavigationProp<RootStackParamList, "EditProfile">;

interface Props_ {
  navigation: NavigationProp_;
}

export const EditProfile: React.FC<Props_> = ({ navigation }) => {
  const [userName, setUserName] = React.useState("");
  const [about, setAbout] = React.useState("");

  const handleUserName = (event: any) => setUserName(event.target.value);
  const handleAbout = (event: any) => setAbout(event.target.value);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          size="md"
          _text={{ fontWeight: "600", color: "white" }}
          variant="unstyled"
          onPress={() => navigation.navigate("Profile")}
        >
          Save
        </Button>
      ),
    });
  }, [navigation]);

  return (
    <Box style={styles.wrapper}>
      <Box style={styles.container}>
        <FormControl isRequired>
          <FormControl.Label mb="3">User Name</FormControl.Label>
          <Input
            bg="muted.100"
            p="4"
            value={userName}
            onChange={handleUserName}
            borderRadius="md"
            placeholder="John joe."
            placeholderTextColor="muted.400"
            fontSize="sm"
            variant="unstyled"
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            You must provide username
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl mt="4">
          <FormControl.Label mb="3">About</FormControl.Label>
          <Input
            bg="muted.100"
            p="4"
            mb="2"
            minHeight="175"
            multiline
            maxLength={300}
            numberOfLines={4}
            value={about}
            onChange={handleAbout}
            borderRadius="md"
            placeholder="About (optional)"
            placeholderTextColor="muted.400"
            fontSize="sm"
            variant="unstyled"
          />
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
