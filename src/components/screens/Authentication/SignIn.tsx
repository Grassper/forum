import { Auth } from "aws-amplify";
import { Box, Flex, Input, Pressable, Text } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

import { colors } from "@/root/src/constants";

interface Props_ {}
export const SignIn: React.FC<Props_> = () => {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  async function signIn() {
    if (userName.trim() && userName.trim()) {
      try {
        const user = await Auth.signIn(userName, password);
        console.log(user);
      } catch (error) {
        console.log("error signing in", error);
      }
    } else {
      console.log("empty values");
    }
  }

  return (
    <Box style={styles.wrapper}>
      <Box justifyContent="center" bg="white" pt="10" mt="2" width="95%">
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="3xl" py="4" fontWeight="bold" fontFamily="heading">
            Log in
          </Text>

          <Input
            width="90%"
            multiline
            value={userName}
            onChangeText={setUserName}
            borderRadius="full"
            placeholder="userName"
            placeholderTextColor="muted.400"
            fontSize="sm"
            variant="unstyled"
            backgroundColor="gray.200"
            paddingLeft="5"
            marginBottom="5"
            color="eGreen.400"
          />
          <Input
            width="90%"
            multiline
            value={password}
            onChangeText={setPassword}
            borderRadius="full"
            placeholder="password"
            placeholderTextColor="muted.400"
            fontSize="sm"
            variant="unstyled"
            backgroundColor="gray.200"
            paddingLeft="5"
            color="eGreen.400"
            type="password"
          />
          <Box alignItems="flex-start" width="85%" py="2">
            <Pressable onPress={() => console.log("clicked")}>
              <Text fontSize="sm" color={colors.green}>
                Forgot Password?
              </Text>
            </Pressable>
          </Box>
        </Flex>
      </Box>
      <Box width="85%" justifyContent="flex-end" py="4">
        <Pressable
          onPress={signIn}
          backgroundColor={colors.green}
          borderRadius="full"
          alignItems="center"
        >
          <Text fontSize="md" fontWeight="bold" color={colors.white} py="2">
            continue
          </Text>
        </Pressable>
      </Box>
    </Box>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "center",

    width: "100%",
  },
});
