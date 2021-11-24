import { Box } from "native-base";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import { CommentTile } from "@/root/src/components/shared/Tile";

import { TabNavigatorUserContext } from "./Context";

export const Comments: React.FC = () => {
  const routeUserId = React.useContext(TabNavigatorUserContext);

  return (
    <Box style={styles.wrapper} alignItems="center" bg="white">
      <ScrollView style={styles.container}>
        <CommentTile />
        <CommentTile />
        <CommentTile />
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    paddingVertical: 15,
    width: "90%",
  },
  wrapper: {
    flex: 1,
  },
});

/**
 * graphql queries and their types
 * types pattern {queryName}_
 * * note dash(_) at the end of type name
 * order 1.queryType 2.graphql query
 */

const getCommentsByUserId = /* GraphQL */ `
  query MyQuery($id: ID!) {
    getUser(id: $id) {
      comments(sortDirection: DESC, limit: 10) {
        items {
          id
        }
        nextToken
        startedAt
      }
    }
  }
`;
