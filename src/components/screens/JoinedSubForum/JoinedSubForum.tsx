import { GraphQLResult } from "@aws-amplify/api-graphql";
import { AntDesign } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import {
  CompositeNavigationProp,
  DrawerActions,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { API } from "aws-amplify";
import { Box, Icon, ScrollView } from "native-base";
import React from "react";

import {
  DrawerParamList_,
  SubForumStackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { SearchBar } from "@/root/src/components/shared/SearchBar";
import { CommunityTile } from "@/root/src/components/shared/Tile";
import { UserContext } from "@/root/src/context";

type NavigationProp_ = CompositeNavigationProp<
  StackNavigationProp<SubForumStackParamList_, "SubForum">,
  DrawerNavigationProp<DrawerParamList_>
>;

interface Props_ {
  navigation: NavigationProp_;
}

export const JoinedSubForum: React.FC<Props_> = ({ navigation }) => {
  const currentUser = React.useContext(UserContext).user; // this context provided current login user

  const [communities, setCommunities] = React.useState<Item[]>();
  const [nextToken, setNextToken] = React.useState<string>();

  React.useEffect(() => {
    (async () => {
      const listCommunityInput: listCommunityByUserIdFetchInput_ = {
        id: currentUser.id,
        limit: 10,
        sortDirection: "DESC",
      };

      const responseData = await listCommunityByUserIdFetch(listCommunityInput);
      if (responseData) {
        setCommunities(responseData.items);
        setNextToken(responseData.nextToken);
      }
    })();
  }, [currentUser]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Icon
          as={<AntDesign name="menuunfold" />}
          size={5}
          ml="4"
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          color="white"
        />
      ),
      headerRight: () => (
        <Icon
          as={<AntDesign name="pluscircleo" />}
          size={"20px"}
          mr="4"
          onPress={() =>
            navigation.push("EditAndCreateSubForum", {
              title: "Create Subforum",
              action: "Add",
            })
          }
          color="white"
        />
      ),
    });
  }, [navigation]);

  return (
    <Box bg="white" flex="1" alignItems="center">
      <Box width="90%" pt="20px">
        <SearchBar />
      </Box>
      <Box width="100%">
        <ScrollView>
          <CommunityTile onPress={() => {}} hideDivider />
        </ScrollView>
      </Box>
    </Box>
  );
};

/**
 * Todo-1: fetch subforum joined by current user
 * Todo-2: map subforum list to flatlist
 * Todo-3: while end of flatlist call pagination if next token is not null
 * Todo-4: clicking the subforum card will navigate to subforum screen
 * Todo-5: if no community joined, created or moderated by users
 */

/**
 * api calls
 */

interface listCommunityByUserIdFetchInput_ {
  id: string;
  limit: number;
  sortDirection: "ASC" | "DESC";
  nextToken?: string;
}

const listCommunityByUserIdFetch = async (
  input: listCommunityByUserIdFetchInput_
) => {
  try {
    const listCommunityData = (await API.graphql({
      query: listCommunityByUserId,
      variables: input,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<listCommunityByUserId_>;

    if (listCommunityData.data?.getUser) {
      const { communities } = listCommunityData.data.getUser;
      return communities;
    }
  } catch (err) {
    console.error("Error occured while listing community in joined forum", err);
  }
};

/**
 * graphql queries and their types
 * types pattern {queryName}_
 * * note dash(_) at the end of type name
 * order 1.queryType 2.graphql query
 */

interface listCommunityByUserId_ {
  getUser?: {
    communities: {
      items: Item[];
      nextToken: string;
    };
  };
}

interface Item {
  community: Community;
}

interface Community {
  id: string;
  name: string;
  profileImageS3Key: string;
}

const listCommunityByUserId = /* GraphQL */ `
  query listCommunityByUserId(
    $id: ID!
    $limit: Int = 10
    $sortDirection: ModelSortDirection = DESC
    $nextToken: String
  ) {
    getUser(id: $id) {
      communities(
        limit: $limit
        sortDirection: $sortDirection
        nextToken: $nextToken
      ) {
        items {
          community {
            id
            name
            profileImageS3Key
          }
        }
        nextToken
      }
    }
  }
`;
