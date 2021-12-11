import { GraphQLResult } from "@aws-amplify/api-graphql";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { API } from "aws-amplify";
import { format } from "date-fns";
import { Video } from "expo-av";
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  Pressable,
  Text,
} from "native-base";
import React, { useState } from "react";
import { Platform, StatusBar, StyleSheet } from "react-native";
import { SvgUri } from "react-native-svg";
import Tooltip from "react-native-walkthrough-tooltip";

import { AudioComponent } from "@/root/src/components/shared/Audio";
import * as ActionIcons from "@/root/src/components/shared/Icons";
import { ReportPost } from "@/root/src/components/shared/Report";
import { Skeleton } from "@/root/src/components/shared/Skeleton";
import { colors } from "@/root/src/constants";
import { UserContext } from "@/root/src/context";
import { useToggle } from "@/root/src/hooks";
import { SignS3ImageKey } from "@/root/src/utils/helpers";

export interface Props_ {
  id?: string;
  type?: "Image" | "Text" | "Video" | "Audio" | "Poll";
  username?: string;
  avatarUrl?: string;
  authorId?: string;
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
  userPostMetric?: UserPostMetric;
  postPage?: boolean; // true if post card is used in individual post page
  hidePostNavigation?: boolean;
  hidePostUserActions?: boolean;
}

interface UserPostMetric {
  items: UserPostMetricItem[];
}

interface UserPostMetricItem {
  type: "LIKE" | "LOVE" | "SUPPORT" | "DISLIKE";
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
  authorId,
  id,
  hidePostNavigation,
  userPostMetric,
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
            authorId={authorId}
            contentText={contentText}
            mediaS3Key={mediaS3Key}
            userPostMetric={userPostMetric}
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
  const [reportModal, setReportModal] = React.useState(false);

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
          <>
            <Pressable onPress={() => setReportModal(true)}>
              <Icon
                as={<Feather name="more-vertical" />}
                size={5}
                color="coolGray.500"
              />
            </Pressable>
            <ReportPost
              postId={postId}
              reportModal={reportModal}
              setReportModal={setReportModal}
            />
          </>
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
      <HStack justifyContent="space-between">
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
      </HStack>
    </Box>
  );
};

interface PostUserActions_ {
  hidePostNavigation?: boolean;
  id?: string;
  type?: "Image" | "Text" | "Video" | "Audio" | "Poll";
  username?: string;
  authorId?: string;
  avatarUrl?: string;
  subForum?: string;
  subForumId?: string;
  timeStamp?: Date;
  contentText?: string;
  mediaS3Key?: null | string;
  userPostMetric?: UserPostMetric;
}

/**
 * like
 * love
 * support
 * dislike
 * up post
 * down vote
 */

type IconsPicker_ = {
  LIKE: () => React.FC;
  LOVE: () => React.FC;
  SUPPORT: () => React.FC;
  DISLIKE: () => React.FC;
  SUPPORTOUTLINE: () => React.FC;
};

const IconsPicker = {
  LIKE: ActionIcons.LikeIcon,
  LOVE: ActionIcons.LoveIcon,
  SUPPORT: ActionIcons.ChargeIcon,
  DISLIKE: ActionIcons.DislikeIcon,
  SUPPORTOUTLINE: ActionIcons.ChargeIconOutline,
};

