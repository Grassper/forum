import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

import { NavigationProp_ } from "@/root/src/components/navigations/Navigation";
import { CommunityTile } from "@/root/src/components/shared/Tile";

interface Props_ {}

export const CommunitySearch: React.FC<Props_> = () => {
  const navigation = useNavigation<NavigationProp_>();
  return (
    <ScrollView style={styles.container}>
      <CommunityTile
        onPress={() => navigation.push("SubForum", { subForumId: "1" })}
        hideDivider
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, position: "relative" },
});
