import { Ionicons } from "@expo/vector-icons";
import {
  Avatar,
  Box,
  Divider,
  HStack,
  Icon,
  Pressable,
  Spacer,
  Text,
  VStack,
} from "native-base";
import React from "react";

interface Props_ {
  onPress?: () => void;
  hideDivider?: boolean;
  hideMembers?: boolean;
  hideFavorites?: boolean;
}

export const CommunityTile: React.FC<Props_> = ({
  hideDivider,
  hideMembers,
  hideFavorites,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress}>
      <Box alignItems="center" bg="white" py="4">
        <Box width="90%">
          <HStack alignItems="center" space={3}>
            <Avatar
              bg="green.500"
              size="40px"
              source={{
                uri: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
              }}
            >
              <Text
                fontSize="sm"
                fontFamily="body"
                fontWeight="600"
                color="white"
              >
                {"sujitha".charAt(0).toUpperCase() || "Ef"}
              </Text>
            </Avatar>
            <VStack>
              <Text
                color="coolGray.800"
                _dark={{ color: "warmGray.50" }}
                fontWeight="500"
              >
                e/Mechkeys
              </Text>
              {!hideMembers && (
                <Text
                  color="coolGray.600"
                  _dark={{ color: "warmGray.200" }}
                  fontSize="xs"
                >
                  1.6M Members
                </Text>
              )}
            </VStack>
            <Spacer />
            {!hideFavorites && (
              <HStack space="4">
                <Icon
                  as={<Ionicons name="bookmark-outline" />}
                  size={"20px"}
                  color="black"
                />
              </HStack>
            )}
          </HStack>
        </Box>
      </Box>
      {!hideDivider && <Divider />}
    </Pressable>
  );
};
