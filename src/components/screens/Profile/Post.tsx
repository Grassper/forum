import React from "react";
import { FlatList } from "react-native";

import { PostCardRenderer } from "@/root/src/components/shared/CardRenderer";
import { dummyData } from "@/root/src/data/dummyData";

import { TabNavigatorUserContext } from "./Context";

export const Posts: React.FC = () => {
  const routeUserId = React.useContext(TabNavigatorUserContext);

  return (
    <FlatList
      data={dummyData}
      renderItem={PostCardRenderer}
      keyExtractor={(item) => item.id}
    />
  );
};

/**
 * graphql queries and their types
 * types pattern {queryName}_
 * * note dash(_) at the end of type name
 * order 1.queryType 2.graphql query
 */

const getPostByUserId = /* GraphQL */ `
  query getPostByUserId($id: ID!) {
    getUser(id: $id) {
      posts(limit: 10, sortDirection: DESC) {
        items {
          id
          type
        }
        nextToken
        startedAt
      }
    }
  }
`;
