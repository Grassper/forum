import { Box, HStack, Text } from "native-base";
import React from "react";

import { CommentCard } from "@/root/src/components/shared/Cards/CommentCard";

export const CommentListHeader: React.FC = () => {
  return (
    <Box>
      <CommentCard />
      <Box alignItems="center" bg="white" mt="2" pt="4">
        <HStack alignItems="flex-end" width="90%">
          <Text color="eGreen.400" fontWeight="500">
            Replies
          </Text>
          <Text color="eGreen.400" fontSize="xs" fontWeight="500" ml="1">
            24
          </Text>
        </HStack>
      </Box>
    </Box>
  );
};
