import { GraphQLResult } from "@aws-amplify/api-graphql";
import { AntDesign } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { API } from "aws-amplify";
import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Pressable,
  Spinner,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { Alert, StyleSheet } from "react-native";
import isLength from "validator/es/lib/isLength";
import matches from "validator/es/lib/matches";

import {
  DrawerParamList_,
  RootStackParamList_,
  StackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { DocumentPickerButton } from "@/root/src/components/shared/Picker";
import { CommunityTile } from "@/root/src/components/shared/Tile";
import { UserContext } from "@/root/src/context";

type RouteProp_ = RouteProp<StackParamList_, "AddAndEditPost">;

type NavigationProp_ = CompositeNavigationProp<
  StackNavigationProp<StackParamList_, "AddAndEditPost">,
  CompositeNavigationProp<
    DrawerNavigationProp<DrawerParamList_, "StackNav">,
    StackNavigationProp<RootStackParamList_, "Application">
  >
>;
interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}

interface PollType_ {
  content: string;
}

export const AddAndEditPost: React.FC<Props_> = ({ navigation, route }) => {
  const [Content, setContent] = React.useState(""); // post content
  const [PollTitle, setPollTitle] = React.useState("");
  const [Option, setOption] = React.useState(""); // poll option input
  const [Polls, setPoll] = React.useState<PollType_[]>([]); // poll options
  const [mediaS3Key, setMediaS3Key] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isContentValid, setContentValid] = React.useState(false);
  const [contentErrorMsg, setContentErrorMsg] = React.useState("");

  const currentUser = React.useContext(UserContext).user;

  const { hideUpload, postType } = route.params;

  const handleSubmit = React.useCallback(async () => {
    if (isContentValid) {
      setLoading(true);
      let postInput: createPostAndTimelineFetchInput_ = {
        authorId: currentUser.id,
        communityId: route.params.communityId,
        content: Content,
        postedDate: new Date(),
        tags: ["Testing tags"],
        type: route.params.postType.toUpperCase() as createPostAndTimelineFetchInput_["type"],
      };
      if (route.params.postType === "Text") {
        const createdPostId = await createPostAndTimelineFetch(postInput);

        if (createdPostId) {
          navigation.navigate({
            name: "BottomTabNav",
            params: {
              screen: "Home",
            },
            merge: true,
          });
        }
      } else if (route.params.postType !== "Poll") {
        if (mediaS3Key) {
          postInput = {
            ...postInput,
            mediaS3Key,
          };

          const createdPostId = await createPostAndTimelineFetch(postInput);

          if (createdPostId) {
            navigation.navigate({
              name: "BottomTabNav",
              params: {
                screen: "Home",
              },
              merge: true,
            });
          }
        } else {
          Alert.alert(
            `Attachment is required for ${route.params.postType} post`
          );
        }
      }
      setLoading(false);
    } else {
      Alert.alert(contentErrorMsg);
    }
  }, [
    Content,
    contentErrorMsg,
    currentUser.id,
    isContentValid,
    mediaS3Key,
    navigation,
    route.params.communityId,
    route.params.postType,
  ]);

  React.useEffect(() => {
    const validateContent = () => {
      if (
        isLength(Content, { min: 1, max: 2200 }) &&
        matches(Content, "^[A-Za-z][A-Za-z0-9 _|.,!]{1,2200}$", "m")
      ) {
        setContentValid(true);
        setContentErrorMsg("");
      } else {
        setContentValid(false);
        setContentErrorMsg("Post Content Shouldn't be empty");
      }
    };
    validateContent();
  }, [Content]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          size="md"
          _text={{ fontWeight: "600", color: "white" }}
          variant="unstyled"
          onPress={!loading ? handleSubmit : null}
        >
          {!loading ? "Post" : <Spinner color="indigo.500" />}
        </Button>
      ),
    });
  }, [handleSubmit, navigation, loading]);

  return (
    <VStack
      style={styles.container}
      bg="white"
      justifyContent={postType !== "Poll" ? "space-between" : "flex-start"}
    >
      <CommunityTile
        hideDivider
        hideMembers
        hideNavArrow
        name={route.params.name}
        profileImageS3Key={route.params.profileImageS3Key}
      />
      {/* if poll exist */}
      {postType === "Poll" && (
        <Box bg="white" alignItems="center">
          <Box width="90%">
            <Input
              multiline
              numberOfLines={2}
              maxLength={100}
              value={PollTitle}
              onChangeText={setPollTitle}
              placeholder="Title"
              placeholderTextColor="muted.400"
              fontSize="md"
              variant="unstyled"
            />
            <Box mt="2">
              {Polls.map((entry, index) => {
                return (
                  <Flex flexDirection="row" alignItems="center">
                    <Text
                      key={`poll-${index}`}
                      p="3"
                      width="85%"
                      bg="muted.100"
                      mb="2"
                      minHeight="50px"
                      alignItems="center"
                      borderRadius="5"
                    >
                      {entry.content}
                    </Text>

                    <Pressable
                      bg="danger.400"
                      width="15%"
                      height="50px"
                      mb="2"
                      alignItems="center"
                      justifyContent="center"
                      onPress={() => {
                        setPoll((prev) =>
                          prev.filter(
                            (entry1) => entry1.content !== entry.content
                          )
                        );
                      }}
                    >
                      <Icon
                        as={<AntDesign name="plus" />}
                        size={4}
                        style={styles.cancelIcon}
                        color="white"
                      />
                    </Pressable>
                  </Flex>
                );
              })}
            </Box>
            {/* max poll array length is 3. hide input if that exceed  */}
            {Polls.length <= 2 && (
              <Flex flexDirection="row" alignItems="center">
                <Input
                  bg="muted.100"
                  p="4"
                  maxLength={30}
                  width="85%"
                  value={Option}
                  onChangeText={setOption}
                  placeholder="Add Option"
                  placeholderTextColor="muted.400"
                  fontSize="sm"
                  variant="unstyled"
                />
                <Pressable
                  bg="eGreen.400"
                  width="15%"
                  height="50px"
                  alignItems="center"
                  justifyContent="center"
                  onPress={() => {
                    setPoll((prev) => [...prev, { content: Option }]);
                    setOption("");
                  }}
                >
                  <Icon as={<AntDesign name="plus" />} size={4} color="white" />
                </Pressable>
              </Flex>
            )}
            <Input
              mt="2"
              maxLength={140}
              multiline
              value={Content}
              onChangeText={setContent}
              placeholder="Purpose of this poll"
              placeholderTextColor="muted.400"
              fontSize="sm"
              variant="unstyled"
            />
          </Box>
        </Box>
      )}
      {postType !== "Poll" && (
        <Box bg="white" alignItems="center" height={"90%"}>
          <Input
            multiline
            value={Content}
            width="90%"
            onChangeText={setContent}
            borderRadius="md"
            placeholder="Craft your post!"
            placeholderTextColor="muted.400"
            fontSize="sm"
            variant="unstyled"
          />
        </Box>
      )}
      {!hideUpload && (
        <DocumentPickerButton
          postType={postType}
          setMediaS3Key={setMediaS3Key}
        />
      )}
    </VStack>
  );
};

