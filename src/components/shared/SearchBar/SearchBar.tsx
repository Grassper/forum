import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Icon, Input, Pressable } from "native-base";
import React from "react";

export const SearchBar: React.FC = () => {
  const [value, setValue] = React.useState("");

  return (
    <>
      <Input
        bg="muted.100"
        py="3"
        value={value}
        onChangeText={setValue}
        borderRadius="md"
        placeholder="Search"
        placeholderTextColor="muted.400"
        fontSize="sm"
        variant="unstyled"
        InputLeftElement={
          <Icon
            as={<Ionicons name="search-outline" />}
            size={18}
            ml="3"
            color="muted.400"
          />
        }
        InputRightElement={
          <Pressable onPress={() => setValue("")}>
            <Icon
              as={<MaterialIcons name="clear" />}
              size={18}
              mr="3"
              color="muted.400"
            />
          </Pressable>
        }
      />
    </>
  );
};