const PostUserActions: React.FC<PostUserActions_> = ({
  hidePostNavigation,
  ...post
}) => {
  const navigation = useNavigation();

  const { id } = post;

  return (
    <Box>
      <HStack alignItems="center" justifyContent="space-between">
        <HStack space="6" alignItems="center">
          <UserActionToolTip
            postId={post.id}
            communityId={post.subForumId}
            postAuthorId={post.authorId}
            userPostMetric={post.userPostMetric}
          />
          <Pressable
            onPress={() =>
              navigation.navigate("Application", {
                screen: "StackNav",
                params: {
                  screen: "AddAndEditComment",
                  params: { ...post, action: "Add" },
                },
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
              navigation.navigate("Application", {
                screen: "StackNav",
                params: {
                  screen: "Post",
                  params: { ...post },
                },
              })
            }
          >
            <Box style={styles.openPostIcon}>
              <Icon
                as={<Ionicons name="expand" />}
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

interface UserActionToolTip_ {
  postId?: string;
  communityId?: string;
  postAuthorId?: string;
  userPostMetric?: UserPostMetric;
}

const UserActionToolTip: React.FC<UserActionToolTip_> = ({
  postId,
  communityId,
  postAuthorId,
  userPostMetric,
}) => {
  const [showTip, setTip] = useToggle(false);

  const currentUser = React.useContext(UserContext).user;

  const [selectedIcon, setSelectedIcon] =
    useState<keyof IconsPicker_>("SUPPORTOUTLINE");

  const PickedIcon = IconsPicker[selectedIcon];

  React.useEffect(() => {
    if (userPostMetric && userPostMetric.items.length === 1) {
      setSelectedIcon(userPostMetric.items[0].type);
    }
  }, [userPostMetric]);

  const UserActionCreationHandler = (
    type: UserActionCreationFetchInput_["type"]
  ) => {
    if (postId && communityId && postAuthorId) {
      const UserActionCreationInput: UserActionCreationFetchInput_ = {
        postId,
        communityId,
        postAuthorId,
        type,
        userId: currentUser.id,
      };

      UserActionCreationFetch(UserActionCreationInput);
    }
  };

  const UserActionDeletionHandler = () => {
    if (postId && communityId && postAuthorId) {
      const UserActionCreationInput: UserActionDeletionFetchInput_ = {
        postId,
        communityId,
        postAuthorId,
        userId: currentUser.id,
      };

      UserActionDeletionFetch(UserActionCreationInput);
    }
  };

  const PickIconHandler = (value: keyof IconsPicker_) => {
    setSelectedIcon(value);
    setTip();

    // call user action creation fetch with icon action type
    UserActionCreationHandler(value as UserActionCreationFetchInput_["type"]);
  };

  const ResetPickedIcon = () => {
    if (selectedIcon !== "SUPPORTOUTLINE") {
      setSelectedIcon("SUPPORTOUTLINE");

      // call delete user action fetch
      UserActionDeletionHandler();
    }
  };

  return (
    <Tooltip
      isVisible={showTip}
      content={
        <HStack space="1" alignItems="center">
          <Pressable
            onPress={() => {
              PickIconHandler("SUPPORT");
            }}
          >
            <Box width="30px" height="30px">
              <ActionIcons.ChargeIcon />
            </Box>
          </Pressable>
          <Pressable
            onPress={() => {
              PickIconHandler("LIKE");
            }}
          >
            <Box width="30px" height="30px">
              <ActionIcons.LikeIcon />
            </Box>
          </Pressable>
          <Pressable
            onPress={() => {
              PickIconHandler("LOVE");
            }}
          >
            <Box width="30px" height="30px">
              <ActionIcons.LoveIcon />
            </Box>
          </Pressable>
          <Pressable
            onPress={() => {
              PickIconHandler("DISLIKE");
            }}
          >
            <Box width="30px" height="30px">
              <ActionIcons.DislikeIcon />
            </Box>
          </Pressable>
        </HStack>
      }
      onClose={() => {
        setTip(false);
      }}
      placement="top"
      topAdjustment={
        Platform.OS === "android" && StatusBar.currentHeight
          ? -StatusBar.currentHeight + 23
          : 0
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
      <Pressable
        delayLongPress={500}
        onLongPress={() => setTip(true)}
        onPress={ResetPickedIcon}
      >
        <Box width="20px" height="20px">
          <PickedIcon />
        </Box>
      </Pressable>
    </Tooltip>
  );
};

const styles = StyleSheet.create({
  openPostIcon: {
    transform: [{ rotate: "90deg" }],
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

/**
 * Todo-4: alter post fetch in timeline subforum search profile with metrics
 */

/**
 * api
 */

interface UserActionCreationFetchInput_ {
  postId: string;
  userId: string;
  communityId: string;
  type: "LIKE" | "LOVE" | "SUPPORT" | "DISLIKE";
  postAuthorId: string;
}

interface UserActionCheckFetchInput_ {
  postId: string;
  userId: string;
}

interface UpdateUserActionFetchInput_ {
  id: string;
  postId: string;
  userId: string;
  communityId: string;
  type: "LIKE" | "LOVE" | "SUPPORT" | "DISLIKE";
  _version: number;
}

const UserActionCreationFetch = async (args: UserActionCreationFetchInput_) => {
  try {
    // check if user already made an action
    const { postAuthorId, ...input } = args;

    const isUserActionExistInput: UserActionCheckFetchInput_ = {
      userId: input.userId,
      postId: input.postId,
    };

    const isUserActionExist = (await API.graphql({
      query: CheckUserAction,
      variables: isUserActionExistInput,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<CheckUserAction_>;

    // if user action already exist update the existing one
    if (
      isUserActionExist.data?.listUserPostMetricsRelationShips &&
      isUserActionExist.data.listUserPostMetricsRelationShips.items.length === 1
    ) {
      const existingUserAction =
        isUserActionExist.data.listUserPostMetricsRelationShips.items[0];

      const updateUserActionInput: UpdateUserActionFetchInput_ = {
        id: existingUserAction.id,
        postId: input.postId,
        userId: input.userId,
        communityId: input.communityId,
        type: input.type,
        _version: existingUserAction._version,
      };

      const updateUserAction = (await API.graphql({
        query: UpdateUserPostMetricsRelationship,
        variables: { input: updateUserActionInput },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as GraphQLResult<UpdateUserPostMetricsRelationship_>;

      if (updateUserAction.data?.updateUserPostMetricsRelationShip) {
        // decrement existing user and post metrics and increment latest user and post metrics

        await API.graphql({
          query: MetricsQueryPicker[existingUserAction.type].POST.DECREMENT,
          variables: { id: input.postId },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });

        await API.graphql({
          query:
            MetricsQueryPicker[existingUserAction.type].USERMETRICS.DECREMENT,
          variables: { id: postAuthorId },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });

        await API.graphql({
          query: MetricsQueryPicker[input.type].POST.INCREMENT,
          variables: { id: input.postId },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });

        await API.graphql({
          query: MetricsQueryPicker[input.type].USERMETRICS.INCREMENT,
          variables: { id: postAuthorId },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });

        return updateUserAction.data.updateUserPostMetricsRelationShip.id;
      }
    } else {
      // if user action doesnt exist create new
      const createUserAction = (await API.graphql({
        query: CreateUserPostMetricsRelationship,
        variables: { input },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as GraphQLResult<CreateUserPostMetricsRelationship_>;

      if (createUserAction.data?.createUserPostMetricsRelationShip) {
        // increment user and post metrics
        await API.graphql({
          query: MetricsQueryPicker[input.type].POST.INCREMENT,
          variables: { id: input.postId },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });

        await API.graphql({
          query: MetricsQueryPicker[input.type].USERMETRICS.INCREMENT,
          variables: { id: postAuthorId },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        return createUserAction.data?.createUserPostMetricsRelationShip.id;
      }
    }
  } catch (err) {
    console.error("Error occured creating user action for post", err);
  }
};

interface DeleteUserActionInput_ {
  id: string;
  userId: string;
  postId: string;
  communityId: string;
  _version: number;
  type: "LIKE" | "LOVE" | "SUPPORT" | "DISLIKE";
  isDeleted: boolean;
}

interface UserActionDeletionFetchInput_ {
  userId: string;
  postId: string;
  communityId: string;
  postAuthorId: string;
}

const UserActionDeletionFetch = async (args: UserActionDeletionFetchInput_) => {
  try {
    const { postAuthorId, ...input } = args;
    // check if user already made an action

    const isUserActionExistInput: UserActionCheckFetchInput_ = {
      userId: input.userId,
      postId: input.postId,
    };

    const isUserActionExist = (await API.graphql({
      query: CheckUserAction,
      variables: isUserActionExistInput,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<CheckUserAction_>;

    // if user action already exist delete the existing one
    if (
      isUserActionExist.data?.listUserPostMetricsRelationShips &&
      isUserActionExist.data.listUserPostMetricsRelationShips.items.length === 1
    ) {
      const existingUserAction =
        isUserActionExist.data.listUserPostMetricsRelationShips.items[0];

      const deleteUserActionInput: DeleteUserActionInput_ = {
        id: existingUserAction.id,
        postId: input.postId,
        userId: input.userId,
        type: existingUserAction.type,
        communityId: input.communityId,
        _version: existingUserAction._version,
        isDeleted: true,
      };

      const deletedUserAction = (await API.graphql({
        query: UpdateUserPostMetricsRelationship,
        variables: { input: deleteUserActionInput },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as GraphQLResult<UpdateUserPostMetricsRelationship_>;

      if (deletedUserAction.data?.updateUserPostMetricsRelationShip) {
        // decrement user and post metrics
        await API.graphql({
          query: MetricsQueryPicker[existingUserAction.type].POST.DECREMENT,
          variables: { id: input.postId },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });

        await API.graphql({
          query:
            MetricsQueryPicker[existingUserAction.type].USERMETRICS.DECREMENT,
          variables: { id: postAuthorId },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        return deletedUserAction.data.updateUserPostMetricsRelationShip.id;
      }
    }
  } catch (err) {
    console.error("Error occured deleting user action for post", err);
  }
};

/**
 * graphql queries and their types
 * types pattern {queryName}_
 * * note dash(_) at the end of type name
 * order 1.queryType 2.graphql query
 */

interface CheckUserAction_ {
  listUserPostMetricsRelationShips?: ListUserPostMetricsRelationShips_;
}

interface ListUserPostMetricsRelationShips_ {
  items: Item[];
}

interface Item {
  id: string;
  type: "LIKE" | "LOVE" | "SUPPORT" | "DISLIKE";
  postId: string;
  _version: number;
}

const CheckUserAction = /* GraphQL */ `
  query CheckUserAction($postId: ID!, $userId: ID!) {
    listUserPostMetricsRelationShips(
      filter: {
        postId: { eq: $postId }
        userId: { eq: $userId }
        isDeleted: { attributeExists: false }
      }
    ) {
      items {
        id
        type
        postId
        _version
      }
    }
  }
`;

interface CreateUserPostMetricsRelationship_ {
  createUserPostMetricsRelationShip?: CreateUserPostMetricsRelationShip_;
}

interface CreateUserPostMetricsRelationShip_ {
  id: string;
  type: string;
  postId: string;
}

const CreateUserPostMetricsRelationship = /* GraphQL */ `
  mutation CreateUserPostMetricsRelationship(
    $input: CreateUserPostMetricsRelationShipInput!
  ) {
    createUserPostMetricsRelationShip(input: $input) {
      id
      type
      postId
    }
  }
`;

interface UpdateUserPostMetricsRelationship_ {
  updateUserPostMetricsRelationShip?: UpdateUserPostMetricsRelationShip_;
}

interface UpdateUserPostMetricsRelationShip_ {
  id: string;
  type: string;
  postId: string;
}

const UpdateUserPostMetricsRelationship = /* GraphQL */ `
  mutation UpdateUserPostMetricRelationship(
    $input: UpdateUserPostMetricsRelationShipInput!
  ) {
    updateUserPostMetricsRelationShip(input: $input) {
      id
      type
      postId
    }
  }
`;

/**
 * post metrics graphql calls
 */

const IncrementPostLikes = /* GraphQL */ `
  mutation incrementPostLikes($id: ID!) {
    incrementPostLikes(id: $id) {
      id
    }
  }
`;

const DecrementPostLikes = /* GraphQL */ `
  mutation decrementPostLikes($id: ID!) {
    decrementPostLikes(id: $id) {
      id
    }
  }
`;

const IncrementPostLoves = /* GraphQL */ `
  mutation incrementPostLoves($id: ID!) {
    incrementPostLoves(id: $id) {
      id
    }
  }
`;

const DecrementPostLoves = /* GraphQL */ `
  mutation decrementPostLoves($id: ID!) {
    decrementPostLoves(id: $id) {
      id
    }
  }
`;

const IncrementPostSupports = /* GraphQL */ `
  mutation incrementPostSupports($id: ID!) {
    incrementPostSupports(id: $id) {
      id
    }
  }
`;

const DecrementPostSupports = /* GraphQL */ `
  mutation decrementPostSupports($id: ID!) {
    decrementPostSupports(id: $id) {
      id
    }
  }
`;

const IncrementPostDislikes = /* GraphQL */ `
  mutation incrementPostDislikes($id: ID!) {
    incrementPostDislikes(id: $id) {
      id
    }
  }
`;

const DecrementPostDislikes = /* GraphQL */ `
  mutation decrementPostDislikes($id: ID!) {
    decrementPostDislikes(id: $id) {
      id
    }
  }
`;

/**
 * user metrics graphql calls
 */

const IncrementLikePostUserMetrics = /* GraphQL */ `
  mutation incrementLikePostUserMetrics($id: ID!) {
    incrementLikePostUserMetrics(id: $id) {
      id
    }
  }
`;

const DecrementLikePostUserMetrics = /* GraphQL */ `
  mutation decrementLikePostUserMetrics($id: ID!) {
    decrementLikePostUserMetrics(id: $id) {
      id
    }
  }
`;

const IncrementLovePostUserMetrics = /* GraphQL */ `
  mutation incrementLovePostUserMetrics($id: ID!) {
    incrementLovePostUserMetrics(id: $id) {
      id
    }
  }
`;

const DecrementLovePostUserMetrics = /* GraphQL */ `
  mutation decrementLovePostUserMetrics($id: ID!) {
    decrementLovePostUserMetrics(id: $id) {
      id
    }
  }
`;

const IncrementSupportPostUserMetrics = /* GraphQL */ `
  mutation incrementSupportPostUserMetrics($id: ID!) {
    incrementSupportPostUserMetrics(id: $id) {
      id
    }
  }
`;

const DecrementSupportPostUserMetrics = /* GraphQL */ `
  mutation decrementSupportPostUserMetrics($id: ID!) {
    decrementSupportPostUserMetrics(id: $id) {
      id
    }
  }
`;

const IncrementDislikePostUserMetrics = /* GraphQL */ `
  mutation incrementDislikePostUserMetrics($id: ID!) {
    incrementDislikePostUserMetrics(id: $id) {
      id
    }
  }
`;

const DecrementDislikePostUserMetrics = /* GraphQL */ `
  mutation decrementDislikePostUserMetrics($id: ID!) {
    decrementDislikePostUserMetrics(id: $id) {
      id
    }
  }
`;

const MetricsQueryPicker = {
  LIKE: {
    POST: {
      INCREMENT: IncrementPostLikes,
      DECREMENT: DecrementPostLikes,
    },
    USERMETRICS: {
      INCREMENT: IncrementLikePostUserMetrics,
      DECREMENT: DecrementLikePostUserMetrics,
    },
  },
  LOVE: {
    POST: {
      INCREMENT: IncrementPostLoves,
      DECREMENT: DecrementPostLoves,
    },
    USERMETRICS: {
      INCREMENT: IncrementLovePostUserMetrics,
      DECREMENT: DecrementLovePostUserMetrics,
    },
  },
  SUPPORT: {
    POST: {
      INCREMENT: IncrementPostSupports,
      DECREMENT: DecrementPostSupports,
    },
    USERMETRICS: {
      INCREMENT: IncrementSupportPostUserMetrics,
      DECREMENT: DecrementSupportPostUserMetrics,
    },
  },
  DISLIKE: {
    POST: {
      INCREMENT: IncrementPostDislikes,
      DECREMENT: DecrementPostDislikes,
    },
    USERMETRICS: {
      INCREMENT: IncrementDislikePostUserMetrics,
      DECREMENT: DecrementDislikePostUserMetrics,
    },
  },
};
