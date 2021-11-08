import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Avatar, Box, HStack, Icon, Text } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

export const PostCard: React.FC = () => {
  return (
    <Box bg="white" alignItems="center" py="2" mb="2">
      <Box width="90%">
        <HStack alignItems="center" justifyContent="space-between" mb="3">
          <HStack alignItems="center" space="3">
            <Avatar
              bg="green.500"
              width="38"
              height="38"
              source={{
                uri: "https://avatars.dicebear.com/api/adventurer/your-custodadm-seed.svg",
              }}
            >
              <Text
                fontSize="sm"
                fontFamily="body"
                fontWeight="600"
                color="white"
              >
                Dk
              </Text>
            </Avatar>
            <Box>
              <Text>Mr.Keys</Text>
              <HStack alignItems="center">
                <Text fontSize="xs" color="blueGray.500">
                  in e/MechKeys
                </Text>
                <Box bg="blueGray.500" style={styles.separatorDot} />
                <Text fontSize="xs" color="blueGray.500">
                  Nov 30
                </Text>
              </HStack>
            </Box>
          </HStack>
          <Icon
            as={<Ionicons name="ellipsis-vertical" />}
            size={5}
            color="muted.500"
          />
        </HStack>
        <Text mb="4">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque
        </Text>
        {/**
         * User actions section
         */}
        <Box>
          <HStack alignItems="center" justifyContent="space-between">
            <HStack space="3" alignItems="center">
              <Icon
                as={<FontAwesome name="heart-o" />}
                size={5}
                color="muted.500"
              />
              <Icon
                as={<Ionicons name="chatbubble-outline" />}
                size={5}
                color="muted.500"
              />
            </HStack>
            <Icon
              as={<Ionicons name="share-outline" />}
              size={5}
              color="muted.500"
            />
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  separatorDot: {
    borderRadius: 50,
    height: 2.5,
    marginHorizontal: 5,
    width: 2.5,
  },
});
