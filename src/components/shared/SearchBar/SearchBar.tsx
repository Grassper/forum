import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Icon, Input, Pressable } from "native-base";
import React from "react";

interface Props_ {
  value: string;
  setValue: (value: string) => void;
  editable?: boolean;
}

export const SearchBar: React.FC<Props_> = ({ value, setValue, editable }) => {
  const inputRef = React.useRef(null);

  return (
    <>
      <Input
        ref={inputRef}
        autoCapitalize="none"
        borderRadius="md"
        editable={editable}
        fontSize="sm"
        InputLeftElement={
          <Icon
            as={<Ionicons name="search-outline" />}
            color="muted.400"
            ml="3"
            size={18}
          />
        }
        InputRightElement={
          value !== "" ? (
            <Pressable onPress={() => setValue("")}>
              <Icon
                as={<MaterialIcons name="clear" />}
                color="muted.400"
                mr="3"
                size={18}
              />
            </Pressable>
          ) : (
            <></>
          )
        }
        onChangeText={setValue}
        placeholder="Search"
        placeholderTextColor="muted.400"
        py="3"
        textTransform="none"
        value={value}
        variant="unstyled"
      />
    </>
  );
};
