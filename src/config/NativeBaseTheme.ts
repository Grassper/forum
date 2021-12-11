import { extendTheme } from "native-base";

export const NativeBaseTheme = extendTheme({
  colors: {
    // Add new color
    eGreen: {
      400: "#0CBF76",
    },
    border: {
      400: "#55555515",
    },
  },
  fontConfig: {
    // Add new fonts
    LexendDeca: {
      300: {
        normal: "ll",
      },
      400: {
        normal: "lr",
      },
      500: {
        normal: "lm",
      },
      600: {
        normal: "ls",
      },
      700: {
        normal: "lb",
      },
    },
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: "LexendDeca",
    body: "LexendDeca",
  },
});
