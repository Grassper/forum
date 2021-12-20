import { Box, Text } from "native-base";
import React, { useState } from "react";

interface PropTypes {
  text: string;
  targetLines: number;
}

export const TextLessMoreView: React.FC<PropTypes> = (props) => {
  const [textShown, setTextShown] = useState(false); //To show your remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"

  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = (e: { nativeEvent: { lines: any } }) => {
    const { lines } = e.nativeEvent;
    if (lines && Array.isArray(lines) && lines.length > 0) {
      setLengthMore(lines.length >= props.targetLines);
    }
  };

  return (
    <Box position="relative">
      <Text
        numberOfLines={textShown ? undefined : props.targetLines || 1}
        onTextLayout={onTextLayout}
      >
        {props.text || ""}
      </Text>
      {lengthMore ? (
        <Text color="green.700" onPress={toggleNumberOfLines}>
          {textShown ? "show less" : "show more"}
        </Text>
      ) : null}
    </Box>
  );
};
