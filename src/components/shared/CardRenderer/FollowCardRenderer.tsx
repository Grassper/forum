import React from "react";
import { ListRenderItem } from "react-native";

import { FollowCard } from "@/root/src/components/shared/Cards";

interface FollowCard_ {
  id: string;
  username: string;
  avatarUrl: string;
}

export const FollowCardRenderer: ListRenderItem<FollowCard_> = ({ item }) => {
  return (
    <FollowCard
      id={item.id}
      username={item.username}
      avatarUrl={item.avatarUrl}
    />
  );
};
