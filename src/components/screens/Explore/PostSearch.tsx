import { Box } from "native-base";
import React from "react";
import { FlatList } from "react-native";

import { PostCardRenderer } from "@/root/src/components/shared/CardRenderer";
import { dummyData } from "@/root/src/data/dummyData";

import { TabNavigatorExploreContext } from "./context";

export const PostSearch: React.FC = () => {
  const searchValue = React.useContext(TabNavigatorExploreContext);

  return (
    <Box>
      <FlatList
        data={dummyData}
        renderItem={PostCardRenderer}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
};
