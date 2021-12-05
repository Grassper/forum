import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Box, HStack, Pressable, Text } from "native-base";
import React from "react";
import { SvgUri } from "react-native-svg";

interface FollowCard_ {
  id: string;
  username: string;
  avatarUrl: string;
  onPress?: () => void;
}

export const FollowCard: React.FC<FollowCard_> = ({
  username,
  id,
  avatarUrl,
}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("ProfileStack", {
          screen: "Profile",
          params: {
            userId: id,
          },
        });
      }}
    >
      <Box alignItems="center" bg="white">
        <Box width="90%">
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
        </Box>
      </Box>
    </Pressable>
  );
};
