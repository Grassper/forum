import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { API } from "aws-amplify";
import { Box, HStack, Pressable, Text } from "native-base";
import React from "react";
import { SvgUri } from "react-native-svg";

interface UserCard_ {
  id: string;
  username: string;
  avatarUrl: string;
}

export const UserCard: React.FC<UserCard_> = ({ id, username, avatarUrl }) => {
  const navigation = useNavigation();
  const createChatRoomFunc = async () => {
    try {
      await API.graphql({
        query: createChatRoom,
        variables: { input: { id: id } },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      navigation.navigate("StackNav", {
        screen: "ChatRoom",
        params: {
          title: username,
          imageUri: avatarUrl,
          roomId: id,
        },
      });
    } catch (err) {
      console.error("error while creating chatroom", err);
    }
  };
  return (
    <Box>
      <Pressable onPress={createChatRoomFunc} bg="white">
        <HStack alignItems="center" justifyContent="space-between" mb="4">
          <HStack space={3} alignItems="center">
            <Box
              width="40px"
              height="40px"
              bg="amber.100"
              borderRadius="full"
              overflow="hidden"
            >
              <SvgUri uri={avatarUrl} width="100%" height="100%" />
            </Box>
            <Text
              fontSize="sm"
              fontFamily="body"
              fontWeight="500"
              color="muted.900"
            >
              {username}
            </Text>
          </HStack>
          <Entypo name="chevron-small-right" size={24} color="black" />
        </HStack>
      </Pressable>
    </Box>
  );
};

/**
 * graphql queries and their types
 * types pattern {queryName}_
 * * note dash(_) at the end of type name
 * order 1.queryType 2.graphql query
 */

interface createChatRoom_ {
  createChatRoom: CreateChatRoom;
}

interface CreateChatRoom {
  id: string;
  owner: string;
}

const createChatRoom = /* GraphQL */ `
  mutation createChatRoom($condition: ModelChatRoomConditionInput, $id: ID) {
    createChatRoom(input: { id: $id }, condition: $condition) {
      id
      owner
    }
  }
`;
