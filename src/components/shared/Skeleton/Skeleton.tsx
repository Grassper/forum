import { Box, IBoxProps } from "native-base";
import React from "react";

interface Props_ extends IBoxProps {}

export const Skeleton: React.FC<Props_> = (props) => {
  return <Box bg="coolGray.100" {...props} />;
};
