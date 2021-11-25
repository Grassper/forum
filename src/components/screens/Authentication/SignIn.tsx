import { MaterialIcons } from "@expo/vector-icons";
import { Auth } from "aws-amplify";
import {
  Box,
  Flex,
  Icon,
  Input,
  Pressable,
  StatusBar,
  Text,
} from "native-base";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import { colors } from "@/root/src/constants";
import { useToggle } from "@/root/src/hooks";

interface Props_ {}
export const SignIn: React.FC<Props_> = () => {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailId, setEmailId] = React.useState("");
  const [Login, setLogin] = useToggle(false);
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
  async function signUp() {
    if (userName && password && emailId) {
      try {
        const { user } = await Auth.signUp({
          username: userName,
          password,
          attributes: {
            email: emailId, // optional
            // phone_number, // optional - E.164 number convention
            // other custom attributes
          },
        });
        console.log("signUp", user);
      } catch (error) {
        console.log("error signing up:", error);
      }
    } else {
      console.log("user values missing");
    }
  }

  return Login ? (
    <Box style={styles.wrapper}>
      <Box justifyContent="center" bg="white" pt="10" mt="2" width="95%">
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Pressable onPress={() => setLogin(!Login)}>
            <Text fontSize="sm" fontWeight="bold" color="eGreen.400">
              Sign up
            </Text>
          </Pressable>
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
            InputRightElement={
              <Pressable onPress={() => console.log("clicked")}>
                <Icon
                  as={<MaterialIcons name="visibility" />}
                  size={18}
                  mr="3"
                  color="muted.400"
                />
              </Pressable>
            }
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
  ) : (
    <Box flex="1">
      <StatusBar />
      <Box px="3" height="100%">
        <Flex justifyContent="space-between" direction="column" height="100%">
          <Box>
            <Box alignItems="flex-end" pt="3">
              <Pressable onPress={() => setLogin(!Login)}>
                <Text fontSize="sm" fontWeight="bold" color="eGreen.400">
                  Sign up
                </Text>
              </Pressable>
            </Box>
            <Text
              fontSize="3xl"
              fontWeight="bold"
              color={colors.black}
              fontFamily="heading"
              pt="5"
              pb="3"
            >
              Sign up
            </Text>
            <Text pt="2" pb="8" fontSize="sm" color={colors.gray}>
              By continuing you agree to our{" "}
              <Text color={colors.green} fontWeight="500">
                User Agreement{" "}
              </Text>
              and{" "}
              <Text color={colors.green} fontWeight="500">
                Privacy Policy
              </Text>
            </Text>
            <Input
              width="100%"
              multiline
              value={emailId}
              onChangeText={setEmailId}
              borderRadius="full"
              placeholder="email"
              placeholderTextColor="muted.400"
              fontSize="sm"
              variant="unstyled"
              backgroundColor="gray.200"
              paddingLeft="5"
              marginBottom="4"
              color="eGreen.400"
            />
            <Input
              width="100%"
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
              marginBottom="4"
              color="eGreen.400"
            />
            <Input
              width="100%"
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
              InputRightElement={
                <Pressable onPress={() => console.log("clicked")}>
                  <Icon
                    as={<MaterialIcons name="visibility" />}
                    size={18}
                    mr="3"
                    color="muted.400"
                  />
                </Pressable>
              }
            />
          </Box>
          <Box width="100%" justifyContent="flex-end" py="4">
            <Pressable
              onPress={signUp}
              backgroundColor={colors.green}
              borderRadius="full"
              alignItems="center"
            >
              <Text fontSize="md" fontWeight="bold" color={colors.white} py="2">
                continue
              </Text>
            </Pressable>
          </Box>
        </Flex>
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
