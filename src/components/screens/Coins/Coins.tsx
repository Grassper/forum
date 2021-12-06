import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props_ {}

export const Coins: React.FC<Props_> = () => {
  return (
    <View style={styles.container}>
      <Text>Hi from react native</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
