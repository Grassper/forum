import { Entypo } from "@expo/vector-icons";
import { Box, HStack, Pressable, Text } from "native-base";
import React from "react";
import { SvgUri } from "react-native-svg";

import { Skeleton } from "@/root/src/components/shared/Skeleton";

interface FollowCard_ {
  id?: string;
  username?: string;
  avatarUrl?: string;
  onPress?: () => void;
}

export const FollowCard: React.FC<FollowCard_> = ({
  username,
  id,
  onPress,
  avatarUrl,
}) => {
  return (
    <Pressable onPress={onPress}>
      <Box alignItems="center" bg="white">
        <Box width="90%">
          <HStack alignItems="center" justifyContent="space-between" mb="4">
            <HStack alignItems="center" space={3}>
              {avatarUrl ? (
                <Box
                  bg="amber.100"
                  borderRadius="full"
                  height="40px"
                  overflow="hidden"
                  width="40px"
                >
                  <SvgUri height="100%" uri={avatarUrl} width="100%" />
                </Box>
              ) : (
                <Skeleton borderRadius="full" height="40px" width="40px" />
              )}
              {username ? (
                <Text
                  color="muted.900"
                  fontFamily="body"
                  fontSize="sm"
                  fontWeight="500"
                >
                  {username}
                </Text>
              ) : (
                <Skeleton height="20px" width="80%" />
              )}
            </HStack>
            {id && (
              <Entypo color="black" name="chevron-small-right" size={24} />
            )}
          </HStack>
        </Box>
      </Box>
    </Pressable>
  );
};
