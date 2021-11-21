import React from "react";
import { FlatList } from "react-native";

import { PostCardRenderer } from "@/root/src/components/shared/CardRenderer";
import { dummyData } from "@/root/src/data/dummyData";

interface Props_ {}

export const Posts: React.FC<Props_> = () => {
  return (
    <FlatList
      data={dummyData}
      renderItem={PostCardRenderer}
      keyExtractor={(item) => item.id}
    />
  );
};
