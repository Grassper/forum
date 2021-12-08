import { GraphQLResult } from "@aws-amplify/api-graphql";
import { Foundation } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { API } from "aws-amplify";
import {
  Avatar,
  Box,
  Button,
  HStack,
  Icon,
  Image,
  Pressable,
  Text,
} from "native-base";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";

import { Skeleton } from "@/root/src/components/shared/Skeleton";
import { UserContext } from "@/root/src/context";
import { SignS3ImageKey } from "@/root/src/utils/helpers";

interface Props_ {
  id?: string;
  name?: string;
  description?: string;
  profileImageS3Key?: string;
  coverImageS3Key?: string;
  _version?: number;
  creatorId?: string;
  totalMembers?: number;
  totalPosts?: number;
  members?: { items: { userId: string }[] };
}

const windowWidth = Dimensions.get("window").width;

export const SubForumCard: React.FC<Props_> = ({
  id,
  name,
  description,
  profileImageS3Key,
  coverImageS3Key,
  creatorId,
  _version,
  members,
  totalMembers,
  totalPosts,
}) => {
  const [relationship, setRelationship] = React.useState<
    "JOINED" | "NOTJOINED"
  >("NOTJOINED");

  const [signedProfile, setSignedProfile] = React.useState("");
  const [signedCover, setSignedCover] = React.useState("");

  const currentUser = React.useContext(UserContext).user;
  const navigation = useNavigation();

  React.useEffect(() => {
    if (
      members &&
      members.items.length === 1 &&
      members.items[0].userId === currentUser.id
    ) {
      setRelationship("JOINED");
    }
  }, [currentUser.id, members]);

  const signImage = React.useCallback(() => {
    let isActive = true;

    const signing = async () => {
      if (profileImageS3Key) {
        const signedImage = await SignS3ImageKey(profileImageS3Key);
        if (signedImage && isActive) {
          setSignedProfile(signedImage);
        }
      }
      if (coverImageS3Key) {
        const signedImage = await SignS3ImageKey(coverImageS3Key);
        if (signedImage && isActive) {
          setSignedCover(signedImage);
        }
      }
    };

    signing();

    return () => {
      isActive = false;
    };
  }, [profileImageS3Key, coverImageS3Key]);

  useFocusEffect(signImage);

  const RelationshipHandler = () => {
    if (id && creatorId && currentUser.id && creatorId !== currentUser.id) {
      if (relationship === "NOTJOINED") {
        setRelationship("JOINED");

        // create user forum relationship call
        UserForumRelationFetch({
          userId: currentUser.id,
          communityId: id,
          action: "ADD",
        });
      } else {
        setRelationship("NOTJOINED");

        // delete user forum relationship call
        UserForumRelationFetch({
          userId: currentUser.id,
          communityId: id,
          action: "DELETE",
        });
      }
    }
  };

  return (
    <Box>
      <Box position="relative" height="115px">
        {signedCover ? (
          <Image
            width="100%"
            height="100%"
            alt="Cover Image"
            source={{
              uri: signedCover,
            }}
          />
        ) : (
          <Skeleton width="100%" alignItems="center" height="100%" />
        )}
      </Box>
      <Box alignItems="flex-start" justifyContent="center" bg="white">
        <Box position="relative">
          {signedProfile ? (
            <Avatar
              mt="-20"
              ml={windowWidth * 0.025}
              width="100px"
              height="100px"
              source={{
                uri: signedProfile,
              }}
            />
          ) : (
            <Skeleton
              bg="coolGray.200"
              mt="-20"
              ml={windowWidth * 0.025}
              width="100px"
              height="100px"
              alignItems="center"
              justifyContent="center"
              borderRadius="full"
            />
          )}
        </Box>
      </Box>
      <HStack bg="white" justifyContent="center" pb="4">
        <Box width="90%">
          <HStack
            mb="2"
            alignItems="flex-end"
            justifyContent="space-between"
            mt="0"
          >
            <HStack alignItems="center" space="2.5">
              <Box>
                {name ? (
                  <Text fontSize="md" fontWeight="500">
                    e/{name}
                  </Text>
                ) : (
                  <Skeleton height="20px" width="150px" mt="2" />
                )}
              </Box>
              {id && creatorId && creatorId === currentUser.id && (
                <Pressable
                  onPress={() => {
                    navigation.navigate("Application", {
                      screen: "SubForumStack",
                      params: {
                        screen: "EditAndCreateSubForum",
                        params: {
                          title: "Edit Subforum",
                          action: "Edit",
                          subForumId: id,
                          name,
                          description,
                          profileImageS3Key,
                          bannerImageS3Key: coverImageS3Key,
                          _version,
                        },
                      },
                    });
                  }}
                >
                  <Icon
                    as={<Foundation name="pencil" />}
                    size={18}
                    color="eGreen.400"
                  />
                </Pressable>
              )}
            </HStack>

            {id && creatorId && creatorId !== currentUser.id && (
              <Button
                onPress={RelationshipHandler}
                bg={
                  relationship === "NOTJOINED" ? "tertiary.500" : "danger.500"
                }
                variant="unstyled"
                minWidth="24"
                borderRadius="50"
              >
                {relationship === "NOTJOINED" ? "Join" : "Exit"}
              </Button>
            )}
          </HStack>
          <HStack alignItems="center" mb="2">
            {totalMembers ? (
              <Text fontSize="sm" color="blueGray.500">
                {totalMembers} Members
              </Text>
            ) : (
              <Skeleton height="20px" width="150px" mt="2" />
            )}
            <Box bg="blueGray.500" style={styles.separatorDot} />
            {totalPosts ? (
              <Text fontSize="sm" color="blueGray.500">
                {totalPosts} Posts
              </Text>
            ) : (
              <Skeleton height="20px" width="150px" mt="2" />
            )}
          </HStack>
          <Box>
            {description ? (
              <Text fontSize="sm">{description}</Text>
            ) : (
              <>
                <Skeleton height="20px" width="100%" mb="2" />
                <Skeleton height="20px" width="80%" mb="2" />
                <Skeleton height="20px" width="85%" />
              </>
            )}
          </Box>
        </Box>
      </HStack>
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
});

