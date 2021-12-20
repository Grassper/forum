import { Ionicons } from "@expo/vector-icons";
import { Box } from "native-base";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/root/src/constants";

interface Props_ {
  pinned?: boolean;
}

export const PostTile: React.FC<Props_> = ({ pinned }) => {
  return (
    <Box
      bg={pinned ? colors.pinnedColor : colors.white}
      style={styles.container}
    >
      <Text numberOfLines={2} style={styles.post}>
        I've managed to get the desired behavior by setting elevation: 0 inside
        the style object. Apparently there's a default elevation value given to
        the tab bar,
      </Text>
      <View style={styles.utils}>
        <View style={styles.postMeta}>
          <Text style={styles.metaText}>Posted in #OneYearClub</Text>
          <View style={styles.separatorDot} />
          <Text style={styles.metaText}>Nov 30</Text>
        </View>
        <Ionicons
          color={colors.gray}
          name="ellipsis-horizontal"
          size={20}
          style={styles.ellipsis}
        />
      </View>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  ellipsis: {
    marginRight: 5,
  },
  metaText: {
    color: colors.green,
    fontFamily: "lr",
    fontSize: 14,
    lineHeight: 21,
  },
  post: {
    color: colors.black,
    fontFamily: "lr",
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
  utils: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
