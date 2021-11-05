import React from "react";
import { StyleSheet, View } from "react-native";

import { SubForumCard } from "./SubForumCard";

interface Props_ {}

export const SubForum: React.FC<Props_> = () => {
  return (
    <View style={styles.container}>
      <SubForumCard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
