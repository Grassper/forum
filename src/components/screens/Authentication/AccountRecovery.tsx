import Auth from "@aws-amplify/auth";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
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
import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";

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
            Forget Password
          </Text>
          <Box>
            <Text color={colors.gray} fontSize="sm" pb="6">
              It's fine that happens ! Click on the button below to reset your
              password
            </Text>
          </Box>

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
            placeholder="username"
            placeholderTextColor="coolGray.400"
            type="text"
            value={userName}
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
                onPress={forgotPassword}
              >
                <Text color={buttonContrast} fontSize="md" fontWeight="600">
                  Continue
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
