import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ScrollView } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

import { RootStackParamList } from "@/root/src/components/navigations/StackNavigator";
import { CommunityTile } from "@/root/src/components/shared/Tile";

type NavigationProp_ = StackNavigationProp<RootStackParamList>;

interface Props_ {}

export const CommunitySearch: React.FC<Props_> = () => {
  const navigation = useNavigation<NavigationProp_>();
  return (
    <ScrollView style={styles.container}>
      <CommunityTile onPress={() => navigation.push("SubForum")} hideDivider />
      <CommunityTile onPress={() => navigation.push("SubForum")} hideDivider />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, position: "relative" },
});
