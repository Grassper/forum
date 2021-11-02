import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

import { colors } from "@/root/src/constants";

import { About } from "./About";
import { ProfileCard } from "./ProfileCard";

interface Props_ {}

const Tab = createMaterialTopTabNavigator();

const Comments = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.commentContainer}>
          <Text numberOfLines={2} style={styles.post}>
            I've managed to get the desired behavior by setting elevation: 0
            inside the style object. Apparently there's a default elevation
            value given to the tab bar,
          </Text>
          <View style={styles.postMeta}>
            <Text style={styles.metaText}>Posted in #OneYearClub</Text>
            <View style={styles.separatorDot} />
            <Text style={styles.metaText}>Nov 30</Text>
          </View>
          <Text numberOfLines={2} style={styles.comment}>
            I've managed to get the desired behavior by setting elevation: 0
            inside the style object. Apparently there's a default elevation
            value given to the tab bar,
          </Text>
        </View>
      </View>
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

const windowWidth = Dimensions.get("window").width;

export const Profile: React.FC<Props_> = () => {
  return (
    <View style={styles.container}>
      <ProfileCard />
      <Tab.Navigator
        initialRouteName="Posts"
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 15,
            fontFamily: "mr",
            textTransform: "capitalize",
          },
          tabBarStyle: { backgroundColor: colors.white, elevation: 0 },
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
  comment: {
    color: colors.black,
    fontFamily: "ml",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 5,
  },
  commentContainer: {
    backgroundColor: colors.white,
    flex: 1,
    paddingVertical: 15,
    width: "90%",
  },
  container: { backgroundColor: colors.white, flex: 1 },
  metaText: {
    color: colors.green,
    fontFamily: "mr",
    fontSize: 14,
    lineHeight: 21,
  },
  post: {
    color: colors.black,
    fontFamily: "mm",
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
  wrapper: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
    width: "100%",
  },
});
