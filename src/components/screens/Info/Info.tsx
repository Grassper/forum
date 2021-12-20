import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box, HStack, Pressable, Text } from "native-base";
import React from "react";
import { Linking, StyleSheet } from "react-native";

import {
  RootStackParamList_,
  StackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { BackButton } from "@/root/src/components/shared/Button";

type NavigationProp_ = CompositeNavigationProp<
  StackNavigationProp<StackParamList_, "Info">,
  StackNavigationProp<RootStackParamList_, "Application">
>;

interface Props_ {
  navigation: NavigationProp_;
}

export const Info: React.FC<Props_> = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton color="eGreen.400" />,
    });
  }, [navigation]);

  return (
    <Box bg="white" style={styles.container}>
      <Items
        name="Terms of Use"
        onPress={() =>
          Linking.openURL("https://www.eforum.io/policies/terms-of-use")
        }
      />
      <Items
        name="Privacy Policy"
        onPress={() =>
          Linking.openURL("https://www.eforum.io/policies/privacy-policy")
        }
      />
      <Items name="Build 1.0.3" />
    </Box>
  );
};

interface Items_ {
  onPress?: () => void;
  name: string;
  hideBordered?: boolean;
  isDanger?: boolean;
}

const Items: React.FC<Items_> = ({ onPress, name, hideBordered, isDanger }) => {
  return (
    <HStack
      borderBottomColor="border.400"
      borderBottomWidth={hideBordered ? 0 : 0.25}
      justifyContent="center"
    >
      <Box width="90%">
        <Pressable onPress={onPress}>
          <Text
            color={isDanger ? "danger.600" : "coolGray.900"}
            fontSize="sm"
            fontWeight="medium"
            py="3"
          >
            {name}
          </Text>
        </Pressable>
      </Box>
    </HStack>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
