import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Avatar, Box, HStack, Icon, Image, Pressable, Text } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

export interface Props_ {
  id: string;
  type: "Image" | "Text" | "Video" | "Audio";
  username: string;
  avatarUrl: string;
  subForum: string;
  timeStamp: string;
  contentText: string;
  imageUrl?: string;
  videoUrl?: string;
  audioUrl?: string;
}

export const PostCard: React.FC<Props_> = ({
  username,
  subForum,
  timeStamp,
  avatarUrl,
  type,
  imageUrl,
  contentText,
}) => {
  return (
    <Box bg="white" alignItems="center" py="4" mb="2">
      <Box width="90%">
        <HStack alignItems="center" justifyContent="space-between" mb="3">
          <HStack alignItems="center" space="3">
            <Avatar
              bg="green.500"
              width="38"
              height="38"
              source={{
                uri: avatarUrl,
              }}
            >
              <Text
                fontSize="sm"
                fontFamily="body"
                fontWeight="600"
                color="white"
              >
                {username.charAt(0).toUpperCase() || "Ef"}
              </Text>
            </Avatar>
            <Box>
              <Text fontWeight="500">{username}</Text>
              <HStack alignItems="center">
                <Text fontSize="xs" color="blueGray.500">
                  in e/{subForum}
                </Text>
                <Box bg="blueGray.500" style={styles.separatorDot} />
                <Text fontSize="xs" color="blueGray.500">
                  {timeStamp}
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
      </Box>
      {/**
       * text and image post
       */}
      {type === "Image" && imageUrl && (
        <Image
          width="100%"
          height="200"
          alt="fallback text"
          source={{
            uri: imageUrl,
          }}
          mb="4"
        />
      )}
      {/**
       * text only post
       */}
      <Box width="90%">
        <Text mb="4">{contentText}</Text>
        {/**
         * User actions section
         */}
        <Box>
          <HStack alignItems="center" justifyContent="space-between">
            <HStack space="3" alignItems="center">
              <Pressable onPress={() => {}}>
                <Icon
                  as={<FontAwesome name="heart-o" />}
                  size={5}
                  color="muted.500"
                />
              </Pressable>
              <Pressable onPress={() => {}}>
                <Icon
                  as={<Ionicons name="chatbubble-outline" />}
                  size={5}
                  color="muted.500"
                />
              </Pressable>
            </HStack>
            <Pressable onPress={() => {}}>
              <Icon
                as={<Ionicons name="share-outline" />}
                size={5}
                color="muted.500"
              />
            </Pressable>
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
