import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

export const ChargeIconOutline: React.FC = () => {
  return (
    <Svg viewBox="0 0 64 64">
      <G
        data-name="26-Charge"
        fill="none"
        stroke="#000"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <Path d="M32 6a26 26 0 0126 26M40.906 28a2 2 0 011.806 3.008L39.665 36l-9.756 16 1.673-16h-8.488a2 2 0 01-1.806-3.008L24.335 28l9.756-16-1.673 16z" />
        <Path d="M58 34L58 36" />
        <Path d="M62.42 26q.194.988.324 2M2.648 22a31.012 31.012 0 0159.31 2M35 62.857Q33.519 63 32 63A31.027 31.027 0 012.042 24M62.937 30q.063.991.063 2a31.008 31.008 0 01-26 30.6" />
      </G>
    </Svg>
  );
};
