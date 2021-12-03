import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Icon, Input, Pressable } from "native-base";
import React from "react";

interface Props_ {
  value: string;
  setValue: (value: string) => void;
}

export const SearchBar: React.FC<Props_> = ({ value, setValue }) => {
  // const [value, setValue] = React.useState("");

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
        textTransform="lowercase"
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
