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
  ScrollView,
  Spinner,
  Text,
  useContrastText,
  VStack,
} from "native-base";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
} from "react-native";

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
  const [hideNewPass, setHideNewPass] = React.useState(true);
  const [hideConfirmPass, setHideConfirmPass] = React.useState(true);
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const newPasswordRef: React.RefObject<TextInput> = React.createRef();
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
    <Box alignItems="center" bg="white" height="100%">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={20}
      >
        <VStack
          height="100%"
          justifyContent="space-between"
          safeAreaY
          width="90%"
        >
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
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
                _focus={{
                  borderColor: colors.green,
                }}
                keyboardType="numeric"
                maxLength={1}
                onChangeText={(value) => {
                  setVerificationPins((prevState) => ({
                    ...prevState,
                    pin1: value,
                  }));
                }}
                style={styles.textInput}
                value={verificationPins.pin1}
              />
              <Input
                ref={pinRef2}
                _focus={{
                  borderColor: colors.green,
                }}
                keyboardType="numeric"
                maxLength={1}
                onChangeText={(value) => {
                  setVerificationPins((prevState) => ({
                    ...prevState,
                    pin2: value,
                  }));
                }}
                style={styles.textInput}
                value={verificationPins.pin2}
              />
              <Input
                ref={pinRef3}
                _focus={{
                  borderColor: colors.green,
                }}
                keyboardType="numeric"
                maxLength={1}
                onChangeText={(value) => {
                  setVerificationPins((prevState) => ({
                    ...prevState,
                    pin3: value,
                  }));
                }}
                style={styles.textInput}
                value={verificationPins.pin3}
              />
              <Input
                ref={pinRef4}
                _focus={{
                  borderColor: colors.green,
                }}
                keyboardType="numeric"
                maxLength={1}
                onChangeText={(value) => {
                  setVerificationPins((prevState) => ({
                    ...prevState,
                    pin4: value,
                  }));
                }}
                style={styles.textInput}
                value={verificationPins.pin4}
              />
              <Input
                ref={pinRef5}
                _focus={{
                  borderColor: colors.green,
                }}
                keyboardType="numeric"
                maxLength={1}
                onChangeText={(value) => {
                  setVerificationPins((prevState) => ({
                    ...prevState,
                    pin5: value,
                  }));
                }}
                style={styles.textInput}
                value={verificationPins.pin5}
              />
              <Input
                ref={pinRef6}
                _focus={{
                  borderColor: colors.green,
                }}
                keyboardType="numeric"
                maxLength={1}
                onChangeText={(value) => {
                  setVerificationPins((prevState) => ({
                    ...prevState,
                    pin6: value,
                  }));
                }}
                style={styles.textInput}
                value={verificationPins.pin6}
              />
            </HStack>
            <Box py="4">
              <Input
                ref={newPasswordRef}
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
                        name={hideNewPass ? "visibility-off" : "visibility"}
                      />
                    }
                    color="muted.400"
                    mr="3"
                    onPress={() => setHideNewPass(!hideNewPass)}
                    size={18}
                  />
                }
                mb="5"
                onChangeText={setNewPassword}
                p="4"
                placeholder="Password"
                placeholderTextColor="coolGray.400"
                secureTextEntry={hideNewPass ? true : false}
                type="password"
                value={newPassword}
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
                        name={hideConfirmPass ? "visibility-off" : "visibility"}
                      />
                    }
                    color="muted.400"
                    mr="3"
                    onPress={() => setHideConfirmPass(!hideConfirmPass)}
                    size={18}
                  />
                }
                mb="5"
                onChangeText={setConfirmNewPassword}
                p="4"
                placeholder="Password"
                placeholderTextColor="coolGray.400"
                secureTextEntry={hideConfirmPass ? true : false}
                type="password"
                value={confirmNewPassword}
                width="100%"
              />
            </Box>
          </ScrollView>
          <Box justifyContent="flex-end">
            {!loading ? (
              <Pressable
                alignItems="center"
                backgroundColor={colors.green}
                borderRadius="full"
                height="50px"
                justifyContent="center"
                onPress={forgotPasswordSubmit}
              >
                <Text color={buttonContrast} fontSize="md" fontWeight="600">
                  Reset Password
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
        </VStack>
      </KeyboardAvoidingView>
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
