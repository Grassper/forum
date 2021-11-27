import { DrawerNavigationProp } from "@react-navigation/drawer";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button } from "native-base";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import {
  DrawerParamList_,
  StackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { PostCardRenderer } from "@/root/src/components/shared/CardRenderer";
import { SubForumCard } from "@/root/src/components/shared/Cards";
import { dummyData } from "@/root/src/data/dummyData";

type NavigationProp_ = CompositeNavigationProp<
  StackNavigationProp<StackParamList_, "SubForum">,
  DrawerNavigationProp<DrawerParamList_>
>;

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
        ListHeaderComponent={() => (
          <SubForumCard
            name="e/Mechkeys"
            description="All about mech keys"
            profileImage=""
            coverImage=""
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
