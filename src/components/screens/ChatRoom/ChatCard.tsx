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
        maxWidth="60%"
        px="3"
        pt="2"
        pb="3"
        bg={align === "left" ? "white" : "green.500"}
        borderRadius="5"
      >
        <VStack>
          <Text
            color={align === "left" ? "coolGray.600" : "white"}
            fontWeight="500"
          >
            {content}
          </Text>
          <Text
            fontSize="xs"
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
