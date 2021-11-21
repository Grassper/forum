import { Box } from "native-base";
import React from "react";
import { FlatList } from "react-native";

import { PostCardRenderer } from "@/root/src/components/screens/SubForum";
import { dummyData } from "@/root/src/data/dummyData";

export const PostSearch: React.FC = () => {
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
