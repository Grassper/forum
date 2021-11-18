import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
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
import React, { useState } from "react";
import { Platform, StatusBar, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Tooltip from "react-native-walkthrough-tooltip";

import { RootStackParamList } from "@/root/src/components/navigations/StackNavigator";
import { colors } from "@/root/src/constants";

import { AudioComponent } from "./audio";

type NavigationProp_ = StackNavigationProp<RootStackParamList>;

export interface Props_ {
  id: string;
  type: "Image" | "Text" | "Video" | "Audio" | "Poll";
  username: string;
  avatarUrl: string;
  subForum: string;
  timeStamp: string;
  contentText: string;
  mediaUrl?: string;
  audioUrl?: string;
  poll?: {
    title: string;
    totalVotes: string;
    timeStamp: string;
    votedPollId: string;
    pollArr: Poll_[];
  };
  postPage?: boolean; // true if post card is used in individual post page
  hidePostNavigation?: boolean;
  hidePostUserActions?: boolean;
}

interface Poll_ {
  id: string;
  content: string;
  votes: string;
}

export const PostCard: React.FC<Props_> = ({
  username,
  subForum,
  timeStamp,
  avatarUrl,
  type,
  mediaUrl,
  audioUrl,
  contentText,
  poll,
  postPage,
  hidePostNavigation,
  hidePostUserActions,
}) => {
  const videoRef = React.useRef(null);

  return (
    <Box bg="white" alignItems="center" py="4" mt={`${postPage ? "0" : "2"}`}>
      <PostInfo
        username={username}
        subForum={subForum}
        timeStamp={timeStamp}
        avatarUrl={avatarUrl}
      />
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
       * audio post
       */}
      {type === "Audio" && mediaUrl && audioUrl && (
        <Box mb="4" width="100%">
          <AudioComponent audioUri={audioUrl} />
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
        {type === "Poll" && poll && (
          <Poll
            title={poll.title}
            timeStamp={poll.timeStamp}
            pollArr={poll.pollArr}
            totalVotes={poll.totalVotes}
            votedPollId={poll.votedPollId}
          />
        )}

        {/**
         * text only post
         */}
        <Text mb="4">{contentText}</Text>
        {!hidePostUserActions && (
          <PostUserActions hidePostNavigation={hidePostNavigation} />
        )}
      </Box>
    </Box>
  );
};

interface PostInfo_ {
  username: string;
  avatarUrl: string;
  subForum: string;
  timeStamp: string;
}

const PostInfo: React.FC<PostInfo_> = ({
  username,
  subForum,
  timeStamp,
  avatarUrl,
}) => {
  const navigation = useNavigation<NavigationProp_>();
  return (
    <Box width="90%">
      <HStack alignItems="center" justifyContent="space-between" mb="3">
        <HStack alignItems="center" space="3">
          <Pressable
            onPress={() => {
              navigation.navigate("Profile", { userId: "1" });
            }}
          >
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
          </Pressable>
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
  );
};

const Poll: React.FC<Props_["poll"]> = ({ title, pollArr, totalVotes }) => {
  const [voted, setVoted] = React.useState(false);
  return (
    <Box bg="green.50" px="3" py="4" mb="4">
      <Text fontSize="14.5" fontWeight="500" mb="2">
        {title}
      </Text>
      <Box mt="2">
        {/**
         * before user is voted
         */}
        {!voted ? (
          <Box mb="2">
            {pollArr.map((entry) => {
              return (
                <Pressable
                  key={entry.id}
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
                    <Text fontWeight="500">{entry.content}</Text>
                  </Flex>
                </Pressable>
              );
            })}
          </Box>
        ) : (
          <Box mb="2">
            {/**
             * after user is voted
             */}
            {pollArr.map((entry) => {
              return (
                <Flex
                  key={entry.id}
                  p="3"
                  py="2"
                  bg="white"
                  position="relative"
                  overflow="hidden"
                  mb="2"
                  alignItems="flex-start"
                  borderRadius="5"
                >
                  {/**
                   * in parseint second argument is radix number - here base 10
                   */}
                  <Box
                    position="absolute"
                    bg="green.200"
                    height="100"
                    width={`${
                      (parseInt(entry.votes, 10) / parseInt(totalVotes, 10)) *
                      100
                    }%`}
                  />
                  <Text fontWeight="500">{entry.content}</Text>
                </Flex>
              );
            })}
          </Box>
        )}
      </Box>
      <Flex flexDirection="row" justifyContent="space-between">
        <HStack alignItems="center">
          <Text fontSize="xs">{totalVotes} votes</Text>
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
  );
};

interface PostUserActions_ {
  hidePostNavigation?: boolean;
}

const PostUserActions: React.FC<PostUserActions_> = ({
  hidePostNavigation,
}) => {
  const navigation = useNavigation<NavigationProp_>();
  const [showTip, setTip] = useState(false);
  const [likeIcon, setLikeIcon] = useState("smile");
  console.log(likeIcon);
  return (
    <Box>
      <HStack alignItems="center" justifyContent="space-between">
        <HStack space="3" alignItems="center">
          <Tooltip
            isVisible={showTip}
            content={
              <Box style={styles.roottooltip}>
                <Pressable
                  onPress={() => {
                    setLikeIcon("smile");
                    setTip(false);
                  }}
                  style={styles.icons}
                >
                  <Image
                    source={require("@/root/assets/faces/smile.png")}
                    alt="Alternate Text"
                    size={35}
                  />
                </Pressable>

                <Pressable
                  onPress={() => {
                    setLikeIcon("wow");
                    setTip(false);
                  }}
                  style={styles.icons}
                >
                  <Image
                    source={require("@/root/assets/faces/wow.png")}
                    alt="Alternate Text"
                    size={8}
                  />
                </Pressable>
                <Pressable
                  onPress={() => {
                    setLikeIcon("sad");
                    setTip(false);
                  }}
                  style={styles.icons}
                >
                  <Image
                    source={require("@/root/assets/faces/sad.png")}
                    alt="Alternate Text"
                    size={9}
                  />
                </Pressable>

                <Pressable
                  onPress={() => {
                    setLikeIcon("angry");
                    setTip(false);
                  }}
                >
                  <Image
                    source={require("@/root/assets/faces/angry.png")}
                    alt="Alternate Text"
                    size={30}
                  />
                </Pressable>
              </Box>
            }
            onClose={() => {
              setTip(false);
            }}
            placement="top"
            topAdjustment={
              Platform.OS === "android" ? -StatusBar.currentHeight : 0
            }
            arrowSize={{ width: 0, height: 0 }}
            contentStyle={styles.tooltipContainer}
            backgroundColor="transparent"
            displayInsets={{
              top: 24,
              bottom: 34,
              left: 14,
              right: 14,
            }}
            allowChildInteraction={false}
            childContentSpacing={0}
          >
            <TouchableOpacity onPress={() => setTip(true)}>
              <Image
                source={require("@/root/assets/faces/angry.png")}
                alt="Alternate Text"
                size={"20px"}
              />
            </TouchableOpacity>
          </Tooltip>
          <Pressable
            onPress={() => {
              navigation.navigate("AddAndEditComment");
            }}
          >
            <Icon
              as={<Ionicons name="chatbubble-outline" />}
              size={5}
              color="muted.500"
            />
          </Pressable>
        </HStack>
        {!hidePostNavigation && (
          <Pressable
            onPress={() => {
              navigation.navigate("Post");
            }}
          >
            <Box style={styles.openPostIcon}>
              <Icon
                as={<Ionicons name="share-outline" />}
                size={5}
                color="muted.500"
              />
            </Box>
          </Pressable>
        )}
      </HStack>
    </Box>
  );
};

const styles = StyleSheet.create({
  icons: {
    marginRight: 4,
  },
  openPostIcon: {
    transform: [{ rotate: "90deg" }],
  },
  roottooltip: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
    flexDirection: "row",
    height: "100%",
    width: "100%",
  },
  separatorDot: {
    borderRadius: 50,
    height: 2.5,
    marginHorizontal: 5,
    width: 2.5,
  },
  tooltipContainer: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 25,
    flex: 1,
    height: 45,
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
    position: "relative",
    width: "100%",
  },
  video: {
    backgroundColor: colors.black,
    height: 200,
  },
});
