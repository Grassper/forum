import { Box, Pressable } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

import { SearchBar } from "@/root/src/components/shared/SearchBar";
import { colors } from "@/root/src/constants";

interface Props_ {}
export const ExploreAll: React.FC<Props_> = () => {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <Box bg={colors.white} style={styles.container}>
      <Box style={styles.container}>
        <Box alignItems="center" bg={colors.white} width="100%">
          <Box py="15px" width="90%">
            <Pressable onPress={() => console.log("clicked")}>
              <SearchBar
                editable={false}
                setValue={setSearchValue}
                value={searchValue}
              />
            </Pressable>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
