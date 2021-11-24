import { Ionicons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Box, Flex, Icon, Image, Pressable } from "native-base";
import React, { useState } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { SvgUri } from "react-native-svg";

import { BottomSheet } from "@/root/src/components/shared/BottomSheet";
import { PostCardRenderer } from "@/root/src/components/shared/CardRenderer";
import { FloatingActionButton } from "@/root/src/components/shared/FabButton";
import { UserContext } from "@/root/src/context";
import { dummyData } from "@/root/src/data/dummyData";

interface Props_ {}

const WIDTH = Dimensions.get("window").width / 3;

export const Home: React.FC<Props_> = () => {
  const navigation = useNavigation();
  const { profileImageUrl } = React.useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);

  const HandleBottomSheet = () => {
    setIsOpen(!isOpen);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Box ml="3">
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
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
                  uri={
                    profileImageUrl ||
                    "https://avatars.dicebear.com/api/micah/default.svg"
                  }
                  width="100%"
                  height="100%"
                />
              </Box>
            </Pressable>
            <Box pl={WIDTH}>
              <Image
                size={10}
                resizeMode={"cover"}
                borderRadius={100}
                source={require("../../../../assets/images/logo.png")}
                alt="eforum logo"
              />
            </Box>
          </Flex>
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