const styles = StyleSheet.create({
  cancelIcon: {
    transform: [{ rotate: "45deg" }],
  },
  container: { flex: 1 },
});

/**
 * Todo-1: poll post schema check
 * Todo-2: complete the poll
 * Todo-3: tags section maximum 5
 * Todo-4: complete the post screen
 */

/**
 * api calls
 */

interface createPostAndTimelineFetchInput_ {
  authorId: string;
  communityId: string;
  content: string;
  postedDate: Date;
  tags: [string];
  type: "IMAGE" | "TEXT" | "VIDEO" | "AUDIO" | "POLL";
  mediaS3Key?: String;
}

const createPostAndTimelineFetch = async (
  input: createPostAndTimelineFetchInput_
) => {
  try {
    const listCommunityData = (await API.graphql({
      query: createPostAndTimeline,
      variables: input,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<createPostAndTimeline_>;

    if (listCommunityData.data?.createPostAndTimeline) {
      const postId = listCommunityData.data.createPostAndTimeline;

      /**
       * increment total posts in current user and community
       */

      await API.graphql({
        query: MetricsQueryPicker.USERMETRICS.TOTALPOST.INCREMENT,
        variables: {
          id: input.authorId,
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });

      await API.graphql({
        query: MetricsQueryPicker.COMMUNITY.TOTALPOST.INCREMENT,
        variables: {
          id: input.communityId,
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });

      return postId;
    }
  } catch (err) {
    console.error("Error occured while creating a post", err);
  }
};

/**
 * graphql queries and their types
 * types pattern {queryName}_
 * * note dash(_) at the end of type name
 * order 1.queryType 2.graphql query
 */

type createPostAndTimeline_ = {
  createPostAndTimeline?: {
    id: string;
  };
};

const createPostAndTimeline = /* GraphQL */ `
  mutation createPost(
    $authorId: ID!
    $communityId: ID!
    $content: String!
    $postedDate: AWSDateTime!
    $tags: [String!]!
    $type: PostType!
    $mediaS3Key: String
  ) {
    createPostAndTimeline(
      authorId: $authorId
      communityId: $communityId
      content: $content
      tags: $tags
      type: $type
      postedDate: $postedDate
      mediaS3Key: $mediaS3Key
    ) {
      id
    }
  }
`;

/**
 * community metrics
 */

const IncrementTotalPostsCommunity = /* GraphQL */ `
  mutation incrementTotalPostsCommunity($id: ID!) {
    incrementTotalPostsCommunity(id: $id) {
      id
    }
  }
`;

/**
 * user metrics
 */

const IncrementTotalPostsUserMetrics = /* GraphQL */ `
  mutation incrementTotalPostsUserMetrics($id: ID!) {
    incrementTotalPostsUserMetrics(id: $id) {
      id
    }
  }
`;

const MetricsQueryPicker = {
  COMMUNITY: {
    TOTALPOST: {
      INCREMENT: IncrementTotalPostsCommunity,
    },
  },
  USERMETRICS: {
    TOTALPOST: {
      INCREMENT: IncrementTotalPostsUserMetrics,
    },
  },
};
