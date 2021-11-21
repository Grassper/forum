import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { PostTile } from "@/root/src/components/shared/Cards";
import { colors } from "@/root/src/constants";

interface Props_ {}

export const Posts: React.FC<Props_> = () => {
  const Data = [
    { key: 1, pinned: true },
    { key: 2, pinned: true },
    { key: 3, pinned: false },
    { key: 6, pinned: false },
    { key: 5, pinned: false },
    { key: 4, pinned: false },
  ];
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <FlatList
          data={Data}
          renderItem={(item) => <PostTile pinned={item.item.pinned} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    marginBottom: 20,
    paddingBottom: 2,
    paddingTop: 15,

    width: "100%",
  },
  wrapper: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
    width: "100%",
  },
});