/**
 * Todo-1: graphql schema update
 * Todo-2: graphql schema test
 * Todo-3: update subforum creation call
 * Todo-3: graphql queries and types
 * Todo-4: custom resolvers
 * Todo-5: handlers
 */

/**
 * api
 */

interface UserForumRelationFetchInput_ {
  userId: string;
  communityId: string;
  action: "ADD" | "DELETE";
}

interface DeleteUserForumRelationFetchInput_ {
  id: string;
  userId: string;
  communityId: string;
  isDeleted: boolean;
}

interface CreateUserForumRelationFetchInput_ {
  userId: string;
  communityId: string;
}

const UserForumRelationFetch = async (input: UserForumRelationFetchInput_) => {
  try {
    // check if user forum relationship exist

    const isUserForumRelationExit = (await API.graphql({
      query: CheckUserForumRelation,
      variables: {
        userId: input.userId,
        communityId: input.communityId,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<CheckUserForumRelation_>;

    const isUserForumRelationExistItems =
      isUserForumRelationExit.data?.listUserCommunityRelationShips.items;

    // if relationship doesnt exist, create on
    if (
      isUserForumRelationExistItems &&
      isUserForumRelationExistItems.length === 0 &&
      input.action === "ADD"
    ) {
      const createUserForumRelationInput: CreateUserForumRelationFetchInput_ = {
        userId: input.userId,
        communityId: input.communityId,
      };

      const createdUserForumRelationship = (await API.graphql({
        query: CreateUserForumRelation,
        variables: {
          input: createUserForumRelationInput,
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as GraphQLResult<CreateUserForumRelation_>;

      if (createdUserForumRelationship.data?.createUserCommunityRelationShip) {
        /**
         * increment communities joined metrics in current user
         * increment total members metrics in community
         */

        await API.graphql({
          query: MetricsQueryPicker.USERMETRICS.COMMUNITIESJOINED.INCREMENT,
          variables: {
            id: input.userId,
          },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });

        await API.graphql({
          query: MetricsQueryPicker.COMMUNITY.TOTALMEMBERS.INCREMENT,
          variables: {
            id: input.communityId,
          },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });

        return createdUserForumRelationship.data.createUserCommunityRelationShip
          .id;
      }
    } else if (
      isUserForumRelationExistItems &&
      isUserForumRelationExistItems.length === 1 &&
      input.action === "DELETE"
    ) {
      const deletedUserForumRelationInput: DeleteUserForumRelationFetchInput_ =
        {
          id: isUserForumRelationExistItems[0].id,
          userId: input.userId,
          communityId: input.communityId,
          isDeleted: true,
        };

      const deletedUserForumRelationship = (await API.graphql({
        query: DeleteUserForumRelation,
        variables: {
          input: deletedUserForumRelationInput,
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as GraphQLResult<DeleteUserForumRelation_>;

      if (deletedUserForumRelationship.data?.updateUserCommunityRelationShip) {
        /**
         * decrement communities joined metrics in current user
         * decrement total members metrics in community
         */

        await API.graphql({
          query: MetricsQueryPicker.USERMETRICS.COMMUNITIESJOINED.DECREMENT,
          variables: {
            id: input.userId,
          },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });

        await API.graphql({
          query: MetricsQueryPicker.COMMUNITY.TOTALMEMBERS.DECREMENT,
          variables: {
            id: input.communityId,
          },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });

        return deletedUserForumRelationship.data.updateUserCommunityRelationShip
          .id;
      }
    }
  } catch (err) {
    console.error(
      "Error occured while creating or deleting user forum relationship in subforum card",
      err
    );
  }
};

/**
 * graphql queries and their types
 * types pattern {queryName}_
 * * note dash(_) at the end of type name
 * order 1.queryType 2.graphql query
 */

interface CheckUserForumRelation_ {
  listUserCommunityRelationShips: {
    items: Item[];
  };
}

interface CreateUserForumRelation_ {
  createUserCommunityRelationShip: Item;
}

interface DeleteUserForumRelation_ {
  updateUserCommunityRelationShip: Item;
}

interface Item {
  id: string;
  userId: string;
  communityId: string;
}

const CreateUserForumRelation = /* GraphQL */ `
  mutation CreateUserForumRelation(
    $input: CreateUserCommunityRelationShipInput!
  ) {
    createUserCommunityRelationShip(input: $input) {
      id
      userId
      communityId
    }
  }
`;

const DeleteUserForumRelation = /* GraphQL */ `
  mutation UpdateUserCommunityRelationShip(
    $input: UpdateUserCommunityRelationShipInput!
  ) {
    updateUserCommunityRelationShip(input: $input) {
      id
      userId
      communityId
    }
  }
`;

const CheckUserForumRelation = /* GraphQL */ `
  query ListUserCommunityRelationShips($userId: ID!, $communityId: ID!) {
    listUserCommunityRelationShips(
      filter: {
        isDeleted: { attributeExists: false }
        userId: { eq: $userId }
        communityId: { eq: $communityId }
      }
    ) {
      items {
        id
        userId
        communityId
      }
    }
  }
`;

/**
 * community metrics
 */

const IncrementTotalMembersCommunity = /* GraphQL */ `
  mutation incrementTotalMembersCommunity($id: ID!) {
    incrementTotalMembersCommunity(id: $id) {
      id
    }
  }
`;

const DecrementTotalMembersCommunity = /* GraphQL */ `
  mutation decrementTotalMembersCommunity($id: ID!) {
    decrementTotalMembersCommunity(id: $id) {
      id
    }
  }
`;

/**
 * user metrics
 */

const IncrementCommunitiesJoinedUserMetrics = /* GraphQL */ `
  mutation incrementCommunitiesJoinedUserMetrics($id: ID!) {
    incrementCommunitiesJoinedUserMetrics(id: $id) {
      id
    }
  }
`;

const DecrementCommunitiesJoinedUserMetrics = /* GraphQL */ `
  mutation decrementCommunitiesJoinedUserMetrics($id: ID!) {
    decrementCommunitiesJoinedUserMetrics(id: $id) {
      id
    }
  }
`;

const MetricsQueryPicker = {
  COMMUNITY: {
    TOTALMEMBERS: {
      INCREMENT: IncrementTotalMembersCommunity,
      DECREMENT: DecrementTotalMembersCommunity,
    },
  },
  USERMETRICS: {
    COMMUNITIESJOINED: {
      INCREMENT: IncrementCommunitiesJoinedUserMetrics,
      DECREMENT: DecrementCommunitiesJoinedUserMetrics,
    },
  },
};
