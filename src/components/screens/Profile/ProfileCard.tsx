import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/root/src/contants";

interface Props_ {}

export const ProfileCard: React.FC<Props_> = () => {
  return (
    <View style={styles.profileContainer}>
      <TouchableOpacity onPress={() => {}} style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://randomuser.me/api/portraits/women/49.jpg",
          }}
          style={styles.image}
        />
      </TouchableOpacity>
      <Text style={styles.profileName}>Diana Kiev</Text>
      <Text style={styles.joinedDate}>Joined Oct 2021</Text>
      <View style={styles.statsContainer}>
        <View style={styles.statsItem}>
          <Text style={styles.count}>862</Text>
          <Text style={styles.countText}>Followers</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.count}>468</Text>
          <Text style={styles.countText}>Following</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.count}>52</Text>
          <Text style={styles.countText}>Posts</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  count: {
    fontFamily: "mb",
    fontSize: 16,
    marginBottom: 5,
  },
  countText: {
    color: colors.green,
    fontFamily: "mr",
    fontSize: 12,
  },
  image: { borderRadius: 50, height: 60, width: 60 },
  imageContainer: {
    marginBottom: 10,
  },
  joinedDate: {
    fontFamily: "mr",
    fontSize: 12,
    marginBottom: 20,
  },
  profileContainer: {
    alignItems: "center",
    flexDirection: "column",
    marginTop: 20,
  },
  profileName: { fontFamily: "rr", fontSize: 20, marginBottom: 10 },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  statsItem: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 10,
    minWidth: 80,
  },
});
