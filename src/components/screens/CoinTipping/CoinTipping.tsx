import { GraphQLResult } from "@aws-amplify/api-graphql";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { API } from "aws-amplify";
import {
  Box,
  Flex,
  FormControl,
  Input,
  Pressable,
  Spinner,
  Text,
  useContrastText,
  VStack,
  WarningOutlineIcon,
} from "native-base";
import React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { SvgUri } from "react-native-svg";
import isLength from "validator/es/lib/isLength";
import xssFilters from "xss-filters";

import {
  RootStackParamList_,
  StackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { Skeleton } from "@/root/src/components/shared/Skeleton";
import { colors } from "@/root/src/constants";
import { UserContext } from "@/root/src/context";

type NavigationProp_ = CompositeNavigationProp<
  StackNavigationProp<StackParamList_, "Tipping">,
  StackNavigationProp<RootStackParamList_, "Application">
>;

type RouteProp_ = RouteProp<StackParamList_, "Tipping">;

interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}

export const CoinTipping: React.FC<Props_> = ({ route, navigation }) => {
  const [amount, setAmount] = React.useState("");
  const [reason, setReason] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isAmountValid, setAmountValid] = React.useState(false);
  const [amountErrorMsg, setAmountErrorMsg] = React.useState("");

  const [isReasonValid, setReasonValid] = React.useState(false);
  const [reasonErrorMsg, setReasonErrorMsg] = React.useState("");

  const { profileImageUrl, username, id } = route.params;

  const currentUser = React.useContext(UserContext).user;

  const setCurrentUser = React.useContext(UserContext).updateUser;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Text>{currentUser.coins}</Text>,
    });
  }, [currentUser.coins, navigation]);

  React.useEffect(() => {
    const validateAmount = () => {
      if (
        Number(amount) < 1000 &&
        Number(amount) > 0 &&
        Number(amount) <= currentUser.coins
      ) {
        setAmountValid(true);
        setAmountErrorMsg("");
      } else {
        setAmountValid(false);
        if (Number(amount) > currentUser.coins) {
          setAmountErrorMsg("Insufficient funds");
        } else {
          setAmountErrorMsg("Max Coin 999 Ef");
        }
      }
    };
    validateAmount();
  }, [amount, currentUser.coins]);

  React.useEffect(() => {
    const ValidateReason = () => {
      if (isLength(reason, { min: 0, max: 25 })) {
        setReasonValid(true);
        setReasonErrorMsg("");
      } else {
        setReasonValid(false);
        setReasonErrorMsg("Max 25 alphanumeric chars");
      }
    };
    ValidateReason();
  }, [reason]);

  const onPress = async () => {
    if (isAmountValid && isReasonValid) {
      setLoading(true);
      const TippingInput: tippingHandlerInput_ = {
        fromUserId: currentUser.id,
        toUserId: id,
        amount: Number(amount),
        reason: reason,
      };

      const userInfo = await tippingHandler(TippingInput);
      if (userInfo) {
        setCurrentUser({ ...currentUser, coins: userInfo.coins });
        navigation.navigate({
          name: "Profile",
          params: { userId: id },
          merge: true,
        });
      }
      setLoading(false);
    }
  };

  const sanitizeReason = (text: string) => {
    setReason(xssFilters.inHTMLData(text));
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
                _focus={{
                  borderColor: "transparent",
                }}
                autoCapitalize="none"
                borderColor="transparent"
                color={useContrastText("light.100")}
                keyboardType="number-pad"
                maxLength={3}
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
                  onChangeText={sanitizeReason}
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
            {!loading ? (
              <Pressable
                alignItems="center"
                bg={isAmountValid ? colors.green : "muted.400"}
                borderRadius="full"
                height="50px"
                justifyContent="center"
                onPress={onPress}
              >
                <Text color="white" fontSize="md" fontWeight="600">
                  Proceed to Pay
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
  container: { flex: 1 },
  input: { fontSize: 28 },
});

/**
 * Tipping- show coin balance
 * Todo-1: if succeed show the completed gif or something
 */

interface tippingHandlerInput_ {
  fromUserId: string;
  toUserId: string;
  amount: number;
  reason: string;
}

const tippingHandler = async (input: tippingHandlerInput_) => {
  try {
    const response = (await API.graphql({
      query: createTransaction,
      variables: input,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<createTransaction_>;

    if (response.data) {
      return response.data.tippingHandler;
    }
  } catch (err) {
    console.error("Error occured while tipping user", JSON.stringify(err));
  }
};

type createTransaction_ = {
  tippingHandler: { id: string; coins: number; username: string };
};

const createTransaction = /* GraphQL */ `
  mutation createTransaction(
    $fromUserId: ID!
    $amount: Int!
    $toUserId: ID!
    $reason: String
  ) {
    tippingHandler(
      amount: $amount
      fromUserId: $fromUserId
      toUserId: $toUserId
      reason: $reason
    ) {
      id
      coins
      username
    }
  }
`;
