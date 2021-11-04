import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Icon, Input, Pressable, useContrastText } from "native-base";
import React from "react";

export const SearchBar: React.FC = () => {
  const [value, setValue] = React.useState("");

  const colorContrast = useContrastText("muted.100");
  const handleChange = (event: any) => setValue(event.target.value);

  return (
    <>
      <Input
        bg="muted.100"
        py="3"
        value={value}
        onChange={handleChange}
        borderRadius="md"
        placeholder="Search"
        placeholderTextColor={colorContrast}
        fontSize="sm"
        variant="unstyled"
        InputLeftElement={
          <Icon
            as={<Ionicons name="search-outline" />}
            size={18}
            ml="3"
            color={colorContrast}
          />
        }
        InputRightElement={
          <Pressable onPress={() => setValue("")}>
            <Icon
              as={<MaterialIcons name="clear" />}
              size={18}
              mr="3"
              color={colorContrast}
            />
          </Pressable>
        }
      />
    </>
  );
};
