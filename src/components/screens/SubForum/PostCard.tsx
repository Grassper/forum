import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Video } from "expo-av";
import { Avatar, Box, HStack, Icon, Image, Pressable, Text } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

import { colors } from "@/root/src/constants";

export interface Props_ {
  id: string;
  type: "Image" | "Text" | "Video";
  username: string;
  avatarUrl: string;
  subForum: string;
  timeStamp: string;
  contentText: string;
  mediaUrl?: string;
}

export const PostCard: React.FC<Props_> = ({
  username,
  subForum,
  timeStamp,
  avatarUrl,
  type,
  mediaUrl,
  contentText,
}) => {
  const videoRef = React.useRef(null);

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
       * video post
       */}
      {type === "Video" && mediaUrl && (
        <Box mb="4" width="100%">
          <Video
            ref={videoRef}
            style={styles.video}
            source={{
              uri: mediaUrl,
            }}
            useNativeControls
            resizeMode="cover"
          />
        </Box>
      )}
      {/**
       * image post
       */}
      {type === "Image" && mediaUrl && (
        <Image
          width="100%"
          height="350"
          alt="fallback text"
          source={{
            uri: mediaUrl,
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
  video: {
    backgroundColor: colors.black,
    height: 200,
  },
});
