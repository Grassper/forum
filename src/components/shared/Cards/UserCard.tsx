import { Entypo } from "@expo/vector-icons";
import { Box, HStack, Pressable, Text } from "native-base";
import React from "react";
import { SvgUri } from "react-native-svg";

interface UserCard_ {
  id: string;
  username: string;
  avatarUrl: string;
}

export const UserCard: React.FC<UserCard_> = ({ username, avatarUrl }) => {
  return (
    <Box>
      <Pressable onPress={() => {}} bg="white">
        <HStack alignItems="center" justifyContent="space-between" mb="4">
          <HStack space={3} alignItems="center">
            {/* <Avatar
              bg="green.500"
              size="md"
              source={{
                uri: avatarUrl,
              }}
            >
              <Text
                fontSize="md"
                fontFamily="body"
                fontWeight="600"
                color="white"
              >
                {username.charAt(0).toUpperCase() || "Ef"}
              </Text>
            </Avatar> */}
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
