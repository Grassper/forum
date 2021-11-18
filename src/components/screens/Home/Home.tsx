import { Ionicons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Box, Image, Pressable } from "native-base";
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
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Box ml="3">
          <Pressable
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <Image
              size={30}
              resizeMode={"cover"}
              borderRadius={150}
              source={{
                uri: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
              }}
              alt="Alternate Text"
            />
          </Pressable>
        </Box>
      ),
      headerRight: () => (
        <Box mr="3">
          <Ionicons name="search" size={24} color="black" onPress={() => {}} />
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
