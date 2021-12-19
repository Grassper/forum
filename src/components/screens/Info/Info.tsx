import { Box, HStack, Pressable, Text } from "native-base";
import React from "react";
import { Linking, StyleSheet } from "react-native";

interface Props_ {}

export const Info: React.FC<Props_> = () => {
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
      justifyContent="center"
      borderBottomWidth={hideBordered ? 0 : 0.25}
      borderBottomColor="border.400"
    >
      <Box width="90%">
        <Pressable onPress={onPress}>
          <Text
            fontSize="sm"
            py="3"
            fontWeight="medium"
            color={isDanger ? "danger.600" : "coolGray.900"}
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
