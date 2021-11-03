import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Pressable, Text } from "native-base";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

import { RootStackParamList } from "@/root/src/components/navigations/StackNavigator";
import { colors } from "@/root/src/constants";

type NavigationProp_ = StackNavigationProp<RootStackParamList>;

interface Props_ {}

export const ProfileCard: React.FC<Props_> = () => {
  const navigation = useNavigation<NavigationProp_>();

  return (
    <View style={styles.profileContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://randomuser.me/api/portraits/women/49.jpg",
          }}
          style={styles.image}
        />
      </View>
      <Text style={styles.profileName}>Diana Kiev</Text>
      <Text style={styles.joinedDate}>Joined Oct 2021</Text>
      <View style={styles.statsContainer}>
        <Pressable
          onPress={() => {
            navigation.navigate("Follow", { title: "Followers" });
          }}
        >
          <View style={styles.statsItem}>
            <Text style={styles.count}>862</Text>
            <Text style={styles.countText}>Followers</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("Follow", { title: "Following" });
          }}
        >
          <View style={styles.statsItem}>
            <Text style={styles.count}>468</Text>
            <Text style={styles.countText}>Following</Text>
          </View>
        </Pressable>
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
    lineHeight: 24,
    marginBottom: 5,
  },
  countText: {
    color: colors.green,
    fontFamily: "mm",
    fontSize: 14,
    letterSpacing: 0.1,
    lineHeight: 21,
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
  profileName: { fontFamily: "rr", fontSize: 22, marginBottom: 10 },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
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
