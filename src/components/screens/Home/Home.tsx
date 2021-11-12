import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import {
  Data as DummyData,
  PostCardRenderer,
} from "@/root/src/components/screens/SubForum";

interface Props_ {}

export const Home: React.FC<Props_> = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={DummyData}
        renderItem={PostCardRenderer}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
