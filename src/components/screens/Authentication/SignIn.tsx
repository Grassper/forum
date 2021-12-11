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
    <Box height="100%" alignItems="center" bg="white">
      <VStack
        justifyContent="space-between"
        height="100%"
        safeAreaY
        width="90%"
      >
        <Box>
          <Box alignItems="flex-end" pt="2">
            <Pressable
              onPress={() => {
                navigation.push("SignUp");
              }}
            >
              <Text fontWeight="600" color="eGreen.400">
                Register
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
            Sign in
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
            value={userName}
            onChangeText={setUserName}
            autoCapitalize="none"
            placeholderTextColor="coolGray.400"
            borderColor="coolGray.200"
            borderRadius="full"
            _focus={{
              borderColor: colors.green,
            }}
            color={useContrastText("light.100")}
            placeholder="Username"
            p="4"
            mb="5"
          />
          <Input
            width="100%"
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            placeholderTextColor="coolGray.400"
            borderColor="coolGray.200"
            borderRadius="full"
            placeholder="Password"
            _focus={{
              borderColor: colors.green,
            }}
            type="password"
            color={useContrastText("light.100")}
            p="4"
            mb="5"
            autoCompleteType="password"
            secureTextEntry={hidePass ? true : false}
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
        </Box>
        <Box width="100%" justifyContent="flex-end">
          {!loading ? (
            <Pressable
              onPress={signIn}
              bg={colors.green}
              borderRadius="full"
              justifyContent="center"
              alignItems="center"
              height="50px"
            >
              <Text fontSize="md" fontWeight="600" color={buttonContrast}>
                Log Me In
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
              height="50px"
            >
              <Spinner color="white" />
            </Flex>
          )}
        </Box>
      </VStack>
    </Box>
  );
};
