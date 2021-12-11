import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Auth } from "aws-amplify";
import {
  Box,
  Flex,
  HStack,
  Input,
  Pressable,
  Spinner,
  Text,
  useContrastText,
  VStack,
} from "native-base";
import React from "react";
import { Alert, StyleSheet, TextInput } from "react-native";

import { AuthStackParamList_ } from "@/root/src/components/navigations/Navigation";
import { colors } from "@/root/src/constants";

type RouteProp_ = RouteProp<AuthStackParamList_, "Verification">;

type NavigationProp_ = StackNavigationProp<AuthStackParamList_, "Verification">;
interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}
export const Verification: React.FC<Props_> = ({ navigation, route }) => {
  const userName = route.params.username;
  const email = route.params.email;
  const [loading, setLoading] = React.useState(false);

  const pinRef1: React.RefObject<TextInput> = React.createRef();
  const pinRef2: React.RefObject<TextInput> = React.createRef();
  const pinRef3: React.RefObject<TextInput> = React.createRef();
  const pinRef4: React.RefObject<TextInput> = React.createRef();
  const pinRef5: React.RefObject<TextInput> = React.createRef();
  const pinRef6: React.RefObject<TextInput> = React.createRef();
  const buttonContrast = useContrastText("green.500");

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
    } else {
      pinRef1.current?.focus();
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
  }, [pinRef1, pinRef2, pinRef3, pinRef4, pinRef5, pinRef6, verificationPins]);

  const confirmSignUp = async () => {
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
      try {
        setLoading(true);
        await Auth.confirmSignUp(userName, code);
        setLoading(false);
        navigation.navigate("SignIn");
      } catch (error) {
        //@ts-ignore
        Alert.alert(error.message);
      }
    } else {
      Alert.alert("Pins fields shouldn't be empty");
    }
  };

  const resendConfirmationCode = async () => {
    try {
      await Auth.resendSignUp(userName);
      Alert.alert("code resent succeed");
    } catch (err) {
      console.log("error resending code: ", err);
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
                Help
              </Text>
            </Pressable>
          </Box>
          <Text
            fontSize="2xl"
            py="2"
            fontWeight="medium"
            color={colors.black}
            fontFamily="heading"
          >
            Verification Code
          </Text>
          <Box py="3">
            <Text>We've sent a 6-digit verification code to </Text>
            <Text color="eGreen.400">{email}</Text>
          </Box>

          <Box>
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
                _focus={{
                  borderColor: colors.green,
                }}
                style={styles.textInput}
                keyboardType="numeric"
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
                _focus={{
                  borderColor: colors.green,
                }}
                style={styles.textInput}
                keyboardType="numeric"
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
                _focus={{
                  borderColor: colors.green,
                }}
                style={styles.textInput}
                keyboardType="numeric"
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
                _focus={{
                  borderColor: colors.green,
                }}
                style={styles.textInput}
                keyboardType="numeric"
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
                _focus={{
                  borderColor: colors.green,
                }}
                style={styles.textInput}
                keyboardType="numeric"
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
                _focus={{
                  borderColor: colors.green,
                }}
                maxLength={1}
                style={styles.textInput}
                keyboardType="numeric"
              />
            </HStack>
            <HStack justifyContent="center" alignItems="center">
              <Text fontSize="xs">Didn't Receive code?</Text>
              <Pressable onPress={resendConfirmationCode}>
                <Text color="eGreen.400" fontSize="xs" ml="1">
                  Resend
                </Text>
              </Pressable>
            </HStack>
          </Box>
        </Box>
        <Box width="100%" justifyContent="flex-end">
          {!loading ? (
            <Pressable
              onPress={confirmSignUp}
              backgroundColor={colors.green}
              borderRadius="full"
              justifyContent="center"
              alignItems="center"
              height="50px"
            >
              <Text fontSize="md" fontWeight="600" color={buttonContrast}>
                Verify
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
