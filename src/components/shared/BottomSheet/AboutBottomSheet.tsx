import { Actionsheet, VStack } from "native-base";
import React from "react";

import { About } from "@/root/src/components/screens/Profile/About";

interface Props_ {
  isOpen: boolean;
  onClose: () => void;
  routeUserId: string;
}

export const AboutBottomSheet: React.FC<Props_> = ({
  isOpen,
  onClose,
  routeUserId,
}) => {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content bg="white">
        <VStack alignItems="center" height="300" mt="5" space="4">
          <About routeUserId={routeUserId} />
        </VStack>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
