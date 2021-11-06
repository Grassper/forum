import { StackNavigationProp } from "@react-navigation/stack";
import { Button } from "native-base";
import React from "react";
import { StyleSheet, View } from "react-native";

import { RootStackParamList } from "@/root/src/components/navigations/StackNavigator";

import { SubForumCard } from "./SubForumCard";

type NavigationProp_ = StackNavigationProp<RootStackParamList, "SubForum">;

interface Props_ {
  navigation: NavigationProp_;
}

export const SubForum: React.FC<Props_> = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          size="md"
          _text={{ fontWeight: "600", color: "eGreen.400" }}
          variant="unstyled"
          onPress={() => {
            navigation.navigate("SubForumMod");
          }}
        >
          Manage
        </Button>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <SubForumCard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
