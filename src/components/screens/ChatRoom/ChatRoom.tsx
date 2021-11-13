import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box, Flex, ScrollView, Text, VStack } from "native-base";
import React from "react";

import { MessageRootStackParamList } from "@/root/src/components/navigations/StackNavigator";

type RouteProp_ = RouteProp<MessageRootStackParamList, "ChatRoom">;

type NavigationProp_ = StackNavigationProp<
  MessageRootStackParamList,
  "ChatRoom"
>;

interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}

interface ChatCard_ {
  align: "left" | "right";
}

const ChatCard: React.FC<ChatCard_> = ({ align }) => {
  return (
    <Box pb="4" alignItems={align === "left" ? "flex-start" : "flex-end"}>
      <Box
        maxWidth="60%"
        px="3"
        pt="2"
        pb="3"
        bg={align === "left" ? "white" : "green.500"}
        borderRadius="5"
      >
        <VStack>
          <Text
            color={align === "left" ? "coolGray.600" : "white"}
            fontWeight="500"
          >
            Hi nice to meet you too. hope soon we can take a project together!
          </Text>
          <Text
            fontSize="xs"
            color={align === "left" ? "coolGray.600" : "white"}
            alignSelf="flex-end"
            mt="1"
          >
            11.30 am
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export const ChatRoom: React.FC<Props_> = () => {
  return (
    <ScrollView>
      <Box alignItems="center">
        <Flex width="90%" pt="4">
          <ChatCard align="right" />
          <ChatCard align="left" />
          <ChatCard align="right" />
        </Flex>
      </Box>
    </ScrollView>
  );
};
