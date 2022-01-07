import {
  Box,
  FormControl,
  Input,
  Pressable,
  Text,
  useContrastText,
  VStack,
  WarningOutlineIcon,
} from "native-base";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
} from "react-native";
import { SvgUri } from "react-native-svg";
import isLength from "validator/es/lib/isLength";
import matches from "validator/es/lib/matches";

import { Skeleton } from "@/root/src/components/shared/Skeleton";
import { colors } from "@/root/src/constants";
import { UserContext } from "@/root/src/context";

interface Props_ {}

export const CoinTipping: React.FC<Props_> = () => {
  const [amount, setAmount] = React.useState("0");
  const [reason, setReason] = React.useState("");
  const inputRef: React.RefObject<TextInput> = React.createRef();

  const [isAmountValid, setAmountValid] = React.useState(false);
  const [amountErrorMsg, setAmountErrorMsg] = React.useState("");

  const [isReasonValid, setReasonValid] = React.useState(false);
  const [reasonErrorMsg, setReasonErrorMsg] = React.useState("");

  React.useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const {
    user: { profileImageUrl, username },
  } = React.useContext(UserContext);

  React.useEffect(() => {
    const validateAmount = () => {
      if (Number(amount) < 1000 && Number(amount) !== 0) {
        setAmountValid(true);
        setAmountErrorMsg("");
      } else {
        setAmountValid(false);
        setAmountErrorMsg("Max Coin 999 Ef");
      }
    };
    validateAmount();
  }, [amount]);

  React.useEffect(() => {
    const ValidateReason = () => {
      if (
        isLength(reason, { min: 0, max: 25 }) &&
        matches(reason, "^[A-Za-z0-9 _|.,!]{0,25}$", "m")
      ) {
        setReasonValid(true);
        setReasonErrorMsg("");
      } else {
        setReasonValid(false);
        setReasonErrorMsg("Max 25 alphanumeric chars");
      }
    };
    ValidateReason();
  }, [reason]);

  const tippingHandler = () => {
    console.log("tipping handler pressed");
  };

  return (
    <Box alignItems="center" bg="white" height="100%" style={styles.container}>
      <VStack
        alignItems="center"
        height="100%"
        justifyContent="space-between"
        safeAreaY
        width="90%"
      >
        <VStack alignItems="center" direction="column">
          <Box
            bg={profileImageUrl ? "amber.100" : "transparent"}
            borderRadius="full"
            height="80px"
            mb="10px"
            overflow="hidden"
            width="80px"
          >
            {profileImageUrl ? (
              <SvgUri height="100%" uri={profileImageUrl} width="100%" />
            ) : (
              <Skeleton height="100%" width="100%" />
            )}
          </Box>
          <Box>
            {username ? (
              <Text fontFamily="heading" fontSize="md" mb="5px">
                Tipping to {username}
              </Text>
            ) : (
              <Skeleton height="20px" mb="5px" width="150px" />
            )}
          </Box>
          <Box alignItems="center" justifyContent="center" mt="5">
            <FormControl isInvalid={!isAmountValid} isRequired>
              <Input
                ref={inputRef}
                _focus={{
                  borderColor: "transparent",
                }}
                autoCapitalize="none"
                borderColor="transparent"
                color={useContrastText("light.100")}
                keyboardType="number-pad"
                minWidth="100"
                onChangeText={setAmount}
                p="1"
                placeholder="0 Ef"
                placeholderTextColor="muted.400"
                style={styles.input}
                textAlign="center"
                width="100%"
              >
                {amount.toLocaleString()}
              </Input>
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {amountErrorMsg}
              </FormControl.ErrorMessage>
            </FormControl>
            <Box mt="5">
              <FormControl isInvalid={!isReasonValid}>
                <Input
                  bg="coolGray.100"
                  borderRadius="md"
                  fontSize="sm"
                  maxLength={25}
                  minWidth={150}
                  onChangeText={setReason}
                  p="4"
                  placeholder="Reason"
                  placeholderTextColor="muted.400"
                  textAlign="center"
                  value={reason}
                  variant="unstyled"
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  {reasonErrorMsg}
                </FormControl.ErrorMessage>
              </FormControl>
            </Box>
          </Box>
        </VStack>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={100}
        >
          <Box justifyContent="flex-end" minWidth="200" width="100%">
            <Pressable
              alignItems="center"
              bg={isAmountValid ? colors.green : "muted.400"}
              borderRadius="full"
              height="50px"
              justifyContent="center"
              onPress={tippingHandler}
            >
              <Text color="white" fontSize="md" fontWeight="600">
                Proceed to Pay
              </Text>
            </Pressable>
          </Box>
        </KeyboardAvoidingView>
      </VStack>
    </Box>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
  input: { fontSize: 28 },
});

/**
 * Todo-2: tipping icon
 * Todo-2: get username, profileImg, UserId from props
 * Todo-2: lamba function
 */
