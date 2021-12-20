import { Box } from "native-base";
import React from "react";
import Svg, {
  Circle,
  Defs,
  G,
  LinearGradient,
  Path,
  Stop,
} from "react-native-svg";

export const AppIcon = () => (
  <Box height="30px" width="30px">
    <Svg viewBox="0 0 1024 1024">
      <Defs>
        <LinearGradient
          gradientUnits="userSpaceOnUse"
          id="linear-gradient"
          x1={149.96}
          x2={874.04}
          y1={149.96}
          y2={874.04}
        >
          <Stop offset={0} stopColor="#00e688" />
          <Stop offset={0.16} stopColor="#04db83" />
          <Stop offset={1} stopColor="#15a66b" />
        </LinearGradient>
      </Defs>
      <G data-name="Layer 2" id="Layer_2">
        <G data-name="Layer 1" id="Layer_1-2">
          <Circle cx={512} cy={512} fill="url(#linear-gradient)" r={512} />
          <Path
            d="M845.75,414.41,362.54,609.84q39.21,86.65,100.07,110.48T589,717.69q58.31-23.58,85.45-67.8t18.11-97.34l177.33-71.72q14.8,74.34-5.87,146.4T788.54,757.45q-54.74,58.15-136.85,91.35-96.41,39-188,28.26t-164-70Q227.17,747.7,185.31,644.13T154,447q10.6-93.6,69.23-164.4t155-109.78q97.56-39.45,187.15-28.61t158.09,65.55Q792,264.44,828.59,354.88,838.7,379.87,845.75,414.41ZM561,301.07Q498.35,278,431.71,304.9q-67.86,27.45-97.41,87.87t-1.6,143.28L652.84,406.57Q623.69,324.21,561,301.07Z"
            fill="#fff"
          />
        </G>
      </G>
    </Svg>
  </Box>
);
