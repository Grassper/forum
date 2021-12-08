import { GraphQLResult } from "@aws-amplify/api-graphql";
import { FontAwesome } from "@expo/vector-icons";
import { API } from "aws-amplify";
import { Box, Flex, Icon, Input, Pressable } from "native-base";
import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

import { UserContext } from "@/root/src/context";

interface Props_ {
  onFocus: () => void;
  chatRoomId: string;
}

export const InputField: React.FC<Props_> = ({ onFocus, chatRoomId }) => {
  const [message, setMessage] = React.useState("");
  const currentUser = React.useContext(UserContext).user;

  const handleSubmitMessage = async () => {
    if (message) {
      const messageInput = {
        content: message,
        chatRoomId,
        userId: currentUser.id,
      };

      await createMessageFetch(messageInput);

      setMessage("");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={60}
    >
      <Box bg="transparent" py="1" justifyContent="center" safeAreaBottom>
        <Flex
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          bgColor="transparent"
        >
          <Input
            bg="white"
            p="3"
            width="80%"
            multiline
            value={message}
            onChangeText={setMessage}
            borderRadius="md"
            placeholder="Type here.."
            placeholderTextColor="muted.400"
            fontSize="sm"
            variant="unstyled"
            onFocus={onFocus}
          />
          <Pressable onPress={handleSubmitMessage}>
            <Flex
              bg="eGreen.400"
              width="10"
              ml="2"
              height="10"
              alignItems="center"
              justifyContent="center"
              borderRadius="full"
            >
              <Icon as={<FontAwesome name="send" />} size={4} color="white" />
            </Flex>
          </Pressable>
        </Flex>
      </Box>
    </KeyboardAvoidingView>
  );
};

/**
 * grapql schemas and type
 */

interface createMessageFetch_ {
  content: string;
  chatRoomId: string;
  userId: string;
}

const createMessageFetch = async (input: createMessageFetch_) => {
  try {
    const createdMessageResponseData = (await API.graphql({
      query: createMessage,
      variables: { input },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<createMessage_>;

    if (createdMessageResponseData.data?.createMessage) {
      return createdMessageResponseData.data?.createMessage.id;
    }
  } catch (err) {
    console.error("Error occured while creating message", err);
  }
};

/**
 * Todo-2: create message handler
 */

interface createMessage_ {
  createMessage?: {
    id: string;
  };
}

const createMessage = /* GraphQL */ `
  mutation createMessage($input: CreateMessageInput!) {
    createMessage(input: $input) {
      id
    }
  }
`;
