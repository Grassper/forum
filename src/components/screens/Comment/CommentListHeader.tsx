import { Box, HStack, Text } from "native-base";
import React from "react";

import { CommentCard } from "@/root/src/components/shared/Cards/CommentCard";

export const CommentListHeader: React.FC = () => {
  return (
    <Box>
      <CommentCard />
      <Box alignItems="center" bg="white" mt="2" pt="4">
        <HStack width="90%" alignItems="flex-end">
          <Text fontWeight="500" color="eGreen.400">
            Replies
          </Text>
          <Text fontWeight="500" color="eGreen.400" fontSize="xs" ml="1">
            24
          </Text>
        </HStack>
      </Box>
    </Box>
  );
};
