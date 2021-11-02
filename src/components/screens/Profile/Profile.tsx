import React from "react";
import { StyleSheet, View } from "react-native";

import { colors } from "@/root/src/contants";

import { ProfileCard } from "./ProfileCard";

interface Props_ {}

export const Profile: React.FC<Props_> = () => {
  return (
    <View style={styles.container}>
      <ProfileCard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: colors.white, flex: 1 },
});
