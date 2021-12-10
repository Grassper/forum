import { MaterialIcons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { Auth } from "aws-amplify";
import {
  Box,
  Flex,
  Icon,
  Input,
  Pressable,
  Spinner,
  Text,
  useContrastText,
  VStack,
} from "native-base";
import React from "react";
import { Alert } from "react-native";

import { AuthStackParamList_ } from "@/root/src/components/navigations/Navigation";
import { colors } from "@/root/src/constants";

type NavigationProp_ = StackNavigationProp<AuthStackParamList_, "SignUp">;
interface Props_ {
  navigation: NavigationProp_;
}
export const SignUp: React.FC<Props_> = ({ navigation }) => {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailId, setEmailId] = React.useState("");
  const [hidePass, setHidePass] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const buttonContrast = useContrastText("green.500");
  const [phoneNumber, setPhoneNumber] = React.useState("+91"); // for testing here used india country code

  const signUp = async () => {
    if (userName && password && emailId && phoneNumber) {
      try {
        setLoading(true);
        await Auth.signUp({
          username: userName,
          password,
          attributes: {
            email: emailId,
            phone_number: phoneNumber, // E.164 number convention
          },
        });
        setLoading(false);
        navigation.navigate("Verification", {
          username: userName,
          email: emailId,
        });
      } catch (error) {
        //@ts-ignore
        Alert.alert(error.message);
        setLoading(false);
      }
    } else {
      Alert.alert("Fields shouldn't be empty");
    }
  };
  return (
    <Box height="100%" alignItems="center" bg="white">
      <VStack
        justifyContent="space-between"
        height="100%"
        safeAreaY
        width="90%"
      >
        <Box>
          <Box alignItems="flex-end" pt="2">
            <Pressable onPress={() => navigation.navigate("SignIn")}>
              <Text fontWeight="600" color="eGreen.400">
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
          <Text pt="2" pb="8" color={colors.gray}>
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
            value={emailId}
            onChangeText={setEmailId}
            borderRadius="full"
            placeholder="email"
            placeholderTextColor="coolGray.400"
            borderColor="coolGray.200"
            _focus={{
              borderColor: colors.green,
            }}
            p="4"
            mb="5"
          />
          <Input
            width="100%"
            value={userName}
            onChangeText={setUserName}
            borderRadius="full"
            placeholder="username"
            placeholderTextColor="coolGray.400"
            borderColor="coolGray.200"
            p="4"
            _focus={{
              borderColor: colors.green,
            }}
            mb="5"
          />
          <Input
            width="100%"
            value={password}
            onChangeText={setPassword}
            borderRadius="full"
            placeholder="password"
            placeholderTextColor="coolGray.400"
            borderColor="coolGray.200"
            type="password"
            autoCompleteType="password"
            secureTextEntry={hidePass ? true : false}
            _focus={{
              borderColor: colors.green,
            }}
            p="4"
            mb="5"
            InputRightElement={
              <Icon
                as={
                  <MaterialIcons
                    name={hidePass ? "visibility-off" : "visibility"}
                  />
                }
                size={18}
                mr="3"
                color="muted.400"
                onPress={() => setHidePass(!hidePass)}
              />
            }
          />
          <Input
            width="100%"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholderTextColor="coolGray.400"
            borderColor="coolGray.200"
            borderRadius="full"
            _focus={{
              borderColor: colors.green,
            }}
            placeholder="phoneNumber"
            p="4"
            mb="5"
          />
        </Box>
        <Box width="100%" justifyContent="flex-end">
          {!loading ? (
            <Pressable
              onPress={signUp}
              bg={colors.green}
              borderRadius="full"
              justifyContent="center"
              height="40px"
              alignItems="center"
            >
              <Text fontSize="md" fontWeight="600" color={buttonContrast}>
                Register
              </Text>
            </Pressable>
          ) : (
            <Flex
              fontSize="md"
              fontWeight="600"
              bg={colors.green}
              borderRadius="full"
              justifyContent="center"
              alignItems="center"
              height="40px"
            >
              <Spinner color="white" />
            </Flex>
          )}
        </Box>
      </VStack>
    </Box>
  );
};
