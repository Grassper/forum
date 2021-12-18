import { GraphQLResult } from "@aws-amplify/api-graphql";
import { useFocusEffect } from "@react-navigation/native";
import { API } from "aws-amplify";
import React from "react";
import {
  FlatList,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import {
  PostCard,
  Props_ as PostCardProps_,
} from "@/root/src/components/shared/Cards/PostCard";
import { UserContext } from "@/root/src/context";

export const Survey: React.FC = () => {
  const {
    user: { id },
  } = React.useContext(UserContext);

  const [surveys, setSurveys] = React.useState<SurveyTimeLineItem_[]>([]);
  const [nextToken, setNextToken] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);

  const populateContent = React.useCallback(() => {
    let isActive = true;

    const fetchCall = async () => {
      if (id) {
        setLoading(true);
        const listSurveyInput: listSurveyTimelineByUserIdFetchInput_ = {
          id: id,
          limit: 10,
          sortDirection: "DESC",
        };

        const responseData = await listSurveyTimelineByUserIdFetch(
          listSurveyInput
        );
        if (responseData && isActive) {
          setSurveys(responseData.items);
          setNextToken(responseData.nextToken);
        }
        if (isActive) {
          setLoading(false);
        }
      }
    };
    fetchCall();

    return () => {
      isActive = false;
    };
  }, [id]);

  useFocusEffect(populateContent);

  const PostCardRenderer: ListRenderItem<SurveyTimeLineItem_> = ({ item }) => {
    const { surveyQuestion } = item;
    let votedPollId = "";
    let totalVotes = 0;

    const surveyAnswers = surveyQuestion.surveyAnswer.items.map((entry) => {
      totalVotes += entry.voteCount;

      if (entry.userSurveyMetric.items.length !== 0) {
        votedPollId = entry.userSurveyMetric.items[0].surveyAnswerId;
      }
      return {
        id: entry.id,
        content: entry.content,
        votes: entry.voteCount,
      };
    });

    const surveyInput: PostCardProps_["poll"] = {
      title: surveyQuestion.content,
      pollArr: surveyAnswers,
      totalVotes: totalVotes,
      timeStamp: surveyQuestion.endDate,
      votedPollId: votedPollId, //optional
    };

    return (
      <PostCard
        id={surveyQuestion.id}
        subForum={surveyQuestion.community.name}
        subForumId={surveyQuestion.community.id}
        type="Poll"
        poll={surveyInput}
        username={surveyQuestion.user.username}
        authorId={surveyQuestion.user.id}
        avatarUrl={surveyQuestion.user.profileImageUrl}
        timeStamp={surveyQuestion.createdAt}
        contentText={surveyQuestion.surveyPurpose}
        hidePostUserActions
      />
    );
  };

  const handlePagination = async () => {
    if (nextToken && id) {
      const listSurveyInput: listSurveyTimelineByUserIdFetchInput_ = {
        id: id,
        limit: 10,
        sortDirection: "DESC",
        nextToken,
      };

      const responseData = await listSurveyTimelineByUserIdFetch(
        listSurveyInput
      );

      if (responseData) {
        setSurveys((prevState) => [...prevState, ...responseData.items]);
        setNextToken(responseData.nextToken);
      }
    }
  };

  return (
    <View style={styles.container}>
      {!loading ? (
        <FlatList
          data={surveys}
          renderItem={PostCardRenderer}
          keyExtractor={(item) => item.surveyQuestion.id}
          onEndReached={() => handlePagination()}
        />
      ) : (
        <ScrollView>
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

/**
 * api calls
 */

interface listSurveyTimelineByUserIdFetchInput_ {
  id: string;
  limit: number;
  sortDirection: "ASC" | "DESC";
  nextToken?: string;
}

const listSurveyTimelineByUserIdFetch = async (
  input: listSurveyTimelineByUserIdFetchInput_
) => {
  try {
    const listSurveyTimelineData = (await API.graphql({
      query: listSurveyTimelineByUserId,
      variables: input,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<listSurveyTimelineByUserId_>;

    if (listSurveyTimelineData.data?.getUser) {
      const { surveyTimeLine } = listSurveyTimelineData.data.getUser;
      return surveyTimeLine;
    }
  } catch (err) {
    console.error(
      "Error occured while fetching survey timeline in survey screen",
      err
    );
  }
};

/**
 * grapql types and queries
 * fetch surveys by id and render it to flatlist
 */

interface listSurveyTimelineByUserId_ {
  getUser?: GetUser_;
}

interface GetUser_ {
  surveyTimeLine: SurveyTimeLine_;
}

interface SurveyTimeLine_ {
  nextToken: string;
  items: SurveyTimeLineItem_[];
}

interface SurveyTimeLineItem_ {
  surveyQuestion: SurveyQuestion_;
}

interface SurveyQuestion_ {
  id: string;
  content: string;
  surveyPurpose: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  surveyAnswer: SurveyAnswer_;
  community: Community_;
  user: User_;
}

interface Community_ {
  id: string;
  name: string;
}

interface SurveyAnswerItem_ {
  id: string;
  content: string;
  voteCount: number;
  userSurveyMetric: { items: { surveyAnswerId: string }[] };
}

interface SurveyAnswer_ {
  items: SurveyAnswerItem_[];
}

interface User_ {
  id: string;
  username: string;
  profileImageUrl: string;
}

const listSurveyTimelineByUserId = /* GraphQL */ `
  query listSurveyTimelineByUserId(
    $id: ID!
    $limit: Int
    $sortDirection: ModelSortDirection
    $nextToken: String
  ) {
    getUser(id: $id) {
      surveyTimeLine(
        limit: $limit
        sortDirection: $sortDirection
        nextToken: $nextToken
      ) {
        nextToken
        items {
          surveyQuestion {
            id
            content
            surveyPurpose
            startDate
            endDate
            createdAt
            surveyAnswer {
              items {
                id
                content
                voteCount
                userSurveyMetric(
                  filter: {
                    isDeleted: { attributeExists: false }
                    userId: { eq: $id }
                  }
                ) {
                  items {
                    surveyAnswerId
                  }
                }
              }
            }
            community {
              id
              name
            }
            user {
              id
              username
              profileImageUrl
            }
          }
        }
      }
    }
  }
`;

/**
 * Todo-4: update metrics in community, users while create
 * Todo-5: survey screen
 * Todo-6: report poll
 * Todo-7: update poll
 */
