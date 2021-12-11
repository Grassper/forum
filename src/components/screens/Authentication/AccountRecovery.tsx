import Auth from "@aws-amplify/auth";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
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
import React, { useState } from "react";
import { Alert } from "react-native";

import { AuthStackParamList_ } from "@/root/src/components/navigations/Navigation";
import { colors } from "@/root/src/constants";

type NavigationProp_ = StackNavigationProp<
  AuthStackParamList_,
  "AccountRecovery"
>;
interface Props_ {
  navigation: NavigationProp_;
}
export const AccountRecovery: React.FC<Props_> = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = React.useState(false);

  const buttonContrast = useContrastText("green.500");

  const forgotPassword = async () => {
    // Send confirmation code to user's email
    if (userName !== "") {
      try {
        setLoading(true);
        const responseData = await Auth.forgotPassword(userName);
        if (responseData) {
          setDestination(responseData.CodeDeliveryDetails.Destination);
          setLoading(false);
          navigation.navigate("ForgotPassword", {
            username: userName,
            email: destination,
          });
        }
      } catch (error) {
        //@ts-ignore
        Alert.alert(error.message);
        setLoading(false);
      }
    } else {
      Alert.alert("Username shouldn't be empty");
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
          <Box alignItems="flex-start" pt="2">
            <Pressable onPress={() => navigation.navigate("SignIn")}>
              <Icon
                as={<Ionicons name="ios-arrow-back" />}
                color="eGreen.400"
                size={"24px"}
                mr="3"
              />
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
            Forget Password
          </Text>
          <Box>
            <Text fontSize="sm" pb="6" color={colors.gray}>
              It's fine that happens ! Click on the button below to reset your
              password
            </Text>
          </Box>

          <Input
            width="100%"
            value={userName}
            onChangeText={setUserName}
            autoCapitalize="none"
            borderRadius="full"
            placeholder="username"
            placeholderTextColor="coolGray.400"
            borderColor="coolGray.200"
            _focus={{
              borderColor: colors.green,
            }}
            p="4"
            mb="5"
            type="text"
          />
        </Box>
        <Box width="100%" justifyContent="flex-end">
          {!loading ? (
            <Pressable
              onPress={forgotPassword}
              bg={colors.green}
              borderRadius="full"
              justifyContent="center"
              height="50px"
              alignItems="center"
            >
              <Text fontSize="md" fontWeight="600" color={buttonContrast}>
                Continue
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
