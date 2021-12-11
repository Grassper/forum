import Auth from "@aws-amplify/auth";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Box,
  Flex,
  HStack,
  Icon,
  Input,
  Pressable,
  Spinner,
  Text,
  useContrastText,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { Alert, StyleSheet, TextInput } from "react-native";

import { AuthStackParamList_ } from "@/root/src/components/navigations/Navigation";
import { colors } from "@/root/src/constants";

type RouteProp_ = RouteProp<AuthStackParamList_, "ForgotPassword">;

type NavigationProp_ = StackNavigationProp<
  AuthStackParamList_,
  "ForgotPassword"
>;

interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}
export const ForgotPassword: React.FC<Props_> = ({ navigation, route }) => {
  const username = route.params.username;
  const email = route.params.email;
  const [loading, setLoading] = React.useState(false);
  const buttonContrast = useContrastText("green.500");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const pinRef1: React.RefObject<TextInput> = React.createRef();
  const pinRef2: React.RefObject<TextInput> = React.createRef();
  const pinRef3: React.RefObject<TextInput> = React.createRef();
  const pinRef4: React.RefObject<TextInput> = React.createRef();
  const pinRef5: React.RefObject<TextInput> = React.createRef();
  const pinRef6: React.RefObject<TextInput> = React.createRef();
  const [verificationPins, setVerificationPins] = React.useState({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
    pin5: "",
    pin6: "",
  });

  React.useEffect(() => {
    if (verificationPins.pin1 !== "") {
      pinRef2.current?.focus();
    }
    if (verificationPins.pin2 !== "") {
      pinRef3.current?.focus();
    }
    if (verificationPins.pin3 !== "") {
      pinRef4.current?.focus();
    }
    if (verificationPins.pin4 !== "") {
      pinRef5.current?.focus();
    }
    if (verificationPins.pin5 !== "") {
      pinRef6.current?.focus();
    }
  }, [pinRef2, pinRef3, pinRef4, pinRef5, pinRef6, verificationPins]);

  const forgotPasswordSubmit = async () => {
    if (
      verificationPins.pin1 &&
      verificationPins.pin2 &&
      verificationPins.pin3 &&
      verificationPins.pin4 &&
      verificationPins.pin5 &&
      verificationPins.pin6
    ) {
      const code =
        verificationPins.pin1 +
        verificationPins.pin2 +
        verificationPins.pin3 +
        verificationPins.pin4 +
        verificationPins.pin5 +
        verificationPins.pin6;
      if (newPassword.trim() === confirmNewPassword.trim()) {
        try {
          setLoading(true);
          // Collect confirmation code and new password, then
          const responseData = await Auth.forgotPasswordSubmit(
            username,
            code,
            newPassword
          );

          if (responseData) {
            navigation.navigate("SignIn");
          }

          setLoading(false);
        } catch (error) {
          //@ts-ignore
          Alert.alert(error.message);
          setLoading(false);
        }
      } else {
        Alert.alert("password mismatched, try again");
      }
    } else {
      Alert.alert("Pin fields shouldn't be empty'");
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
            Password Recovery
          </Text>
          <Box>
            <Text fontSize="sm">
              We've sent a 6-digit security verification code to{" "}
              <Text color="eGreen.400" fontSize="md">
                {email}
              </Text>
            </Text>
          </Box>
          <HStack justifyContent="space-between" py="4">
            <Input
              ref={pinRef1}
              onChangeText={(value) => {
                setVerificationPins((prevState) => ({
                  ...prevState,
                  pin1: value,
                }));
              }}
              value={verificationPins.pin1}
              maxLength={1}
              style={styles.textInput}
              keyboardType="numeric"
              _focus={{
                borderColor: colors.green,
              }}
            />
            <Input
              ref={pinRef2}
              onChangeText={(value) => {
                setVerificationPins((prevState) => ({
                  ...prevState,
                  pin2: value,
                }));
              }}
              value={verificationPins.pin2}
              maxLength={1}
              style={styles.textInput}
              keyboardType="numeric"
              _focus={{
                borderColor: colors.green,
              }}
            />
            <Input
              ref={pinRef3}
              onChangeText={(value) => {
                setVerificationPins((prevState) => ({
                  ...prevState,
                  pin3: value,
                }));
              }}
              value={verificationPins.pin3}
              maxLength={1}
              style={styles.textInput}
              keyboardType="numeric"
              _focus={{
                borderColor: colors.green,
              }}
            />
            <Input
              ref={pinRef4}
              onChangeText={(value) => {
                setVerificationPins((prevState) => ({
                  ...prevState,
                  pin4: value,
                }));
              }}
              value={verificationPins.pin4}
              maxLength={1}
              style={styles.textInput}
              keyboardType="numeric"
              _focus={{
                borderColor: colors.green,
              }}
            />
            <Input
              ref={pinRef5}
              onChangeText={(value) => {
                setVerificationPins((prevState) => ({
                  ...prevState,
                  pin5: value,
                }));
              }}
              value={verificationPins.pin5}
              maxLength={1}
              style={styles.textInput}
              keyboardType="numeric"
              _focus={{
                borderColor: colors.green,
              }}
            />
            <Input
              ref={pinRef6}
              onChangeText={(value) => {
                setVerificationPins((prevState) => ({
                  ...prevState,
                  pin6: value,
                }));
              }}
              value={verificationPins.pin6}
              maxLength={1}
              style={styles.textInput}
              keyboardType="numeric"
              _focus={{
                borderColor: colors.green,
              }}
            />
          </HStack>
          <Box py="4">
            <Input
              width="100%"
              value={newPassword}
              onChangeText={setNewPassword}
              borderRadius="full"
              placeholder="new password"
              placeholderTextColor="coolGray.400"
              borderColor="coolGray.200"
              type="password"
              _focus={{
                borderColor: colors.green,
              }}
              p="4"
              mb="5"
              InputRightElement={
                <Icon
                  as={<MaterialIcons name="visibility" />}
                  size={18}
                  mr="3"
                  color="muted.400"
                />
              }
            />
            <Input
              width="100%"
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
              borderRadius="full"
              placeholderTextColor="coolGray.400"
              borderColor="coolGray.200"
              placeholder="confirm password"
              p="4"
              mb="5"
              type="password"
              _focus={{
                borderColor: colors.green,
              }}
              InputRightElement={
                <Icon
                  as={<MaterialIcons name="visibility" />}
                  size={18}
                  mr="3"
                  color="muted.400"
                />
              }
            />
          </Box>
        </Box>
        <Box width="100%" justifyContent="flex-end">
          {!loading ? (
            <Pressable
              onPress={forgotPasswordSubmit}
              backgroundColor={colors.green}
              borderRadius="full"
              alignItems="center"
              height="50px"
              justifyContent="center"
            >
              <Text fontSize="md" fontWeight="600" color={buttonContrast}>
                Reset Password
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

const styles = StyleSheet.create({
  textInput: {
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 5,
    borderWidth: 0.5,
    fontSize: 20,
    fontWeight: "600",
    height: 55,
    justifyContent: "center",
    textAlign: "center",
    width: "13%",
  },
});
