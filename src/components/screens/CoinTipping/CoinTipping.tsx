import {
  Box,
  Button,
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
import React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { SvgUri } from "react-native-svg";

import { Skeleton } from "@/root/src/components/shared/Skeleton";
import { colors } from "@/root/src/constants";

interface Props_ {}
export const CoinTipping: React.FC<Props_> = () => {
  const [amount, setAmount] = React.useState("");
  const [message, setMessage] = React.useState("");

  return (
    <Box alignItems="center" bg="white" height="100%" style={styles.container}>
      <VStack
        alignItems="center"
        height="100%"
        justifyContent="space-between"
        safeAreaY
        width="90%"
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Flex alignItems="center" direction="column" mt="10">
            <Box
              bg="amber.100"
              borderRadius="full"
              height="100px"
              mb="10px"
              overflow="hidden"
              width="100px"
            >
              <SvgUri
                height="100%"
                uri={
                  "https://avatars.dicebear.com/api/adventurer/your-custom-giriseed.svg"
                }
                width="100%"
              />
            </Box>
            <Text
              alignItems="center"
              bg="muted.100"
              fontSize="xl"
              minHeight="50px"
              mt="4"
              mx="3"
            >
              Test user
            </Text>
            <Box alignItems="center" justifyContent="center" py="5">
              <Flex alignItems="center" direction="row" justifyContent="center">
                <Text
                  alignItems="center"
                  bg="muted.100"
                  fontSize="xl"
                  minHeight="50px"
                  mt="4"
                  mx="3"
                >
                  $
                </Text>
                <Box>
                  <Input
                    _focus={{
                      borderColor: "transparent",
                    }}
                    autoCapitalize="none"
                    borderBottomColor={colors.green}
                    borderColor="transparent"
                    color={useContrastText("light.100")}
                    keyboardType="number-pad"
                    minWidth="100"
                    onChangeText={setAmount}
                    p="1"
                    placeholder="0"
                    placeholderTextColor="coolGray.400"
                    style={styles.input}
                    value={amount}
                    width="100%"
                  />
                </Box>
              </Flex>
              <Box>
                <Input
                  borderColor={colors.green}
                  borderRadius="full"
                  borderWidth="1"
                  fontSize="sm"
                  maxLength={140}
                  minWidth={150}
                  mt="2"
                  multiline
                  onChangeText={setMessage}
                  placeholder="Reasons"
                  placeholderTextColor="muted.400"
                  style={styles.message}
                  value={message}
                  variant="unstyled"
                />
              </Box>
            </Box>
          </Flex>
        </ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={60}
        >
          <Box justifyContent="flex-end" minWidth="200" width="100%">
            <Pressable
              alignItems="center"
              bg={colors.green}
              borderRadius="full"
              height="50px"
              justifyContent="center"
              onPress={() => console.log("payMe")}
            >
              <Text color="white" fontSize="md" fontWeight="600">
                Log Me In
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
  input: { fontSize: 40 },
  message: { alignItems: "center" },
});
