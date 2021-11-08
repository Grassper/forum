import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Video } from "expo-av";
import {
  Avatar,
  Box,
  Flex,
  HStack,
  Icon,
  Image,
  Pressable,
  Text,
} from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

import { colors } from "@/root/src/constants";

export interface Props_ {
  id: string;
  type: "Image" | "Text" | "Video" | "Audio" | "Poll";
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
  const [voted, setVoted] = React.useState(false);
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

      <Box width="90%">
        {/**
         * poll post
         */}
        {type === "Poll" && (
          <Box bg="green.50" px="3" py="4" mb="4">
            <Text fontSize="14.5" fontWeight="500" mb="2">
              What is role of day to day software engineering?
            </Text>
            <Box mt="2">
              {/**
               * before user is voted
               */}
              {!voted ? (
                <Box mb="2">
                  <Pressable
                    onPress={() => {
                      setVoted(true);
                    }}
                  >
                    <Flex
                      p="3"
                      py="2"
                      bg="white"
                      mb="2"
                      alignItems="center"
                      borderRadius="5"
                    >
                      <Text fontWeight="500">Front end</Text>
                    </Flex>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setVoted(true);
                    }}
                  >
                    <Flex
                      p="3"
                      py="2"
                      bg="white"
                      mb="2"
                      alignItems="center"
                      borderRadius="5"
                    >
                      <Text fontWeight="500">Back end</Text>
                    </Flex>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setVoted(true);
                    }}
                  >
                    <Flex
                      p="3"
                      py="2"
                      bg="white"
                      mb="2"
                      alignItems="center"
                      borderRadius="5"
                    >
                      <Text fontWeight="500">Infrastructure</Text>
                    </Flex>
                  </Pressable>
                </Box>
              ) : (
                <Box mb="2">
                  {/**
                   * after user is voted
                   */}
                  <Flex
                    p="3"
                    py="2"
                    bg="white"
                    position="relative"
                    overflow="hidden"
                    mb="2"
                    alignItems="flex-start"
                    borderRadius="5"
                  >
                    <Box
                      position="absolute"
                      bg="green.200"
                      height="100"
                      width="12%"
                    />
                    <Text fontWeight="500">Front end</Text>
                  </Flex>
                  <Flex
                    p="3"
                    py="2"
                    bg="white"
                    position="relative"
                    overflow="hidden"
                    mb="2"
                    alignItems="flex-start"
                    borderRadius="5"
                  >
                    <Box
                      position="absolute"
                      bg="green.200"
                      height="100"
                      width="63%"
                    />
                    <Text fontWeight="500">Back end</Text>
                  </Flex>
                  <Flex
                    p="3"
                    py="2"
                    bg="white"
                    position="relative"
                    overflow="hidden"
                    mb="2"
                    alignItems="flex-start"
                    borderRadius="5"
                  >
                    <Box
                      position="absolute"
                      bg="green.200"
                      height="100"
                      width="28%"
                    />
                    <Text fontWeight="500">Infrastructure</Text>
                  </Flex>
                </Box>
              )}
            </Box>
            <Flex flexDirection="row" justifyContent="space-between">
              <HStack alignItems="center">
                <Text fontSize="xs">2832 votes</Text>
                <Box bg="blueGray.500" style={styles.separatorDot} />
                <Text fontSize="xs">1 day Left</Text>
              </HStack>
              {voted && (
                <Pressable
                  onPress={() => {
                    setVoted(false);
                  }}
                >
                  <Text fontSize="xs" fontWeight="500">
                    Undo
                  </Text>
                </Pressable>
              )}
            </Flex>
          </Box>
        )}
        {/**
         * text only post
         */}
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
