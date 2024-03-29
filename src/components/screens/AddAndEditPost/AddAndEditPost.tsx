import { GraphQLResult } from "@aws-amplify/api-graphql";
import { AntDesign } from "@expo/vector-icons";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { API } from "aws-amplify";
import { addDays } from "date-fns";
import {
  Box,
  Button,
  HStack,
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
import xssFilters from "xss-filters";

import {
  RootStackParamList_,
  StackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { BackButton } from "@/root/src/components/shared/Button";
import { DocumentPickerButton } from "@/root/src/components/shared/Picker";
import { CommunityTile } from "@/root/src/components/shared/Tile";
import { UserContext } from "@/root/src/context";

type RouteProp_ = RouteProp<StackParamList_, "AddAndEditPost">;

type NavigationProp_ = CompositeNavigationProp<
  StackNavigationProp<StackParamList_, "AddAndEditPost">,
  StackNavigationProp<RootStackParamList_, "Application">
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
  const [PollQuestion, setPollQuestion] = React.useState("");
  const [Option, setOption] = React.useState(""); // poll option input
  const [PollOption, setPollOption] = React.useState<PollType_[]>([]); // poll options
  const [mediaS3Key, setMediaS3Key] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isContentValid, setContentValid] = React.useState(false);
  const [contentErrorMsg, setContentErrorMsg] = React.useState("");

  const [isPollAnswersValid, setPollAnswersValid] = React.useState(false);
  const [pollAnswerErrorMsg, setPollAnswerErrorMsg] = React.useState("");

  const [isPollQuestionValid, setPollQuestionValid] = React.useState(false);
  const [pollQuestionErrorMsg, setPollQuestionErrorMsg] = React.useState("");

  const currentUser = React.useContext(UserContext).user;

  const { hideUpload, postType } = route.params;

  const handleSubmit = React.useCallback(async () => {
    if (route.params.postType !== "Poll") {
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
        } else {
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
    } else {
      if (isPollQuestionValid) {
        if (isPollAnswersValid) {
          if (isContentValid) {
            setLoading(true);
            const surveyInput = {
              question: PollQuestion,
              answers: PollOption.map((entry) => entry.content),
              communityId: route.params.communityId,
              surveyPurpose: Content,
              userId: currentUser.id,
              startDate: new Date(),
              endDate: addDays(new Date(), 2),
            };

            const createdSurveyId = await createSurveyAndTimelineFetch(
              surveyInput
            );

            if (createdSurveyId) {
              navigation.navigate({
                name: "BottomTabNav",
                params: {
                  screen: "Survey",
                },
                merge: true,
              });
            }
            setLoading(false);
          } else {
            Alert.alert(contentErrorMsg);
          }
        } else {
          Alert.alert(pollAnswerErrorMsg);
        }
      } else {
        Alert.alert(pollQuestionErrorMsg);
      }
    }
  }, [
    Content,
    PollOption,
    PollQuestion,
    contentErrorMsg,
    currentUser.id,
    isContentValid,
    isPollAnswersValid,
    isPollQuestionValid,
    mediaS3Key,
    navigation,
    pollAnswerErrorMsg,
    pollQuestionErrorMsg,
    route.params.communityId,
    route.params.postType,
  ]);

  React.useEffect(() => {
    const validateContent = () => {
      if (isLength(Content, { min: 1, max: 2200 })) {
        setContentValid(true);
        setContentErrorMsg("");
      } else {
        setContentValid(false);
        setContentErrorMsg("Post Content Shouldn't be empty");
      }
    };
    validateContent();
  }, [Content]);

  React.useEffect(() => {
    const validatePollQuestion = () => {
      if (isLength(PollQuestion, { min: 3, max: 140 })) {
        setPollQuestionValid(true);
        setPollQuestionErrorMsg("");
      } else {
        setPollQuestionValid(false);
        setPollQuestionErrorMsg(
          "Survey question should between min 3 and max 140"
        );
      }
    };
    validatePollQuestion();
  }, [PollQuestion]);

  React.useEffect(() => {
    const validatePollAnswer = () => {
      if (PollOption.length < 2) {
        setPollAnswersValid(false);
        setPollAnswerErrorMsg("Survey answers should be atleast two");
        return;
      }

      const PollAnswersValid = PollOption.every((entry) =>
        isLength(entry.content, { min: 2, max: 30 })
      );

      if (PollAnswersValid) {
        setPollAnswersValid(true);
        setPollAnswerErrorMsg("");
      } else {
        setPollAnswersValid(false);
        setPollAnswerErrorMsg("Survey answer should between min 2 and max 30");
      }
    };
    validatePollAnswer();
  }, [PollOption]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton color="eGreen.400" />,
      headerRight: () => (
        <Button
          _text={{ fontWeight: "600", color: "eGreen.400" }}
          onPress={!loading ? handleSubmit : null}
          size="md"
          variant="unstyled"
        >
          {!loading ? "Post" : <Spinner color="eGreen.400" />}
        </Button>
      ),
    });
  }, [handleSubmit, navigation, loading]);

  const pollAdditionHandler = () => {
    if (!Option) {
      return;
    }
    setPollOption((prev) => [...prev, { content: Option }]);
    setOption("");
  };

  const pollRemovalHandler = (selectedPoll: String) => {
    setPollOption((prev) =>
      prev.filter((entry) => entry.content !== selectedPoll)
    );
  };

  const sanitizeContent = (text: string) => {
    setContent(xssFilters.inHTMLData(text));
  };

  const sanitizePollQuestion = (text: string) => {
    setPollQuestion(xssFilters.inHTMLData(text));
  };

  const sanitizePollAnswer = (text: string) => {
    setOption(xssFilters.inHTMLData(text));
  };

  return (
    <VStack
      bg="white"
      justifyContent={postType !== "Poll" ? "space-between" : "flex-start"}
      style={styles.container}
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
        <Box alignItems="center" bg="white">
          <Box width="90%">
            <Input
              fontSize="md"
              maxLength={100}
              multiline
              numberOfLines={2}
              onChangeText={sanitizePollQuestion}
              placeholder="Question"
              placeholderTextColor="muted.400"
              value={PollQuestion}
              variant="unstyled"
            />
            <Box mt="2">
              {PollOption.map((entry, index) => {
                return (
                  <HStack alignItems="center">
                    <Text
                      key={`poll-${index}`}
                      alignItems="center"
                      bg="muted.100"
                      borderRadius="5"
                      mb="2"
                      minHeight="50px"
                      p="3"
                      width="85%"
                    >
                      {entry.content}
                    </Text>

                    <Pressable
                      alignItems="center"
                      bg="danger.400"
                      height="50px"
                      justifyContent="center"
                      mb="2"
                      onPress={() => pollRemovalHandler(entry.content)}
                      width="15%"
                    >
                      <Icon
                        as={<AntDesign name="plus" />}
                        color="white"
                        size={4}
                        style={styles.cancelIcon}
                      />
                    </Pressable>
                  </HStack>
                );
              })}
            </Box>
            {/* max poll array length is 5. hide input if that exceed  */}
            {PollOption.length <= 4 && (
              <HStack alignItems="center">
                <Input
                  bg="muted.100"
                  fontSize="sm"
                  maxLength={30}
                  onChangeText={sanitizePollAnswer}
                  p="4"
                  placeholder="Add Option"
                  placeholderTextColor="muted.400"
                  value={Option}
                  variant="unstyled"
                  width="85%"
                />
                <Pressable
                  alignItems="center"
                  bg="eGreen.400"
                  height="50px"
                  justifyContent="center"
                  onPress={pollAdditionHandler}
                  width="15%"
                >
                  <Icon as={<AntDesign name="plus" />} color="white" size={4} />
                </Pressable>
              </HStack>
            )}
            <Input
              fontSize="sm"
              maxLength={140}
              mt="2"
              multiline
              onChangeText={sanitizeContent}
              placeholder="Purpose of this poll"
              placeholderTextColor="muted.400"
              value={Content}
              variant="unstyled"
            />
          </Box>
        </Box>
      )}
      {postType !== "Poll" && (
        <Box alignItems="center" bg="white" height={"90%"}>
          <Input
            borderRadius="md"
            fontSize="sm"
            multiline
            onChangeText={sanitizeContent}
            placeholder="Craft your post!"
            placeholderTextColor="muted.400"
            value={Content}
            variant="unstyled"
            width="90%"
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
    const postTimelineCreationData = (await API.graphql({
      query: createPostAndTimeline,
      variables: input,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<createPostAndTimeline_>;

    if (postTimelineCreationData.data?.createPostAndTimeline) {
      const postId = postTimelineCreationData.data.createPostAndTimeline;

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

interface createSurveyAndTimelineFetch_ {
  answers: string[];
  communityId: string;
  endDate: Date;
  startDate: Date;
  userId: string;
  surveyPurpose: string;
  question: string;
}

const createSurveyAndTimelineFetch = async (
  input: createSurveyAndTimelineFetch_
) => {
  try {
    const surveyTimelineCreationData = (await API.graphql({
      query: createSurveyAndTimeline,
      variables: input,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<createSurveyAndTimeline_>;

    if (surveyTimelineCreationData.data?.createSurveyAndTimeline) {
      const surveyId = surveyTimelineCreationData.data.createSurveyAndTimeline;

      // increment total survey in users metrics and community
      await API.graphql({
        query: SurveyMetricsQueryPicker.USERMETRICS.TOTALSURVEY.INCREMENT,
        variables: {
          id: input.userId,
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });

      await API.graphql({
        query: SurveyMetricsQueryPicker.COMMUNITY.TOTALSURVEY.INCREMENT,
        variables: {
          id: input.communityId,
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });

      return surveyId;
    }
  } catch (err) {
    console.error("Error occured while creating a survey", err);
  }
};

type createSurveyAndTimeline_ = {
  createSurveyAndTimeline?: {
    id: string;
  };
};

const createSurveyAndTimeline = /* GraphQL */ `
  mutation createSurveyAndTimeline(
    $answers: [String!]!
    $communityId: ID!
    $endDate: AWSDateTime!
    $question: String!
    $surveyPurpose: String!
    $startDate: AWSDateTime!
    $userId: ID!
  ) {
    createSurveyAndTimeline(
      answers: $answers
      communityId: $communityId
      endDate: $endDate
      startDate: $startDate
      userId: $userId
      surveyPurpose: $surveyPurpose
      question: $question
    ) {
      id
    }
  }
`;

const IncrementTotalSurveysUserMetrics = /* GraphQL */ `
  mutation incrementTotalSurveysUserMetrics($id: ID!) {
    incrementTotalSurveysUserMetrics(id: $id) {
      id
    }
  }
`;

const IncrementTotalSurveysCommunity = /* GraphQL */ `
  mutation incrementTotalSurveysCommunity($id: ID!) {
    incrementTotalSurveysCommunity(id: $id) {
      id
    }
  }
`;

const SurveyMetricsQueryPicker = {
  COMMUNITY: {
    TOTALSURVEY: {
      INCREMENT: IncrementTotalSurveysCommunity,
    },
  },
  USERMETRICS: {
    TOTALSURVEY: {
      INCREMENT: IncrementTotalSurveysUserMetrics,
    },
  },
};
