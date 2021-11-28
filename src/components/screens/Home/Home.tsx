import { Ionicons } from "@expo/vector-icons";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box, Icon, Image } from "native-base";
import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import {
  BottomTabParamList_,
  DrawerParamList_,
  StackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { BottomSheet } from "@/root/src/components/shared/BottomSheet";
import { PostCardRenderer } from "@/root/src/components/shared/CardRenderer";
import { FloatingActionButton } from "@/root/src/components/shared/FabButton";
import { HeaderProfileIcon } from "@/root/src/components/shared/HeaderProfileIcon";
import { UserContext } from "@/root/src/context";
import { dummyData } from "@/root/src/data/dummyData";

type NavigationProp_ = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList_, "Explore">,
  CompositeNavigationProp<
    StackNavigationProp<StackParamList_>,
    DrawerNavigationProp<DrawerParamList_>
  >
>;

interface Props_ {
  navigation: NavigationProp_;
}

export const Home: React.FC<Props_> = ({ navigation }) => {
  const {
    user: { profileImageUrl },
  } = React.useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);

  const HandleBottomSheet = () => {
    setIsOpen(!isOpen);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderProfileIcon />,
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
      headerTitle: () => (
        <Image
          size="28px"
          resizeMode={"cover"}
          borderRadius={100}
          source={require("@/root/assets/images/logo.png")}
          alt="Eforum logo"
        />
      ),
    });
  }, [navigation, profileImageUrl]);

  return (
    <View style={styles.container}>
      <BottomSheet isOpen={isOpen} onClose={HandleBottomSheet} />
      <FlatList
        data={dummyData}
        renderItem={PostCardRenderer}
        keyExtractor={(item) => item.id}
      />
      <FloatingActionButton onPress={HandleBottomSheet} screen="Home" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
