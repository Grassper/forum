import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

import { colors } from "@/root/src/constants";

const windowWidth = Dimensions.get("window").width;

interface Props_ {}

export const About: React.FC<Props_> = () => {
  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>
        <Text numberOfLines={4} style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id
          quam id ipsum aliquet consequat non quis nisl. Integer et ultrices
          mauris, ac semper nunc.
        </Text>
        <View style={styles.statsContainer}>
          <View style={[styles.statsItem]}>
            <Text style={styles.count}>8</Text>
            <Text style={styles.countText}>Post Loves</Text>
          </View>
          <View style={styles.statsItem}>
            <Text style={styles.count}>10</Text>
            <Text style={styles.countText}>Post Supports</Text>
          </View>
          <View style={[styles.statsItem]}>
            <Text style={styles.count}>8</Text>
            <Text style={styles.countText}>Post Likes</Text>
          </View>
          <View style={[styles.statsItem]}>
            <Text style={styles.count}>8</Text>
            <Text style={styles.countText}>Post Dislikes</Text>
          </View>
          <View style={styles.statsItem}>
            <Text style={styles.count}>10</Text>
            <Text style={styles.countText}>Comment Ups</Text>
          </View>
          <View style={styles.statsItem}>
            <Text style={styles.count}>18</Text>
            <Text style={styles.countText}>Comment Downs</Text>
          </View>
          <View style={styles.statsItem}>
            <Text style={styles.count}>10</Text>
            <Text style={styles.countText}>Badges Earned</Text>
          </View>
          <View style={[styles.statsItem]}>
            <Text style={styles.count}>8</Text>
            <Text style={styles.countText}>Popularity Level</Text>
          </View>
          <View style={styles.statsItem}>
            <Text style={styles.count}>10</Text>
            <Text style={styles.countText}>Active Days</Text>
          </View>
          <View style={[styles.statsItem]}>
            <Text style={styles.count}>8</Text>
            <Text style={styles.countText}>Last Active</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    paddingVertical: 15,
    width: "90%",
  },
  count: {
    color: colors.green,
    fontFamily: "mb",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 5,
  },
  countText: {
    color: colors.black,
    fontFamily: "mr",
    fontSize: 14,
    lineHeight: 21,
  },
  description: {
    fontFamily: "mr",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statsItem: {
    marginBottom: 15,
    minWidth: windowWidth / 3,
  },
  wrapper: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
    width: "100%",
  },
});
