import { GraphQLResult } from "@aws-amplify/api-graphql";
import { Ionicons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import {
  CompositeNavigationProp,
  RouteProp,
  useFocusEffect,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { API } from "aws-amplify";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Icon,
  Image,
  Input,
  Spinner,
  WarningOutlineIcon,
} from "native-base";
import React from "react";
import { Alert, StyleSheet } from "react-native";
import isLength from "validator/es/lib/isLength";
import matches from "validator/es/lib/matches";

import {
  DrawerParamList_,
  RootStackParamList_,
  SubForumStackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { ImagePickerButton } from "@/root/src/components/shared/Picker";
import { UserContext } from "@/root/src/context";
import { useToggle } from "@/root/src/hooks";
import { SignS3ImageKey } from "@/root/src/utils/helpers";

type RouteProp_ = RouteProp<SubForumStackParamList_, "EditAndCreateSubForum">;

type NavigationProp_ = CompositeNavigationProp<
  StackNavigationProp<SubForumStackParamList_, "EditAndCreateSubForum">,
  CompositeNavigationProp<
    DrawerNavigationProp<DrawerParamList_, "SubForumStack">,
    StackNavigationProp<RootStackParamList_, "Application">
  >
>;

interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}

export const EditAndCreateSubForum: React.FC<Props_> = ({
  navigation,
  route,
}) => {
  const { title, action, subForumId, _version } = route.params;

  const [forumName, setForumName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [profileImageS3Key, setProfileImageS3Key] = React.useState("");
  const [bannerImageS3Key, setBannerImageS3Key] = React.useState("");

  const [signedProfile, setSignedProfile] = React.useState("");
  const [signedCover, setSignedCover] = React.useState("");

  const currentUser = React.useContext(UserContext).user;

  /**
   * validation and error states
   */

  const [isforumNameValid, setForumNameValid] = React.useState(false);
  const [forumNameErrorMsg, setForumNameErrorMsg] = React.useState("");

  const [isDescriptionValid, setDescriptionValid] = React.useState(false);
  const [descriptionErrorMsg, setDescriptionErrorMsg] = React.useState("");

  /**
   * loaders state
   */

  const [coverLoader, toggleCoverLoader] = useToggle(false);
  const [profileLoader, toggleProfileLoader] = useToggle(false);

  /**
   * Hydrating the field for edit subforum screen
   */

  React.useEffect(() => {
    if (route.params.name) {
      setForumName(route.params.name);
    }
    if (route.params.description) {
      setDescription(route.params.description);
    }
    if (route.params.profileImageS3Key) {
      setProfileImageS3Key(route.params.profileImageS3Key);
    }
    if (route.params.bannerImageS3Key) {
      setBannerImageS3Key(route.params.bannerImageS3Key);
    }
  }, [route.params]);

  const handleSubmit = React.useCallback(async () => {
    if (
      isforumNameValid &&
      isDescriptionValid &&
      profileImageS3Key &&
      bannerImageS3Key
    ) {
      setLoading(true);
      /** checking current screen for action add or edit action */
      if (action === "Add") {
        const newForumInput: handleForumCreationInput_ = {
          name: forumName,
          description,
          bannerImageS3Key,
          profileImageS3Key,
          type: "PUBLIC",
          creatorId: currentUser.id,
          totalPosts: 0,
          totalMembers: 0,
          totalComments: 0,
          totalModerators: 0,
        };
        const createdForumId = await handleForumCreation(newForumInput);

        if (createdForumId) {
          navigation.navigate({
            name: "SubForumStack",
            params: {
              screen: "JoinedSubForum",
            },
            merge: true,
          });
        }
      }

      if (action === "Edit" && subForumId && _version) {
        /**
         * Todo if input is same as current dont make a post call
         */
        const updateForumInput: handleForumUpdationInput_ = {
          id: subForumId,
          name: forumName,
          description,
          bannerImageS3Key,
          profileImageS3Key,
          _version,
        };

        const updatedForumId = await handleForumUpdation(updateForumInput);

        if (updatedForumId) {
          navigation.navigate({
            name: "SubForumStack",
            params: {
              screen: "JoinedSubForum",
            },
            merge: true,
          });
        }
      }
      setLoading(false);
    } else {
      Alert.alert(
        "You should provide all required fields including cover and subforum image to create subforum"
      );
    }
  }, [
    isforumNameValid,
    isDescriptionValid,
    profileImageS3Key,
    bannerImageS3Key,
    action,
    subForumId,
    forumName,
    description,
    currentUser.id,
    navigation,
    _version,
  ]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          size="md"
          _text={{ fontWeight: "600", color: "white" }}
          variant="unstyled"
          onPress={!loading ? handleSubmit : null}
        >
          {!loading ? (
            title === "Edit Subforum" ? (
              "Save"
            ) : (
              "Create"
            )
          ) : (
            <Spinner color="indigo.500" />
          )}
        </Button>
      ),
    });
  }, [navigation, title, handleSubmit, loading]);

  const signImage = React.useCallback(() => {
    let isActive = true;

    const signing = async () => {
      if (profileImageS3Key) {
        const signedImage = await SignS3ImageKey(profileImageS3Key);
        if (signedImage && isActive) {
          setSignedProfile(signedImage);
        }
      }
      if (bannerImageS3Key) {
        const signedImage = await SignS3ImageKey(bannerImageS3Key);
        if (signedImage && isActive) {
          setSignedCover(signedImage);
        }
      }
    };

    signing();

    return () => {
      isActive = false;
    };
  }, [profileImageS3Key, bannerImageS3Key]);

  useFocusEffect(signImage);

  React.useEffect(() => {
    const validateForumName = () => {
      if (
        isLength(forumName, { min: 3, max: 20 }) &&
        matches(forumName, "^[A-Za-z][A-Za-z0-9 _|.,!]{3,20}$", "m")
      ) {
        setForumNameValid(true);
        setForumNameErrorMsg("");
      } else {
        setForumNameValid(false);
        setForumNameErrorMsg("Alphanumeric username 3-20 chars");
      }
    };
    validateForumName();
  }, [forumName]);

  React.useEffect(() => {
    const validateDescription = () => {
      if (
        isLength(description, { min: 25, max: 300 }) &&
        matches(description, "^[A-Za-z][A-Za-z0-9 _|.,!]{25,300}$", "m")
      ) {
        setDescriptionValid(true);
        setDescriptionErrorMsg("");
      } else {
        setDescriptionValid(false);
        setDescriptionErrorMsg("Alphanumeric description 25-300 chars");
      }
    };
    validateDescription();
  }, [description]);

  return (
    <Box style={styles.container}>
      <Box position="relative" height="115px">
        {signedCover ? (
          <Image
            key={signedCover}
            width="100%"
            height="100%"
            alt="Cover Image"
            source={{
              uri: signedCover,
            }}
          />
        ) : (
          <Box
            width="100%"
            alignItems="center"
            height="100%"
            justifyContent="center"
          >
            <Icon
              as={<Ionicons name="ios-image" />}
              size={6}
              color="muted.700"
            />
          </Box>
        )}
        {!coverLoader && (
          <Box position="absolute" top="2" right="2">
            <ImagePickerButton
              maxImageSize={15}
              imageWidth={110}
              imageHeight={110}
              aspectRatio={[4, 3]}
              setS3ImageKey={setBannerImageS3Key}
              setProgressPercentage={() => {}} // percentage progress
            />
          </Box>
        )}
      </Box>
      <Box bg="white">
        <Box
          width="100px"
          height="100px"
          position="relative"
          marginTop="-50px"
          marginLeft="15px"
        >
          {signedProfile ? (
            <Avatar
              bg="green.500"
              width="100%"
              height="100%"
              key={signedProfile}
              source={{
                uri: signedProfile,
              }}
            />
          ) : (
            <Box
              bg="coolGray.200"
              width="100%"
              height="100%"
              alignItems="center"
              justifyContent="center"
              borderRadius="full"
            >
              <Icon
                as={<Ionicons name="ios-image" />}
                size={6}
                color="muted.700"
              />
            </Box>
          )}
          {!profileLoader && (
            <Box position="absolute" right="0" bottom="0">
              <ImagePickerButton
                maxImageSize={5}
                imageWidth={480}
                imageHeight={360}
                aspectRatio={[1, 1]}
                setS3ImageKey={setProfileImageS3Key}
                setProgressPercentage={() => {}} // percentage progress
              />
            </Box>
          )}
        </Box>
      </Box>
      <Box style={styles.wrapper} bg="white">
        <Box style={styles.inputContainer}>
          <FormControl isRequired isInvalid={!isforumNameValid}>
            <FormControl.Label mb="3">Forum Name</FormControl.Label>
            <Input
              bg="coolGray.100"
              p="4"
              value={forumName}
              onChangeText={setForumName}
              borderRadius="md"
              placeholder="Mechkeys"
              placeholderTextColor="muted.400"
              fontSize="sm"
              variant="unstyled"
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {forumNameErrorMsg}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl mt="4" isRequired isInvalid={!isDescriptionValid}>
            <FormControl.Label mb="3">Description</FormControl.Label>
            <Input
              bg="coolGray.100"
              p="4"
              mb="2"
              minHeight="125"
              maxHeight="150"
              multiline
              maxLength={140}
              numberOfLines={4}
              value={description}
              onChangeText={setDescription}
              borderRadius="md"
              placeholder="We talk about keyboards"
              placeholderTextColor="muted.400"
              fontSize="sm"
              variant="unstyled"
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {descriptionErrorMsg}
            </FormControl.ErrorMessage>
            <FormControl.HelperText>
              Crispy introduction about forum
            </FormControl.HelperText>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  inputContainer: {
    flex: 1,
    marginBottom: 20,
    paddingVertical: 15,
    width: "90%",
  },
  wrapper: {
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
});

