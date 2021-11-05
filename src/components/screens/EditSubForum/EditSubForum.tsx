import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, View } from "react-native";

import { RootStackParamList } from "@/root/src/components/navigations/StackNavigator";
import { SubForumCard } from "@/root/src/components/screens/SubForum/SubForumCard";

type NavigationProp_ = StackNavigationProp<RootStackParamList, "EditSubForum">;

interface Props_ {
  navigation: NavigationProp_;
}

export const EditSubForum: React.FC<Props_> = () => {
  return (
    <View style={styles.container}>
      <SubForumCard isEdit />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
