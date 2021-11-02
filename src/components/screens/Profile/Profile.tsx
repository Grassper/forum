import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

import { colors } from "@/root/src/constants";

import { ProfileCard } from "./ProfileCard";

interface Props_ {}

const Tab = createMaterialTopTabNavigator();

const Comments = () => {
  return (
    <View style={styles.container}>
      <Text>HI</Text>
    </View>
  );
};

const Posts = () => {
  return (
    <View style={styles.container}>
      <Text>HI</Text>
    </View>
  );
};

const About = () => {
  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.aboutContainer}>
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

const windowWidth = Dimensions.get("window").width;

export const Profile: React.FC<Props_> = () => {
  return (
    <View style={styles.container}>
      <ProfileCard />
      <Tab.Navigator
        initialRouteName="Posts"
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 16,
            fontFamily: "mr",
            textTransform: "capitalize",
          },
          tabBarStyle: { backgroundColor: colors.white },
          tabBarActiveTintColor: colors.black,
          tabBarInactiveTintColor: colors.gray,
          tabBarIndicatorStyle: {
            backgroundColor: colors.green,
            width: windowWidth / 6,
            left: windowWidth / 12,
            height: 2,
          },
        }}
      >
        <Tab.Screen name="Posts" component={Posts} />
        <Tab.Screen name="Comments" component={Comments} />
        <Tab.Screen name="About" component={About} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  aboutContainer: {
    backgroundColor: colors.white,
    flex: 1,
    paddingVertical: 15,
    width: "90%",
  },
  container: { backgroundColor: colors.white, flex: 1 },
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
