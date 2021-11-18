import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Avatar, Box, HStack, Pressable, Text } from "native-base";
import React from "react";

import { MessageRootStackParamList } from "@/root/src/components/navigations/StackNavigator";

type NavigationProp_ = StackNavigationProp<MessageRootStackParamList>;

interface UserCard_ {
  id: string;
  username: string;
  avatarUrl: string;
}

export const UserCard: React.FC<UserCard_> = ({ username, avatarUrl }) => {
  const navigation = useNavigation<NavigationProp_>();

  return (
    <Box>
      <Pressable
        onPress={() =>
          navigation.push("ChatRoom", {
            title: username,
            imageUri:
              "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          })
        }
        bg="white"
      >
        <HStack alignItems="center" justifyContent="space-between" mb="4">
          <HStack space={3} alignItems="center">
            <Avatar
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
            </Avatar>
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
