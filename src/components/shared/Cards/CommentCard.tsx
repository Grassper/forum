import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import { Box, Flex, HStack, Icon, Pressable, Text } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { SvgUri } from "react-native-svg";

import { Skeleton } from "@/root/src/components/shared/Skeleton";
interface Props_ {
  repliesCount?: number;
  hideReplyButton?: boolean;
  hideCommentUserActions?: boolean;
  username?: string;
  avatarUrl?: string;
  subForum?: string;
  subForumId?: string;
  postId?: string;
  contentText?: string;
  commentId?: string;
  timeStamp?: Date;
}

export const CommentCard: React.FC<Props_> = ({
  repliesCount,
  hideReplyButton,
  subForum,
  username,
  postId,
  subForumId,
  avatarUrl,
  timeStamp,
  contentText,
  commentId,
  hideCommentUserActions,
}) => {
  const [action, setAction] = React.useState<
    "Upvoted" | "Downvoted" | "Notvoted"
  >("Notvoted");

  const navigation = useNavigation();

  const voteHandler = (vote: "Upvoted" | "Downvoted") => {
    if (action === vote) {
      setAction("Notvoted");
    } else {
      setAction(vote);
    }
  };

  return (
    <Box
      alignItems="center"
      bg="white"
      py="4"
      borderBottomWidth="1"
      borderBottomColor="border.400"
    >
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
          {commentId && (
            <Icon
              as={<Ionicons name="ellipsis-vertical" />}
              size={5}
              color="muted.500"
            />
          )}
        </HStack>
        {contentText ? (
          <Text mb="4">{contentText}</Text>
        ) : (
          <>
            <Skeleton height="20px" width="100%" mb="2" />
            <Skeleton height="20px" width="85%" mb="2" />
            <Skeleton height="20px" width="100%" mb="4" />
          </>
        )}
        {!hideCommentUserActions && commentId && (
          <Box>
            <HStack alignItems="center" justifyContent="space-between">
              <HStack space="3" alignItems="center">
                <Pressable
                  onPress={() => {
                    voteHandler("Upvoted");
                  }}
                >
                  <Flex flexDirection="row" alignItems="flex-end">
                    <Icon
                      as={<AntDesign name="caretcircleoup" />}
                      size={5}
                      color={action === "Upvoted" ? "green.500" : "muted.500"}
                    />
                    <Text ml="1" fontSize="xs">
                      1.5k
                    </Text>
                  </Flex>
                </Pressable>
                <Pressable
                  onPress={() => {
                    voteHandler("Downvoted");
                  }}
                >
                  <Flex flexDirection="row" alignItems="flex-end">
                    <Box style={styles.downVoteIcon}>
                      <Icon
                        as={<AntDesign name="caretcircleoup" />}
                        size={5}
                        color={action === "Downvoted" ? "red.500" : "muted.500"}
                      />
                    </Box>
                    <Text ml="1" fontSize="xs">
                      85k
                    </Text>
                  </Flex>
                </Pressable>
                {!hideReplyButton && (
                  <Pressable
                    onPress={() => {
                      navigation.navigate("StackNav", {
                        screen: "AddAndEditReplies",
                        params: {
                          username,
                          avatarUrl,
                          subForum,
                          postId,
                          subForumId,
                          contentText,
                          commentId,
                          timeStamp,
                          action: "Add",
                        },
                      });
                    }}
                  >
                    <Flex flexDirection="row" alignItems="flex-end">
                      <Box>
                        <Icon
                          as={<Entypo name="reply" />}
                          size={5}
                          color={"muted.500"}
                        />
                      </Box>
                    </Flex>
                  </Pressable>
                )}
              </HStack>
              {!!repliesCount && (
                <Pressable
                  onPress={() => {
                    navigation.navigate("StackNav", {
                      screen: "Comment",
                      params: {
                        username,
                        avatarUrl,
                        subForum,
                        postId,
                        subForumId,
                        contentText,
                        commentId,
                        timeStamp,
                        repliesCount,
                      },
                    });
                  }}
                >
                  {/**
                   * show replies only if replies exist */}
                  <Box>
                    <Text fontWeight="500" fontSize="xs" color="info.600">
                      {repliesCount} Reply
                    </Text>
                  </Box>
                </Pressable>
              )}
            </HStack>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  downVoteIcon: {
    transform: [{ rotate: "180deg" }],
  },
  separatorDot: {
    borderRadius: 50,
    height: 2.5,
    marginHorizontal: 5,
    width: 2.5,
  },
});

/**
 * Todo-5: comment user action graphql schemas and types
 * Todo-6: comment user action handlers
 */

/**
 * graphql queries and their types
 * types pattern {queryName}_
 * * note dash(_) at the end of type name
 * order 1.queryType 2.graphql query
 */

/**
 * comment metrics graphql calls
 */

const IncrementCommentUpvote = /* GraphQL */ `
  mutation incrementCommentUpvote($id: ID!) {
    incrementCommentUpvote(id: $id) {
      id
    }
  }
`;

const DecrementCommentUpvote = /* GraphQL */ `
  mutation decrementCommentUpvote($id: ID!) {
    decrementCommentUpvote(id: $id) {
      id
    }
  }
`;

const IncrementCommentDownvote = /* GraphQL */ `
  mutation incrementCommentDownvote($id: ID!) {
    incrementCommentDownvote(id: $id) {
      id
    }
  }
`;

const DecrementCommentDownvote = /* GraphQL */ `
  mutation decrementCommentDownvote($id: ID!) {
    decrementCommentDownvote(id: $id) {
      id
    }
  }
`;

/**
 * user metrics graphql calls
 */

const IncrementCommentUpvoteUserMetrics = /* GraphQL */ `
  mutation incrementCommentUpvoteUserMetrics($id: ID!) {
    incrementCommentUpvoteUserMetrics(id: $id) {
      id
    }
  }
`;

const DecrementCommentUpvoteUserMetrics = /* GraphQL */ `
  mutation decrementCommentUpvoteUserMetrics($id: ID!) {
    decrementCommentUpvoteUserMetrics(id: $id) {
      id
    }
  }
`;

const IncrementCommentDownvoteUserMetrics = /* GraphQL */ `
  mutation incrementCommentDownvoteUserMetrics($id: ID!) {
    incrementCommentDownvoteUserMetrics(id: $id) {
      id
    }
  }
`;

const DecrementCommentDownvoteUserMetrics = /* GraphQL */ `
  mutation decrementCommentDownvoteUserMetrics($id: ID!) {
    decrementCommentDownvoteUserMetrics(id: $id) {
      id
    }
  }
`;

const MetricsQueryPicker = {
  UPVOTE: {
    COMMENT: {
      INCREMENT: IncrementCommentUpvote,
      DECREMENT: DecrementCommentUpvote,
    },
    USERMETRICS: {
      INCREMENT: IncrementCommentUpvoteUserMetrics,
      DECREMENT: DecrementCommentUpvoteUserMetrics,
    },
  },
  DOWNVOTE: {
    COMMENT: {
      INCREMENT: IncrementCommentDownvote,
      DECREMENT: DecrementCommentDownvote,
    },
    USERMETRICS: {
      INCREMENT: IncrementCommentDownvoteUserMetrics,
      DECREMENT: DecrementCommentDownvoteUserMetrics,
    },
  },
};
