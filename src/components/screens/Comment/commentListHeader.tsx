import { Box, Flex, Text } from "native-base";
import React from "react";

import { CommentCard } from "@/root/src/components/shared/Cards/CommentCard";

export const CommentListHeader: React.FC = () => {
  return (
    <Box>
      <CommentCard />
      <Box alignItems="center" bg="white" mt="2" pt="4">
        <Flex width="90%" flexDirection="row" alignItems="flex-end">
          <Text fontWeight="500" color="eGreen.400">
            Replies
          </Text>
          <Text fontWeight="500" color="eGreen.400" fontSize="xs" ml="1">
            24
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};
