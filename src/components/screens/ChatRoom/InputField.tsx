import { GraphQLResult } from "@aws-amplify/api-graphql";
import { Feather } from "@expo/vector-icons";
import { API } from "aws-amplify";
import {
  Box,
  Flex,
  HStack,
  Icon,
  Input,
  Pressable,
  Spinner,
} from "native-base";
import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

import { UserContext } from "@/root/src/context";

interface Props_ {
  chatRoomId: string;
}

export const InputField: React.FC<Props_> = ({ chatRoomId }) => {
  const [message, setMessage] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const currentUser = React.useContext(UserContext).user;

  const handleSubmitMessage = async () => {
    setSending(true);
    if (message) {
      const messageInput = {
        content: message,
        chatRoomId,
        userId: currentUser.id,
      };

      await createMessageFetch(messageInput);

      setMessage("");
    }
    setSending(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={60}
    >
      <Box bg="transparent" justifyContent="center" py="1" safeAreaBottom>
        <HStack
          alignItems="center"
          bgColor="transparent"
          justifyContent="center"
        >
          <Input
            bg="white"
            borderRadius="md"
            fontSize="sm"
            multiline
            onChangeText={setMessage}
            p="3"
            placeholder="Type here.."
            placeholderTextColor="muted.400"
            value={message}
            variant="unstyled"
            width="80%"
          />
          <Pressable onPress={!sending ? handleSubmitMessage : () => {}}>
            <Flex
              alignItems="center"
              bg="eGreen.400"
              borderRadius="full"
              height="10"
              justifyContent="center"
              ml="2"
              width="10"
            >
              {!sending ? (
                <Icon as={<Feather name="send" />} color="white" size={4} />
              ) : (
                <Spinner color="white" />
              )}
            </Flex>
          </Pressable>
        </HStack>
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
    content: string;
    chatRoomId: string;
    userId: string;
    createdAt: string;
  };
}

const createMessage = /* GraphQL */ `
  mutation createMessage($input: CreateMessageInput!) {
    createMessage(input: $input) {
      id
      content
      chatRoomId
      userId
      createdAt
    }
  }
`;
