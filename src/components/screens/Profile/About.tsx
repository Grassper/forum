import { Box, HStack, Text, VStack } from "native-base";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

interface Props_ {}

export const About: React.FC<Props_> = () => {
  return (
    <Box style={styles.wrapper} alignItems="center" bg="white">
      <ScrollView style={styles.container}>
        <Text numberOfLines={4} mb="3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id
          quam id ipsum aliquet consequat non quis nisl. Integer et ultrices
          mauris, ac semper nunc.
        </Text>
        <HStack flexWrap="wrap" justifyContent="space-between" mb="5">
          <StatsItem value="8" name="Post Loves" />
          <StatsItem value="8" name="Post Supports" />
          <StatsItem value="8" name="Post Likes" />
          <StatsItem value="8" name="Post Dislikes" />
          <StatsItem value="8" name="Comment Ups" />
          <StatsItem value="8" name="Comment Downs" />
          <StatsItem value="8" name="Badges Earned" />
          <StatsItem value="8" name="Popularity Level" />
          <StatsItem value="8" name="Active Days" />
          <StatsItem value="8" name="Last Active" />
        </HStack>
      </ScrollView>
    </Box>
  );
};

interface StatsItem_ {
  value: string;
  name: string;
}

const StatsItem: React.FC<StatsItem_> = ({ value, name }) => {
  return (
    <VStack width="50%" alignItems="center" mb="3">
      <Text color="eGreen.400" fontWeight="600" fontSize="md" marginBottom="1">
        {value}
      </Text>
      <Text color="coolGray.700">{name}</Text>
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    width: "90%",
  },
  wrapper: {
    flex: 1,
  },
});