interface handleForumCreationInput_ {
  name: string;
  description: string;
  bannerImageS3Key: string;
  profileImageS3Key: string;
  type: string;
  creatorId: string;
  totalPosts: number;
  totalMembers: number;
  totalComments: number;
  totalModerators: number;
}

const handleForumCreation = async (input: handleForumCreationInput_) => {
  try {
    /**
     * create forum
     */
    const forumData = (await API.graphql({
      query: createForum,
      variables: { input: input },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<createForum>;

    if (forumData.data?.createCommunity) {
      /**
       * create forum user relationships for author
       */

      const userForumRelationInput = {
        userId: input.creatorId,
        communityId: forumData.data.createCommunity.id,
      };

      await API.graphql({
        query: createUserForumRelation,
        variables: { input: userForumRelationInput },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });

      /**
       * create moderator user relationships for author
       */

      const moderatorForumRelationInput = {
        moderatorId: input.creatorId,
        communityId: forumData.data.createCommunity.id,
      };

      await API.graphql({
        query: createModeratorForumRelation,
        variables: { input: moderatorForumRelationInput },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });

      /**
       * increment total members, moderators metrics in community
       * increment communities joined, communities moderating metrics in user metrics
       */

      await API.graphql({
        query: MetricsQueryPicker.COMMUNITY.TOTALMEMBERS.INCREMENT,
        variables: { id: forumData.data.createCommunity.id },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });

      await API.graphql({
        query: MetricsQueryPicker.COMMUNITY.TOTALMODERATORS.INCREMENT,
        variables: { id: forumData.data.createCommunity.id },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });

      await API.graphql({
        query: MetricsQueryPicker.USERMETRICS.COMMUNITIESJOINED.INCREMENT,
        variables: { id: input.creatorId },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });

      await API.graphql({
        query: MetricsQueryPicker.USERMETRICS.COMMUNITIESMODERATING.INCREMENT,
        variables: { id: input.creatorId },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });

      /**
       * return created community id to navigate
       */

      return forumData.data.createCommunity.id;
    }
  } catch (err) {
    console.error("Error occured while creating forum", err);
  }
  // navigation to subforum screen it shouldn't come back to create screen
};

interface handleForumUpdationInput_ {
  id: string;
  name: string;
  description: string;
  bannerImageS3Key: string;
  profileImageS3Key: string;
  _version: number;
}

const handleForumUpdation = async (input: handleForumUpdationInput_) => {
  try {
    /**
     * update forum
     */
    const forumData = (await API.graphql({
      query: updateForum,
      variables: { input: input },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<updateForum_>;

    if (forumData.data?.updateCommunity) {
      return forumData.data.updateCommunity.id;
    }
  } catch (err) {
    console.error("Error occured while updating forum", err);
  }
  // navigation to subforum screen it shouldn't come back to create screen
};

/**
 * graphql queries and their types
 * types pattern {queryName}_
 * * note dash(_) at the end of type name
 * order 1.queryType 2.graphql query
 */

type createForum = {
  createCommunity?: {
    id: string;
    _version: number;
  };
};

const createForum = /* GraphQL */ `
  mutation createForum($input: CreateCommunityInput!) {
    createCommunity(input: $input) {
      id
      _version
    }
  }
`;

const createUserForumRelation = /* GraphQL */ `
  mutation createUserForumRelation(
    $input: CreateUserCommunityRelationShipInput!
  ) {
    createUserCommunityRelationShip(input: $input) {
      id
    }
  }
`;

const createModeratorForumRelation = /* GraphQL */ `
  mutation createModeratorForumRelation(
    $input: CreateModeratorCommunityRelationShipInput!
  ) {
    createModeratorCommunityRelationShip(input: $input) {
      id
    }
  }
`;

type updateForum_ = {
  updateCommunity?: {
    id: string;
    _version: number;
  };
};

const updateForum = /* GraphQL */ `
  mutation updateForum($input: UpdateCommunityInput!) {
    updateCommunity(input: $input) {
      _version
      id
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

const IncrementTotalModeratorsCommunity = /* GraphQL */ `
  mutation incrementTotalModeratorsCommunity($id: ID!) {
    incrementTotalModeratorsCommunity(id: $id) {
      id
    }
  }
`;

const DecrementTotalModeratorsCommunity = /* GraphQL */ `
  mutation decrementTotalModeratorsCommunity($id: ID!) {
    decrementTotalModeratorsCommunity(id: $id) {
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

const IncrementCommunitiesModeratingUserMetrics = /* GraphQL */ `
  mutation incrementCommunitiesModeratingUserMetrics($id: ID!) {
    incrementCommunitiesModeratingUserMetrics(id: $id) {
      id
    }
  }
`;

const DecrementCommunitiesModeratingUserMetrics = /* GraphQL */ `
  mutation decrementCommunitiesModeratingUserMetrics($id: ID!) {
    decrementCommunitiesModeratingUserMetrics(id: $id) {
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
    TOTALMODERATORS: {
      INCREMENT: IncrementTotalModeratorsCommunity,
      DECREMENT: DecrementTotalModeratorsCommunity,
    },
  },
  USERMETRICS: {
    COMMUNITIESJOINED: {
      INCREMENT: IncrementCommunitiesJoinedUserMetrics,
      DECREMENT: DecrementCommunitiesJoinedUserMetrics,
    },
    COMMUNITIESMODERATING: {
      INCREMENT: IncrementCommunitiesModeratingUserMetrics,
      DECREMENT: DecrementCommunitiesModeratingUserMetrics,
    },
  },
};
