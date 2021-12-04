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

import { colors } from "@/root/src/constants";

interface Props_ {
  Login: boolean;
  setLogin: (value: boolean) => void;
}
export const SignUp: React.FC<Props_> = ({ Login, setLogin }) => {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailId, setEmailId] = React.useState("");
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
  return (
    <Box flex="1">
      <StatusBar />
      <Box px="3" height="100%">
        <Flex justifyContent="space-between" direction="column" height="100%">
          <Box>
            <Box alignItems="flex-end" pt="3">
              <Pressable onPress={() => setLogin(!Login)}>
                <Text fontSize="sm" fontWeight="bold" color="eGreen.400">
                  Sign in
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