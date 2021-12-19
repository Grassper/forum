import { GraphQLResult } from "@aws-amplify/api-graphql";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { API } from "aws-amplify";
import { format } from "date-fns";
import { Box, HStack, Icon, Menu, Pressable, Text } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { SvgUri } from "react-native-svg";

import { ReportComment } from "@/root/src/components/shared/Report";
import { Skeleton } from "@/root/src/components/shared/Skeleton";
import { UserContext } from "@/root/src/context";

interface Props_ {
  repliesCount?: number;
  hideReplyButton?: boolean;
  hideCommentUserActions?: boolean;
  username?: string;
  avatarUrl?: string;
  subForum?: string;
  subForumId?: string;
  commentAuthorId?: string;
  postId?: string;
  contentText?: string;
  userCommentMetric?: userCommentMetric_;
  commentId?: string;
  timeStamp?: Date;
}

interface userCommentMetric_ {
  items: { type: "UPVOTE" | "DOWNVOTE" }[];
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
  commentAuthorId,
  contentText,
  commentId,
  hideCommentUserActions,
  userCommentMetric,
}) => {
  const [action, setAction] = React.useState<
    "UPVOTE" | "DOWNVOTE" | "NOTVOTED"
  >("NOTVOTED");

  React.useEffect(() => {
    if (userCommentMetric && userCommentMetric.items.length === 1) {
      setAction(userCommentMetric.items[0].type);
    }
  }, [userCommentMetric]);

  const navigation = useNavigation();
  const [reportModal, setReportModal] = React.useState(false);
  const currentUser = React.useContext(UserContext).user;

  const CommentUserActionHandler = (
    value: "UPVOTE" | "DOWNVOTE" | "NOTVOTED"
  ) => {
    if (postId && currentUser && commentId && subForumId && commentAuthorId) {
      if (value !== "NOTVOTED") {
        const CommentUserActionCreationInput: CommentUserActionCreationFetchInput_ =
          {
            type: value,
            userId: currentUser.id,
            postId,
            commentId,
            communityId: subForumId,
            commentAuthorId,
          };
        CommentUserActionCreationFetch(CommentUserActionCreationInput);
      } else {
        const CommentUserActionDeletionInput: DeleteCommentUserActionFetchInput_ =
          {
            userId: currentUser.id,
            postId,
            commentId,
            communityId: subForumId,
            commentAuthorId,
          };
        CommentUserActionDeletionFetch(CommentUserActionDeletionInput);
      }
    }
  };

  const voteHandler = (vote: "UPVOTE" | "DOWNVOTE") => {
    if (action === vote) {
      setAction("NOTVOTED");
      CommentUserActionHandler("NOTVOTED");
    } else {
      setAction(vote);
      CommentUserActionHandler(vote);
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
            <>
              <Menu
                trigger={(triggerProps) => {
                  return (
                    <Pressable {...triggerProps}>
                      <Icon
                        as={<Ionicons name="ellipsis-vertical" />}
                        size={5}
                        mr="2"
                        color="black"
                      />
                    </Pressable>
                  );
                }}
              >
                <Menu.Item onPress={() => setReportModal(true)}>
                  Report
                </Menu.Item>
              </Menu>
              <ReportComment
                commentId={commentId}
                reportModal={reportModal}
                setReportModal={setReportModal}
              />
            </>
          )}
        </HStack>
        {contentText ? (
          <Text mb="4">{contentText}</Text>
        ) : (
          <>
            <Skeleton height="20px" width="95%" mb="2" />
          </>
        )}
        {!hideCommentUserActions && commentId && (
          <Box>
            <HStack alignItems="center" justifyContent="space-between">
              <HStack space="3" alignItems="center">
                <Pressable
                  onPress={() => {
                    voteHandler("UPVOTE");
                  }}
                >
                  <HStack alignItems="flex-end">
                    <Icon
                      as={<AntDesign name="caretcircleoup" />}
                      size={5}
                      color={action === "UPVOTE" ? "green.500" : "muted.500"}
                    />
                    {/* <Text ml="1" fontSize="xs">
                      1.5k
                    </Text> */}
                  </HStack>
                </Pressable>
                <Pressable
                  onPress={() => {
                    voteHandler("DOWNVOTE");
                  }}
                >
                  <HStack alignItems="flex-end">
                    <Box style={styles.downVoteIcon}>
                      <Icon
                        as={<AntDesign name="caretcircleoup" />}
                        size={5}
                        color={action === "DOWNVOTE" ? "red.500" : "muted.500"}
                      />
                    </Box>
                    {/* <Text ml="1" fontSize="xs">
                      85k
                    </Text> */}
                  </HStack>
                </Pressable>
                {!hideReplyButton && (
                  <Pressable
                    onPress={() => {
                      navigation.navigate("Application", {
                        screen: "AddAndEditReplies",
                        params: {
                          username,
                          avatarUrl,
                          subForum,
                          commentAuthorId,
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
                    <HStack alignItems="flex-end">
                      <Box>
                        <Icon
                          as={<Entypo name="reply" />}
                          size={5}
                          color={"muted.500"}
                        />
                      </Box>
                    </HStack>
                  </Pressable>
                )}
              </HStack>
              {!!repliesCount && (
                <Pressable
                  onPress={() => {
                    navigation.navigate("Application", {
                      screen: "Comment",
                      params: {
                        username,
                        avatarUrl,
                        subForum,
                        postId,
                        commentAuthorId,
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
 * Todo-6: comment user action handlers input
 * Todo-7: comment user action handlers
 */

/**
 * api
 */

interface CommentUserActionCreationFetchInput_ {
  type: "UPVOTE" | "DOWNVOTE";
  userId: string; // user id of current user
  postId: string;
  commentId: string;
  communityId: string;
  commentAuthorId: string;
}

interface CommentUserActionCheckFetchInput_ {
  commentId: string;
  userId: string;
}

interface UpdateCommentUserActionFetchInput_ {
  id: string;
  type: "UPVOTE" | "DOWNVOTE";
  userId: string;
  commentId: string;
  postId: string;
  communityId: string;
  _version: number;
}

interface DeleteCommentUserActionInput_
  extends UpdateCommentUserActionFetchInput_ {
  isDeleted: boolean;
}

interface DeleteCommentUserActionFetchInput_ {
  userId: string;
  commentId: string;
  commentAuthorId: string;
  communityId: string;
  postId: string;
}

const CommentUserActionCreationFetch = async (
  args: CommentUserActionCreationFetchInput_
) => {
  try {
    // check if user already made an action
    const { commentAuthorId, ...input } = args;

    const isCommentUserActionExistInput: CommentUserActionCheckFetchInput_ = {
      userId: input.userId,
      commentId: input.commentId,
    };

    const isCommentUserActionExist = (await API.graphql({
      query: CheckCommentUserAction,
      variables: isCommentUserActionExistInput,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<CheckCommentUserAction_>;

    // if user action already exist update the existing one
    if (
      isCommentUserActionExist.data?.listUserCommentMetricsRelationShips &&
      isCommentUserActionExist.data?.listUserCommentMetricsRelationShips.items
        .length === 1
    ) {
      const existingCommentUserAction =
        isCommentUserActionExist.data?.listUserCommentMetricsRelationShips
          .items[0];

      const updateCommentUserActionInput: UpdateCommentUserActionFetchInput_ = {
        id: existingCommentUserAction.id,
        postId: input.postId,
        userId: input.userId,
        commentId: input.commentId,
        communityId: input.communityId,
        type: input.type,
        _version: existingCommentUserAction._version,
      };

      const updateCommentUserAction = (await API.graphql({
        query: UpdateUserCommentMetricsRelationShip,
        variables: { input: updateCommentUserActionInput },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as GraphQLResult<UpdateUserCommentMetricsRelationShip_>;

      if (updateCommentUserAction.data?.updateUserCommentMetricsRelationShip) {
        // decrement existing user and post metrics and increment latest user and comment metrics

        await API.graphql({
          query:
            MetricsQueryPicker[existingCommentUserAction.type].COMMENT
              .DECREMENT,
          variables: { id: input.commentId },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });

        await API.graphql({
          query:
            MetricsQueryPicker[existingCommentUserAction.type].USERMETRICS
              .DECREMENT,
          variables: { id: commentAuthorId },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });

        await API.graphql({
          query: MetricsQueryPicker[input.type].COMMENT.INCREMENT,
          variables: { id: input.commentId },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });

        await API.graphql({
          query: MetricsQueryPicker[input.type].USERMETRICS.INCREMENT,
          variables: { id: commentAuthorId },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });

        return updateCommentUserAction.data.updateUserCommentMetricsRelationShip
          .id;
      }
    } else {
      // if user action doesnt exist create new
      const createCommentUserAction = (await API.graphql({
        query: CreateUserCommentMetricsRelationShip,
        variables: { input },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as GraphQLResult<CreateUserCommentMetricsRelationShip_>;

      if (createCommentUserAction.data?.createUserCommentMetricsRelationShip) {
        // increment user and comment metrics
        await API.graphql({
          query: MetricsQueryPicker[input.type].COMMENT.INCREMENT,
          variables: { id: input.commentId },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });

        await API.graphql({
          query: MetricsQueryPicker[input.type].USERMETRICS.INCREMENT,
          variables: { id: commentAuthorId },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        return createCommentUserAction.data.createUserCommentMetricsRelationShip
          .id;
      }
    }
  } catch (err) {
    console.error("Error occured creating user action for comment", err);
  }
};

const CommentUserActionDeletionFetch = async (
  args: DeleteCommentUserActionFetchInput_
) => {
  try {
    const { commentAuthorId, ...input } = args;
    // check if user already made an action

    const isCommentUserActionExistInput: CommentUserActionCheckFetchInput_ = {
      userId: input.userId,
      commentId: input.commentId,
    };

    const isCommentUserActionExist = (await API.graphql({
      query: CheckCommentUserAction,
      variables: isCommentUserActionExistInput,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<CheckCommentUserAction_>;

    if (
      isCommentUserActionExist.data?.listUserCommentMetricsRelationShips &&
      isCommentUserActionExist.data?.listUserCommentMetricsRelationShips.items
        .length === 1
    ) {
      const existingCommentUserAction =
        isCommentUserActionExist.data?.listUserCommentMetricsRelationShips
          .items[0];

      const deleteCommentUserActionInput: DeleteCommentUserActionInput_ = {
        id: existingCommentUserAction.id,
        postId: input.postId,
        userId: input.userId,
        commentId: input.commentId,
        communityId: input.communityId,
        type: existingCommentUserAction.type,
        _version: existingCommentUserAction._version,
        isDeleted: true,
      };

      const deletedCommentUserAction = (await API.graphql({
        query: UpdateUserCommentMetricsRelationShip,
        variables: { input: deleteCommentUserActionInput },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as GraphQLResult<UpdateUserCommentMetricsRelationShip_>;

      if (deletedCommentUserAction.data?.updateUserCommentMetricsRelationShip) {
        // decrement user and post metrics
        await API.graphql({
          query:
            MetricsQueryPicker[existingCommentUserAction.type].COMMENT
              .DECREMENT,
          variables: { id: input.commentId },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });

        await API.graphql({
          query:
            MetricsQueryPicker[existingCommentUserAction.type].USERMETRICS
              .DECREMENT,
          variables: { id: commentAuthorId },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });

        return deletedCommentUserAction.data
          .updateUserCommentMetricsRelationShip.id;
      }
    }
  } catch (err) {
    console.error("Error occured deleting user action for comment", err);
  }
};

/**
 * graphql queries and their types
 * types pattern {queryName}_
 * * note dash(_) at the end of type name
 * order 1.queryType 2.graphql query
 */

interface CheckCommentUserAction_ {
  listUserCommentMetricsRelationShips?: {
    items: Item[];
  };
}

interface Item {
  id: string;
  type: "UPVOTE" | "DOWNVOTE";
  postId: string;
  userId: string;
  communityId: string;
  commentId: string;
  _version: number;
}

const CheckCommentUserAction = /* GraphQL */ `
  query CheckCommentUserAction($commentId: ID!, $userId: ID!) {
    listUserCommentMetricsRelationShips(
      filter: {
        commentId: { eq: $commentId }
        userId: { eq: $userId }
        isDeleted: { attributeExists: false }
      }
    ) {
      items {
        id
        type
        postId
        userId
        communityId
        commentId
        _version
      }
    }
  }
`;

interface CreateUserCommentMetricsRelationShip_ {
  createUserCommentMetricsRelationShip?: Item;
}

const CreateUserCommentMetricsRelationShip = /* GraphQL */ `
  mutation CreateUserCommentMetricsRelationShip(
    $input: CreateUserCommentMetricsRelationShipInput!
  ) {
    createUserCommentMetricsRelationShip(input: $input) {
      id
      type
      postId
      userId
      communityId
      commentId
      _version
    }
  }
`;

interface UpdateUserCommentMetricsRelationShip_ {
  updateUserCommentMetricsRelationShip?: Item;
}

const UpdateUserCommentMetricsRelationShip = /* GraphQL */ `
  mutation UpdateUserCommentMetricsRelationShip(
    $input: UpdateUserCommentMetricsRelationShipInput!
  ) {
    updateUserCommentMetricsRelationShip(input: $input) {
      id
      type
      postId
      userId
      communityId
      commentId
      _version
    }
  }
`;

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
