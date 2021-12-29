import { MaterialIcons } from "@expo/vector-icons";
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
import { AuthContext, UserContext } from "@/root/src/context";
import { RegisterUserInDb } from "@/root/src/utils/helpers";

type NavigationProp_ = StackNavigationProp<AuthStackParamList_, "SignIn">;
interface Props_ {
  navigation: NavigationProp_;
}
export const SignIn: React.FC<Props_> = ({ navigation }) => {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [hidePass, setHidePass] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const buttonContrast = useContrastText("green.500");

  const { updateUser } = React.useContext(UserContext);
  const { setAuthState } = React.useContext(AuthContext);

  const signIn = async () => {
    if (userName.trim() && password) {
      try {
        setLoading(true);
        const currentUser = await Auth.signIn(userName, password);
        if (currentUser) {
          await RegisterUserInDb(currentUser, updateUser, setAuthState);
        }
        setLoading(false);
      } catch (error) {
        //@ts-ignore
        Alert.alert(error.message);
        setLoading(false);
      }
    } else {
      Alert.alert("Please enter a valid Username & Password");
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
          <Box alignItems="flex-end" pt="2">
            <Pressable
              onPress={() => {
                navigation.push("SignUp");
              }}
            >
              <Text color="eGreen.400" fontWeight="600">
                Register
              </Text>
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
            Sign in
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
            color={useContrastText("light.100")}
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
            color={useContrastText("light.100")}
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
          <Box px="3">
            <Pressable
              onPress={() => {
                navigation.navigate("AccountRecovery");
              }}
            >
              <Text color="eGreen.400" fontSize="xs">
                Forgot Password?
              </Text>
            </Pressable>
          </Box>
        </ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={60}
        >
          <Box justifyContent="flex-end" width="100%">
            {!loading ? (
              <Pressable
                alignItems="center"
                bg={colors.green}
                borderRadius="full"
                height="50px"
                justifyContent="center"
                onPress={signIn}
              >
                <Text color={buttonContrast} fontSize="md" fontWeight="600">
                  Log Me In
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
