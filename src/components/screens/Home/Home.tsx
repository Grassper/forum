import { Ionicons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Box, Icon, Pressable } from "native-base";
import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SvgUri } from "react-native-svg";

import { BottomSheet } from "@/root/src/components/shared/BottomSheet";
import { PostCardRenderer } from "@/root/src/components/shared/CardRenderer";
import { FloatingActionButton } from "@/root/src/components/shared/FabButton";
import { dummyData } from "@/root/src/data/dummyData";

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
            <Box
              width="8"
              height="8"
              bg="amber.100"
              borderRadius="full"
              overflow="hidden"
            >
              <SvgUri
                uri="https://avatars.dicebear.com/api/micah/asdf.svg"
                width="100%"
                height="100%"
              />
            </Box>
          </Pressable>
        </Box>
      ),
      headerRight: () => (
        <Box mr="3">
          <Icon
            as={<Ionicons name="search-outline" />}
            size={"20px"}
            ml="3"
            color="muted.900"
          />
        </Box>
      ),
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <BottomSheet isOpen={isOpen} onClose={HandleBottomSheet} />
      <FlatList
        data={dummyData}
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
