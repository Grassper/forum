import { Ionicons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Box } from "native-base";
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
  const [isOpen, setIsOpen] = useState(false);
  const HandleBottomSheet = () => {
    setIsOpen(!isOpen);
  };
  const navigation = useNavigation();
  console.log(navigation, "navigation");
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Box ml="3">
          <Ionicons
            name="ios-menu-sharp"
            size={24}
            color="black"
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          />
        </Box>
      ),
      headerRight: () => (
        <Box mr="3">
          <Ionicons
            name="search"
            size={24}
            color="black"
            onPress={() => console.log("Search called")}
          />
        </Box>
      ),
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <BottomSheet isOpen={isOpen} onClose={HandleBottomSheet} />
      <FlatList
        data={DummyData}
        renderItem={PostCardRenderer}
        keyExtractor={(item) => item.id}
      />

      <FloatingActionButton onPress={HandleBottomSheet} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
