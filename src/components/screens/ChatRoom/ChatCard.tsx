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
    <Box pb="4" alignItems={align === "left" ? "flex-start" : "flex-end"}>
      <Box
        maxWidth="80%"
        minWidth="30%"
        px="3"
        pt="2"
        pb="3"
        bg={align === "left" ? "white" : "green.500"}
        borderRadius="10"
      >
        <VStack>
          <Text
            color={align === "left" ? "black" : "white"}
            fontWeight="400"
            fontSize="sm"
          >
            {content}
          </Text>
          <Text
            fontSize="8px"
            color={align === "left" ? "coolGray.600" : "white"}
            alignSelf="flex-end"
            mt="1"
          >
            {format(new Date(timeStamp), "p")}
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};
