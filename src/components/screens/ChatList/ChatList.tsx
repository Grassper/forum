import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box } from "native-base";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

import { RootStackParamList } from "@/root/src/components/navigations/StackNavigator";
import { FloatingActionButton } from "@/root/src/components/shared/FabButton";
import { dummyData } from "@/root/src/data/dummyData";

import { ChatCard } from ".";

type NavigationProp_ = StackNavigationProp<RootStackParamList>;

interface Props_ {}

export const ChatList: React.FC<Props_> = () => {
  const navigation = useNavigation<NavigationProp_>();

  const Onpress = () => {
    navigation.push("NewChat");
  };
  return (
    <Box style={styles.container}>
      <FlatList data={dummyData} renderItem={() => <ChatCard />} />

      <FloatingActionButton onPress={Onpress} />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, position: "relative" },
});
