import { useDisclose } from "native-base";
import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import {
  Data as DummyData,
  PostCardRenderer,
} from "@/root/src/components/screens/SubForum";
import { BottomSheet } from "@/root/src/components/shared/BottomSheet";
import { FloatingActionButton } from "@/root/src/components/shared/FabButton";

interface Props_ {}

export const Home: React.FC<Props_> = () => {
  const { onClose } = useDisclose();
  const [isOpen, setIsOpen] = useState(false);
  const HandleBottomSheet = () => {
    console.log("clolkjlk");
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.container}>
      <BottomSheet isOpen={isOpen} onClose={onClose} />
      <FlatList
        data={DummyData}
        renderItem={PostCardRenderer}
        keyExtractor={(item) => item.id}
      />

      <FloatingActionButton
        isOpen={isOpen}
        HandleBottomSheet={HandleBottomSheet}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
