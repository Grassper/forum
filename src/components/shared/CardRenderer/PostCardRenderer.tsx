import React from "react";
import { ListRenderItem } from "react-native";

import {
  PostCard,
  Props_ as PostCardProps_,
} from "@/root/src/components/shared/Cards/PostCard";

export const PostCardRenderer: ListRenderItem<PostCardProps_> = ({ item }) => {
  return (
    <PostCard
      id={item.id}
      subForum={item.subForum}
      type={item.type}
      username={item.username}
      contentText={item.contentText}
      avatarUrl={item.avatarUrl}
      timeStamp={item.timeStamp}
      mediaUrl={item.mediaUrl}
      poll={item.poll}
      audioUrl={item.audioUrl}
    />
  );
};
