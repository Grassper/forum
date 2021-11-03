import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { CommentCard } from "@/root/src/components/shared/Cards";
import { colors } from "@/root/src/constants";

interface Props_ {}

export const Comments: React.FC<Props_> = () => {
  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>
        <CommentCard />
        <CommentCard />
        <CommentCard />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    marginBottom: 20,
    paddingVertical: 15,
    width: "90%",
  },

  wrapper: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
    width: "100%",
  },
});
