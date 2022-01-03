import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { Auth } from "aws-amplify";
import {
  Box,
  Flex,
  Icon,
  Input,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  useContrastText,
  VStack,
} from "native-base";
import React from "react";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";

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

  const signUp = async () => {
    if (userName && password && emailId) {
      try {
        setLoading(true);
        await Auth.signUp({
          username: userName,
          password,
          attributes: {
            email: emailId,
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
      Alert.alert("Please enter a valid E-mail, Username & Password");
    }
  };
  return (
    <Box alignItems="center" bg="white" height="100%">
      <VStack
        height="100%"
        justifyContent="space-between"
        safeAreaY
        width="90%"
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Box alignItems="flex-start" pt="2">
            <Pressable onPress={() => navigation.navigate("SignIn")}>
              <Icon
                as={<Ionicons name="ios-arrow-back" />}
                color="eGreen.400"
                mr="3"
                size={"24px"}
              />
            </Pressable>
          </Box>
          <Text
            color={colors.black}
            fontFamily="heading"
            fontSize="3xl"
            fontWeight="bold"
            pb="3"
            pt="5"
          >
            Sign up
          </Text>
          <Text color={colors.gray} pb="8" pt="2">
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
            _focus={{
              borderColor: colors.green,
            }}
            autoCapitalize="none"
            borderColor="coolGray.200"
            borderRadius="full"
            mb="5"
            onChangeText={setEmailId}
            p="4"
            placeholder="E-mail"
            placeholderTextColor="coolGray.400"
            value={emailId}
            width="100%"
          />
          <Input
            _focus={{
              borderColor: colors.green,
            }}
            autoCapitalize="none"
            borderColor="coolGray.200"
            borderRadius="full"
            mb="5"
            onChangeText={setUserName}
            p="4"
            placeholder="Username"
            placeholderTextColor="coolGray.400"
            value={userName}
            width="100%"
          />
          <Input
            _focus={{
              borderColor: colors.green,
            }}
            autoCapitalize="none"
            autoCompleteType="password"
            borderColor="coolGray.200"
            borderRadius="full"
            InputRightElement={
              <Icon
                as={
                  <MaterialIcons
                    name={hidePass ? "visibility-off" : "visibility"}
                  />
                }
                color="muted.400"
                mr="3"
                onPress={() => setHidePass(!hidePass)}
                size={18}
              />
            }
            mb="5"
            onChangeText={setPassword}
            p="4"
            placeholder="Password"
            placeholderTextColor="coolGray.400"
            secureTextEntry={hidePass ? true : false}
            type="password"
            value={password}
            width="100%"
          />
        </ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={20}
        >
          <Box justifyContent="flex-end" width="100%">
            {!loading ? (
              <Pressable
                alignItems="center"
                bg={colors.green}
                borderRadius="full"
                height="50px"
                justifyContent="center"
                onPress={signUp}
              >
                <Text color={buttonContrast} fontSize="md" fontWeight="600">
                  Register
                </Text>
              </Pressable>
            ) : (
              <Flex
                alignItems="center"
                bg={colors.green}
                borderRadius="full"
                fontSize="md"
                fontWeight="600"
                height="50px"
                justifyContent="center"
              >
                <Spinner color="white" />
              </Flex>
            )}
          </Box>
        </KeyboardAvoidingView>
      </VStack>
    </Box>
  );
};
