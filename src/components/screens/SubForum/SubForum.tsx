import { GraphQLResult } from "@aws-amplify/api-graphql";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { API } from "aws-amplify";
import { Button } from "native-base";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import {
  DrawerParamList_,
  SubForumStackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { PostCardRenderer } from "@/root/src/components/shared/CardRenderer";
import { SubForumCard } from "@/root/src/components/shared/Cards";
import { dummyData } from "@/root/src/data/dummyData";

type NavigationProp_ = CompositeNavigationProp<
  StackNavigationProp<SubForumStackParamList_, "SubForum">,
  DrawerNavigationProp<DrawerParamList_>
>;

type RouteProp_ = RouteProp<SubForumStackParamList_, "SubForum">;

interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}

export const SubForum: React.FC<Props_> = ({ navigation, route }) => {
  const { subForumId } = route.params;

  const [subForum, getSubForum] = React.useState<Community>();

  React.useEffect(() => {
    (async () => {
      const getCommunityData = await getCommunityFetch(subForumId);

      if (getCommunityData) {
        getSubForum(getCommunityData);
      }
    })();
  }, [subForumId]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          size="md"
          _text={{ fontWeight: "600", color: "eGreen.400" }}
          variant="unstyled"
          onPress={() => {
            navigation.navigate("SubForumMod");
          }}
        >
          Manage
        </Button>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={dummyData}
        renderItem={PostCardRenderer}
        ListHeaderComponent={() => (
          <SubForumCard
            id={subForum?.id}
            name={subForum?.name}
            description={subForum?.description}
            profileImageS3Key={subForum?.profileImageS3Key}
            coverImageS3Key={subForum?.bannerImageS3Key}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

/**
 * Todo-1: fetch community and post using community id
 */

const getCommunityFetch = async (id: string) => {
  try {
    const getCommunityData = (await API.graphql({
      query: getCommunity,
      variables: { id },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<getCommunity>;

    if (getCommunityData.data?.getCommunity) {
      const community = getCommunityData.data.getCommunity;
      return community;
    }
  } catch (err) {
    console.error(
      "Error occured while fetching community in subforum screen",
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

interface getCommunity {
  getCommunity?: Community;
}

interface Community {
  id: string;
  description: string;
  name: string;
  profileImageS3Key: string;
  bannerImageS3Key: string;
}

const getCommunity = /* GraphQL */ `
  query getCommunity($id: ID!) {
    getCommunity(id: $id) {
      id
      description
      name
      profileImageS3Key
      bannerImageS3Key
    }
  }
`;
