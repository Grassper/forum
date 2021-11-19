import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Avatar, Box, HStack, Pressable, Text } from "native-base";
import React from "react";
import { SvgUri } from "react-native-svg";

import { RootStackParamList } from "@/root/src/components/navigations/StackNavigator";

type NavigationProp_ = StackNavigationProp<RootStackParamList>;

interface FollowCard_ {
  id: string;
  username: string;
  avatarUrl: string;
}

export const FollowCard: React.FC<FollowCard_> = ({ username, avatarUrl }) => {
  const navigation = useNavigation<NavigationProp_>();

  return (
    <Pressable
      onPress={() => {
        navigation.push("Profile", { userId: "2" }); // pass user id here of follow card user example: 2
      }}
    >
      <Box alignItems="center" bg="white">
        <Box width="90%">
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
        </Box>
      </Box>
    </Pressable>
  );
};
