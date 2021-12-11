import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/root/src/constants";

interface Props_ {}

export const CommentTile: React.FC<Props_> = () => {
  return (
    <View style={styles.container}>
      <Text numberOfLines={2} style={styles.post}>
        I've managed to get the desired behavior by setting elevation: 0 inside
        the style object. Apparently there's a default elevation value given to
        the tab bar,
      </Text>
      <View style={styles.postMeta}>
        <Text style={styles.metaText}>Posted in #OneYearClub</Text>
        <View style={styles.separatorDot} />
        <Text style={styles.metaText}>Nov 30</Text>
      </View>
      <Text numberOfLines={2} style={styles.comment}>
        I've managed to get the desired behavior by setting elevation: 0 inside
        the style object. Apparently there's a default elevation value given to
        the tab bar,
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  comment: {
    color: colors.black,
    fontFamily: "ll",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 5,
  },
  container: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    marginBottom: 7.5,
    paddingBottom: 7.5,
  },
  metaText: {
    color: colors.green,
    fontFamily: "lr",
    fontSize: 14,
    lineHeight: 21,
  },
  post: {
    color: colors.black,
    fontFamily: "lm",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 5,
  },
  postMeta: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 5,
  },
  separatorDot: {
    backgroundColor: colors.green,
    borderRadius: 50,
    height: 2.5,
    marginHorizontal: 5,
    width: 2.5,
  },
});
