import { useDisclose } from "native-base";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import {
  Data as DummyData,
  PostCardRenderer,
} from "@/root/src/components/screens/SubForum";
import { BottomSheet } from "@/root/src/components/shared/BottomSheet";
import { FloatingActionButton } from "@/root/src/components/shared/FabButton";

interface Props_ {}

export const Home: React.FC<Props_> = () => {
  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <View style={styles.container}>
      <BottomSheet isOpen={isOpen} onClose={onClose} />
      <FlatList
        data={DummyData}
        renderItem={PostCardRenderer}
        keyExtractor={(item) => item.id}
      />
      <FloatingActionButton onPress={() => onOpen()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
