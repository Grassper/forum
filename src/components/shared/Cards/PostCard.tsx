import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import { Video } from "expo-av";
import { Box, Flex, HStack, Icon, Image, Pressable, Text } from "native-base";
import React, { useState } from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SvgUri } from "react-native-svg";
import Tooltip from "react-native-walkthrough-tooltip";

import { AudioComponent } from "@/root/src/components/shared/Audio";
import { Skeleton } from "@/root/src/components/shared/Skeleton";
import { colors } from "@/root/src/constants";
import { SignS3ImageKey } from "@/root/src/utils/helpers";

export interface Props_ {
  id?: string;
  type?: "Image" | "Text" | "Video" | "Audio" | "Poll";
  username?: string;
  avatarUrl?: string;
  subForum?: string;
  subForumId?: string;
  timeStamp?: Date;
  contentText?: string;
  mediaS3Key?: null | string;
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
  subForumId,
  timeStamp,
  avatarUrl,
  type,
  mediaS3Key,
  contentText,
  poll,
  postPage,
  id,
  hidePostNavigation,
  hidePostUserActions,
}) => {
  const videoRef = React.useRef(null);

  const [signedMediaUrl, setSignedMediaUrl] = React.useState("");

  const signImage = React.useCallback(async () => {
    if (mediaS3Key) {
      const signedImage = await SignS3ImageKey(mediaS3Key);
      if (signedImage) {
        setSignedMediaUrl(signedImage);
      }
    }
  }, [mediaS3Key]);

  React.useEffect(() => {
    signImage();
  }, [signImage]);

  return (
    <Box bg="white" alignItems="center" py="4" mt={`${postPage ? "0" : "2"}`}>
      <PostInfo
        username={username}
        subForum={subForum}
        timeStamp={timeStamp}
        avatarUrl={avatarUrl}
        postId={id}
      />
      {/**
       * video post
       */}
      {type === "Video" &&
        (signedMediaUrl ? (
          <Box mb="4" width="100%">
            <Video
              ref={videoRef}
              style={styles.video}
              source={{
                uri: signedMediaUrl,
              }}
              useNativeControls
              resizeMode="cover"
            />
          </Box>
        ) : (
          <Skeleton height="350px" width="100%" mb="2" />
        ))}
      {/**
       * audio post
       */}
      {type === "Audio" &&
        (signedMediaUrl ? (
          <Box mb="4" width="100%">
            <AudioComponent audioUri={signedMediaUrl} />
          </Box>
        ) : (
          <Skeleton height="100px" width="100%" mb="2" />
        ))}
      {/**
       * image post
       */}
      {type === "Image" &&
        (signedMediaUrl ? (
          <Image
            width="100%"
            height="350"
            alt="fallback text"
            source={{
              uri: signedMediaUrl,
            }}
            mb="4"
          />
        ) : (
          <Skeleton height="350px" width="100%" mb="2" />
        ))}

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
        {contentText ? (
          <Text mb="4">{contentText}</Text>
        ) : (
          <>
            <Skeleton height="20px" width="100%" mb="2" />
            <Skeleton height="20px" width="85%" mb="2" />
            <Skeleton height="20px" width="100%" mb="4" />
          </>
        )}
        {!hidePostUserActions && id && (
          <PostUserActions
            hidePostNavigation={hidePostNavigation}
            id={id}
            type={type}
            username={username}
            avatarUrl={avatarUrl}
            subForum={subForum}
            subForumId={subForumId}
            timeStamp={timeStamp}
            contentText={contentText}
            mediaS3Key={mediaS3Key}
          />
        )}
      </Box>
    </Box>
  );
};

interface PostInfo_ {
  postId?: string;
  username?: string;
  avatarUrl?: string;
  subForum?: string;
  timeStamp?: Date;
}

const PostInfo: React.FC<PostInfo_> = ({
  username,
  subForum,
  timeStamp,
  avatarUrl,
  postId,
}) => {
  return (
    <Box width="90%">
      <HStack alignItems="center" justifyContent="space-between" mb="3">
        <HStack alignItems="center" space="3">
          {avatarUrl ? (
            <Pressable onPress={() => {}}>
              <Box
                width="40px"
                height="40px"
                bg="amber.100"
                borderRadius="full"
                overflow="hidden"
              >
                <SvgUri uri={avatarUrl} width="100%" height="100%" />
              </Box>
            </Pressable>
          ) : (
            <Box
              width="40px"
              height="40px"
              bg="amber.100"
              borderRadius="full"
              overflow="hidden"
            >
              <Skeleton width="100%" height="100%" />
            </Box>
          )}
          <Box>
            {username ? (
              <Text fontWeight="500">{username}</Text>
            ) : (
              <Skeleton height="20px" width="250px" mb="5px" />
            )}
            <HStack alignItems="center">
              {subForum ? (
                <>
                  <Text fontSize="xs" color="blueGray.500">
                    in e/{subForum}
                  </Text>
                  <Box bg="blueGray.500" style={styles.separatorDot} />
                </>
              ) : (
                <Skeleton height="20px" width="75px" mb="5px" mr="2" />
              )}

              {timeStamp ? (
                <Text fontSize="xs" color="blueGray.500">
                  {format(new Date(timeStamp), "MMM dd")}
                </Text>
              ) : (
                <Skeleton height="20px" width="75px" mb="5px" />
              )}
            </HStack>
          </Box>
        </HStack>
        {postId && (
          <Icon
            as={<Ionicons name="ellipsis-vertical" />}
            size={5}
            color="muted.500"
          />
        )}
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
  id?: string;
  type?: "Image" | "Text" | "Video" | "Audio" | "Poll";
  username?: string;
  avatarUrl?: string;
  subForum?: string;
  subForumId?: string;
  timeStamp?: Date;
  contentText?: string;
  mediaS3Key?: null | string;
}

const PostUserActions: React.FC<PostUserActions_> = ({
  hidePostNavigation,
  ...post
}) => {
  const [showTip, setTip] = useState(false);
  const [likeIcon, setLikeIcon] = useState("smile");
  const images = {
    smile: require("@/root/assets/faces/smile.png"),
    angry: require("@/root/assets/faces/angry.png"),
    sad: require("@/root/assets/faces/sad.png"),
    wow: require("@/root/assets/faces/wow.png"),
  };
  var [iconemoji, setIcon] = useState(images.smile);
  var iconName = images.smile;

  const navigation = useNavigation();

  function chooseIcon() {
    iconName = images.angry;
    return iconName;
  }

  const { id } = post;

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
                    setLikeIcon("smile"), setIcon(images.smile), setTip(false);
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
                    setLikeIcon("wow"), setTip(false), setIcon(images.wow);
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
                    chooseIcon(), setTip(false);
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
              Platform.OS === "android" ? -StatusBar.currentHeight + 23 : 0
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
              <Image source={iconemoji} alt="Alternate Text" size={"20px"} />
            </TouchableOpacity>
          </Tooltip>
          <Pressable
            onPress={() =>
              navigation.navigate("StackNav", {
                screen: "AddAndEditComment",
                params: { ...post, action: "Add" },
              })
            }
          >
            <Icon
              as={<Ionicons name="chatbubble-outline" />}
              size={5}
              color="muted.500"
            />
          </Pressable>
        </HStack>
        {!hidePostNavigation && id && (
          <Pressable
            onPress={() =>
              navigation.navigate("StackNav", {
                screen: "Post",
                params: { ...post },
              })
            }
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
