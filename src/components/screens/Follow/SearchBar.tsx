import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Icon, Input, useContrastText } from "native-base";
import React from "react";

export const SearchBar: React.FC = () => {
  const [value, setValue] = React.useState("");

  const colorContrast = useContrastText("muted.100");
  const handleChange = (event: any) => setValue(event.target.value);

  console.log(colorContrast);

  return (
    <>
      <Input
        bg="muted.100"
        py="4"
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
          <Icon
            as={<MaterialIcons name="clear" />}
            size={18}
            mr="3"
            color={colorContrast}
          />
        }
      />
    </>
  );
};
