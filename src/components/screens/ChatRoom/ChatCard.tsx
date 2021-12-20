import { format } from "date-fns";
import { Box, Text, VStack } from "native-base";
import React from "react";

interface ChatCard_ {
  align: "left" | "right";
  content: string;
  timeStamp: Date;
}

export const ChatCard: React.FC<ChatCard_> = ({
  align,
  content,
  timeStamp,
}) => {
  return (
    <Box alignItems={align === "left" ? "flex-start" : "flex-end"} pb="4">
      <Box
        bg={align === "left" ? "white" : "green.500"}
        borderRadius="10"
        maxWidth="80%"
        minWidth="30%"
        pb="3"
        pt="2"
        px="3"
      >
        <VStack>
          <Text
            color={align === "left" ? "black" : "white"}
            fontSize="sm"
            fontWeight="400"
          >
            {content}
          </Text>
          <Text
            alignSelf="flex-end"
            color={align === "left" ? "coolGray.600" : "white"}
            fontSize="10px"
            mt="1"
          >
            {format(new Date(timeStamp), "p")}
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};
