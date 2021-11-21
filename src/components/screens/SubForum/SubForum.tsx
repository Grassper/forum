import { StackNavigationProp } from "@react-navigation/stack";
import { Button } from "native-base";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { RootStackParamList } from "@/root/src/components/navigations/StackNavigator";
import { PostCardRenderer } from "@/root/src/components/shared/CardRenderer";
import { SubForumCard } from "@/root/src/components/shared/Cards";
import { dummyData } from "@/root/src/data/dummyData";

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
      <FlatList
        data={dummyData}
        renderItem={PostCardRenderer}
        ListHeaderComponent={() => <SubForumCard />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
