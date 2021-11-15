import { AntDesign } from "@expo/vector-icons";
import { Fab, useDisclose } from "native-base";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import {
  Data as DummyData,
  PostCardRenderer,
} from "@/root/src/components/screens/SubForum";
import { BottomSheet } from "@/root/src/components/shared/BottomSheet";

import { FloatingActionButton } from "../../shared/FabButton";

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
      <Fab
        onPress={() => onOpen()}
        placement="bottom-right"
        bg="eGreen.400"
        variant="unstyled"
        bottom={"100px"}
        size="lg"
        icon={<AntDesign name="plus" size={24} color="white" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
