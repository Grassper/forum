import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Auth } from "aws-amplify";
import {
  Box,
  Flex,
  HStack,
  Input,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  useContrastText,
  VStack,
} from "native-base";
import React from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
} from "react-native";

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
    <Box alignItems="center" bg="white" height="100%">
      <VStack
        height="100%"
        justifyContent="space-between"
        safeAreaY
        width="90%"
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Box alignItems="flex-end" pt="2">
            <Pressable onPress={() => navigation.navigate("SignIn")}>
              <Text color="eGreen.400" fontWeight="600">
                Help
              </Text>
            </Pressable>
          </Box>
          <Text
            color={colors.black}
            fontFamily="heading"
            fontSize="2xl"
            fontWeight="medium"
            py="2"
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
            <HStack alignItems="center" justifyContent="center">
              <Text fontSize="xs">Didn't Receive code?</Text>
              <Pressable onPress={resendConfirmationCode}>
                <Text color="eGreen.400" fontSize="xs" ml="1">
                  Resend
                </Text>
              </Pressable>
            </HStack>
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
                backgroundColor={colors.green}
                borderRadius="full"
                height="50px"
                justifyContent="center"
                onPress={confirmSignUp}
              >
                <Text color={buttonContrast} fontSize="md" fontWeight="600">
                  Verify
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
