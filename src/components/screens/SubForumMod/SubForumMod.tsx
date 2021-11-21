import { Box, HStack, Pressable, Text } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

interface Props_ {}

export const SubForumMod: React.FC<Props_> = () => {
  return (
    <Box bg="white" style={styles.container}>
      <Items name="Members" />
      <Items name="Topics" />
      <Items name="Screen Post / Comments" />
      <Items name="Blocked Post / Comments" />
      <Items name="Blocked Members" />
      <Items name="Delete Community" isDanger />
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
