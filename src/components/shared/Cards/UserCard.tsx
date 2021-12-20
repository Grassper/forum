import { Entypo } from "@expo/vector-icons";
import { Box, HStack, Pressable, Text } from "native-base";
import React from "react";
import { SvgUri } from "react-native-svg";

interface UserCard_ {
  id: string;
  username: string;
  avatarUrl: string;
  onPress: () => void;
}

export const UserCard: React.FC<UserCard_> = ({
  username,
  avatarUrl,
  onPress,
}) => {
  return (
    <Box>
      <Pressable bg="white" onPress={onPress}>
        <HStack alignItems="center" justifyContent="space-between" mb="4">
          <HStack alignItems="center" space={3}>
            <Box
              bg="amber.100"
              borderRadius="full"
              height="40px"
              overflow="hidden"
              width="40px"
            >
              <SvgUri height="100%" uri={avatarUrl} width="100%" />
            </Box>
            <Text
              color="muted.900"
              fontFamily="body"
              fontSize="sm"
              fontWeight="500"
            >
              {username}
            </Text>
          </HStack>
          <Entypo color="black" name="chevron-small-right" size={24} />
        </HStack>
      </Pressable>
    </Box>
  );
};
